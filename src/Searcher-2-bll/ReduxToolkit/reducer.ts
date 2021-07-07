import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../Searcher-3-dal/api";
import { ColorsType, OrderType, ResultSearchType } from "../SearchReducer";


const reducerToolkit = createSlice({
    name: 'search',
    initialState: {
        token: null as null | string,
        isAuth: false,
        photos: [] as Array<ResultSearchType>,
        isLoading: false,
        query: '',
        totalPhotosCount: 0,
        pageSize: 36,
        currentPage: 1,
        orderBy: 'relevant' as OrderType,
        colors: null as null | ColorsType,
    },
    reducers: {
        authReceived(state, action){
            state.token = action.payload
        },
        isAuthChanged(state, action){
            state.isAuth = action.payload
           
        },
        photosReceived(state, action){
            state.photos= action.payload
          
        },
        queryChanged (state, action){
            state.query = action.payload
           
        },
        toogleIsLoading (state, action){
            state.isLoading = action.payload
         
        } ,
        totalPhotosCountReceived (state, action){
        state.totalPhotosCount = action.payload
        } ,
        currentPageChanged (state, action){
            state.currentPage = action.payload
           
        } ,
        changeLikesPhoto(state, action){
            state.photos = state.photos.map(photo => {
                if (photo.id === action.payload.id) {
                    photo.likes = action.payload.likes
                    photo.liked_by_user = action.payload.liked_by_user
                }
                return photo
            })
        }
    }
})

export default reducerToolkit.reducer 
export const {currentPageChanged,changeLikesPhoto, authReceived, isAuthChanged, photosReceived, queryChanged, toogleIsLoading, totalPhotosCountReceived}=reducerToolkit.actions


export const getSearchResult = (query: string, page: number, per_page: number, order_by: OrderType, color: null | ColorsType): any => {
    return async (dispatch:any) => {
        toogleIsLoading(true)
        dispatch(queryChanged(query))
        dispatch(currentPageChanged(page))

        let data = await api.searchPhotos(query, page, per_page, order_by, color)

        toogleIsLoading(false)
        dispatch(photosReceived(data.results))

        dispatch(totalPhotosCountReceived(data.total))
    }
}

export const getLoginThunk = (code: string): any => {
    return async (dispatch:any) => {
        let result = await api.getAccessToken(code)
        if (result.status === 200) {
            dispatch(authReceived(result.data.access_token))
            dispatch(isAuthChanged(true))
        }
    }
}

