import axios from 'axios'

const BACKEND_URL = 'safebnb-backend.heroku.com/'
export const getResults = (numBeds, maxPrice) => {
        let requestString = BACKEND_URL + "/search?min_beds=" + numBeds + "&max_price=" + maxPrice;
        return axios
          .get(BACKEND_URL)
          .then(response => {
            return response.data.result
          })
          .catch(error => {
            console.log('ERROR: ', error)
            return null
          })
}
