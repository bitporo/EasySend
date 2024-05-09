import axios from 'axios'
const url =  `http://${window.location.hostname}:7071`
console.log(url)
axios.defaults.baseURL = url;
export async function getMessageList(query){
  return axios.get('/api/message/getMessageList')
}

export async function addMessageData(data){
  return axios.post('/api/message/addMessageData',{data})
}