import axios from 'axios'
import { Toast } from 'vant'
const request = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})
request.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (res) {
    if (res.status === 200) {
      return res.data
    } else {
      Toast.fail('请求失败')
      console.log(2)
    }
  },
  function (error) {
    Toast.fail('请求失败')
    return Promise.reject(error)
  }
)
export default request
