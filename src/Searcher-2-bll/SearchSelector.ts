import { AppStateType } from "./ReduxToolkit/redux"


export const photosSelector=(state: AppStateType)=>{
    return state.search.photos
}

export const queriSelector=(state: AppStateType)=>{
    return state.search.query
}

export const isLoadingSelector=(state: AppStateType)=>{
    return state.search.isLoading
}

export const currentPageSelector=(state: AppStateType)=>{
    return state.search.currentPage
}

export const totalPhotosCountSelector=(state: AppStateType)=>{
    return state.search.totalPhotosCount
}

export const pageSizeSelector=(state: AppStateType)=>{
    return state.search.pageSize
}

export const orderBySelector=(state: AppStateType)=>{
    return state.search.orderBy
}

export const colorSelector=(state: AppStateType)=>{
    return state.search.colors
}

export const isAuthSelector=(state: AppStateType)=>{
    return state.search.isAuth
}

export const tokenSelector=(state: AppStateType)=>{
    return state.search.token
}

