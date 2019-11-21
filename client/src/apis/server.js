import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://54.169.176.83'
})

export default instance
