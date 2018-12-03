from flask import Flask
from flask import request
from flask_restful import Resource, Api, reqparse
from flaskext.mysql import MySQL
from flask import jsonify
mysql = MySQL()
app = Flask(__name__)

app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Chris123'
app.config['MYSQL_DATABASE_DB'] = 'airbnb_data'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql.init_app(app)
api = Api(app)

@app.route('/search')
def search():
    max_price = request.args.get('max_price', default = 999999, type = int)
    min_beds = request.args.get('min_beds', default = 0, type = int)
    args = [min_beds,max_price]
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.callproc('search', args)
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
	return 'Hello'

if __name__ == '__main__':
    app.run(debug=True)
