import axios from 'axios'
const BASE_URL = 'http://localhost:3000/'

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: false,
  params: {}
})

instance.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.config)
    return Promise.reject(error)
  }
)

export default {
  getData(action) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url)
  },
  postData(action, data) {
    console.log(data)

    let url = `${BASE_URL}`
    url += action
    return instance.post(url, data)
  },
  putData(action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.put(url, data)
  },
  deleteData(action) {
    let url = `${BASE_URL}`
    url += action
    return instance.delete(url)
  },
  login(action, data) {
    let url = `${BASE_URL}`
    url += action
    return instance.get(url, data)
  }
}
