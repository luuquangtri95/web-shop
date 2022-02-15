import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    const { config, status, data } = error.response
    const URLS = ['/auth/local/register', '/auth/local']

    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || []
      const firstError = errorList.length > 0 ? errorList[0] : {}
      const messagesList = firstError.messages || []
      const firstMessages = messagesList.length > 0 ? messagesList[0] : {}

      throw new Error(firstMessages.message)
    }
    return Promise.reject(error)
  }
)

export default axiosClient
