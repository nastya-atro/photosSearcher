import axios from 'axios';
import { ColorsType, OrderType } from '../Searcher-2-bll/SearchReducer';

const client_id = '-7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw'
const client_secret = '6vSgY3FPGUOI4jKvg1FldeTP_eR-KHGiVB7ILALA_YA'

const redirect_uri='http://localhost:3000/authcallback'
const grant_type= 'authorization_code'


const instanse1 = axios.create({
  headers: { "Authorization": `Client-ID ${client_id}` },
  baseURL: `https://api.unsplash.com/`
})

const instanse2 = axios.create({
  headers: { "Authorization": "Bearer ACCESS_TOKEN" },
  baseURL: `https://unsplash.com/`,
})


export const api = {
  searchPhotos(query: string, page:number, per_page:number, order_by: OrderType, color:null | ColorsType) {
    return instanse1.get(`search/photos?query=${query}&page=${page}&per_page=${per_page}&order_by=${order_by}`+ (color===null ? '':`&color=${color}`))
      .then(res => res.data)
  },
  getAccessToken(code:string){
    return instanse2.post(`oauth/token?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&grant_type=${grant_type}`)
  }
}


