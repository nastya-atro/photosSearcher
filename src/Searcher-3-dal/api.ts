import axios from 'axios';
import { ColorsType, OrderType } from '../Searcher-2-bll/SearchReducer';

export const instanse = axios.create({
  headers: { "Authorization": "Client-ID -7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw" },
  baseURL: `https://api.unsplash.com/`
})

export const searchApi = {

  searchPhotos(query: string, page:number, per_page:number, order_by: OrderType, color:null | ColorsType) {
    return instanse.get(`search/photos?query=${query}&page=${page}&per_page=${per_page}&order_by=${order_by}`+ (color===null ? '':`&color=${color}`))
      .then(res => res.data)
  },

  
}

export const instansee = axios.create({
  baseURL: `https://unsplash.com/`,
})

const client_id = '-7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw'
const client_secret = '6vSgY3FPGUOI4jKvg1FldeTP_eR-KHGiVB7ILALA_YA'
const redirect_uri='http://localhost:3000/sercher'
const grant_type= 'authorization_code'


export const loginApi={
  
    authUnsplash(){
      return instansee.get(`oauth/authorize?
      client_id=-7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw
      &redirect_uri=http://localhost:3000/sercher
      &response_type=code
      &scope=public+read_user`)
    },
    getAccessToken(code:string){
      return instansee.post(`oauth/token?oauth/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=${grant_type}`)
    }
  
  
}