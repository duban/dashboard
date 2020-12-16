import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:9099/api/v1', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 30 // request timeout
})
export default service
