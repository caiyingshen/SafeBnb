from flask import Flask
from flask import request
from flask_restful import Resource, Api, reqparse
from flaskext.mysql import MySQL
from flask import jsonify
mysql = MySQL()
app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'b123288ad4eabf'
app.config['MYSQL_DATABASE_PASSWORD'] = '36a4a28c'
app.config['MYSQL_DATABASE_DB'] = 'heroku_d1a275da0db8738'
app.config['MYSQL_DATABASE_HOST'] = 'us-cdbr-iron-east-01.cleardb.net'

mysql.init_app(app)
api = Api(app)

@app.route('/search')
def search():
    max_price = request.args.get('max_price', default = 999999, type = int)
    min_beds = request.args.get('min_beds', default = 0, type = int)
    args = [min_beds,max_price]
    conn = mysql.connect()
    cursor = conn.cursor()
#   cursor.callproc('search', args)
    searchfunction = 'SELECT *,@curRank := @curRank + 1 FROM airbnbs INNER JOIN scores on airbnbs.airbnb_id = scores.airbnb_id, (SELECT @curRank := 0) r WHERE airbnbs.num_beds > ' + str(min_beds) + ' AND ' + str(max_price) + ' > airbnbs.price ORDER BY score;'
    print(searchfunction)
    cursor.execute(searchfunction)
    data = cursor.fetchall()
    results_list = []
    for result in data:
    	i = {
    		'ID':result[0],
    		'HostID':result[1],
    		'summary':result[2],
    		'city':result[3],
    		'neighborhood':result[4],
    		'latitude':result[5],
    		'longitude':result[6],
    		'num_reviews':result[7],
    		'avg_review':result[8],
    		'num_beds':result[9],
    		'price':result[10],
    		'score':result[12],
    		'rank':result[14]
    	}
    	results_list.append(i)
    return jsonify(result=results_list)

@app.route('/')
def hello():
    conn = mysql.connect()
    cursor = conn.cursor()
    return 'Hello'

if __name__ == '__main__':
    app.run(debug=True)
