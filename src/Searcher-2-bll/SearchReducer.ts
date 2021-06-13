import { searchApi } from "../Searcher-3-dal/api";
import { CommonActionsTypes, CommonThunkType } from "./redux-store";



let initialState = {
    photos: null as null | Array<ResultSearchType>,
    isLoading: false,
    query: '',
    totalPhotosCount: 0,
    pageSize: 10,
    currentPage: 1,
    orderBy: 'relevant' as OrderType,
    colors: null as null | ColorsType

}

type InitialStateType = typeof initialState

const searchReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "search/SET_QUERY":
            return {
                ...state,
                query: action.query
            }
        case "search/SET_PHOTOS":
            return {
                ...state,
                photos: action.photos
            }
        case 'search/TOOGLE_IS_LOADING':
            {
                return {
                    ...state, isLoading: action.isLoading
                }
            }
        case 'search/SET_TOTAL_PHOTOS_COUNT':
            {
                return {
                    ...state, totalPhotosCount: action.totalPhotosCount
                }
            }
        case 'searhc/SET_CURRNT_PAGE':
            {
                return {
                    ...state, currentPage: action.currentPage
                }
            }
        default:
            return state;
    }
}

const actionsSearch = {
    photosReceived: (photos: null | Array<ResultSearchType>) => ({
        type: 'search/SET_PHOTOS', photos
    } as const),
    queryChanged: (query: string) => ({
        type: 'search/SET_QUERY', query
    } as const),
    toogleIsLoading: (isLoading: boolean) => ({
        type: 'search/TOOGLE_IS_LOADING', isLoading
    } as const),
    totalPhotosCountReceived: (totalPhotosCount: number) => ({
        type: 'search/SET_TOTAL_PHOTOS_COUNT', totalPhotosCount
    } as const),
    currentPageChanged: (currentPage: number) => ({
        type: 'searhc/SET_CURRNT_PAGE', currentPage
    } as const),


}

type ActionsTypes = CommonActionsTypes<typeof actionsSearch>
type ThunkType = CommonThunkType<ActionsTypes>


export const getSearchResult = (query: string, page:number, per_page:number, order_by: OrderType, color:null | ColorsType): ThunkType => {
    return async (dispatch) => {
        actionsSearch.toogleIsLoading(true)
        dispatch(actionsSearch.queryChanged(query))
        dispatch(actionsSearch.currentPageChanged(page))

        let data = await searchApi.searchPhotos(query, page, per_page, order_by, color)

        actionsSearch.toogleIsLoading(false)
        dispatch(actionsSearch.photosReceived(data.results))
        dispatch(actionsSearch.totalPhotosCountReceived(data.total))
    }
}



export default searchReducer;

export type OrderType='relevant' | 'latest'
export type ColorsType = 'black_and_white' | 'black' | 'white' | 'yellow' | 'orange' | 'red' | 'purple' | 'magenta' | 'green' | 'teal' | 'blue'

type ResultSearchType = {
    id: string,
    created_at: string,
    width: number,
    height: number,
    color: string,
    blur_hash: string,
    likes: number,
    liked_by_user: boolean,
    description: string,
    user: {
        id: string,
        username: string,
        name: string,
        first_name: string,
        last_name: string,
        instagram_username: string,
        twitter_username: string,
        portfolio_url: string,
        profile_image: {
            small: string,
            medium: string,
            large: string
        },
        links: {
            self: string,
            html: string,
            photos: string,
            likes: string
        }
    },
    current_user_collections: [],
    urls: {
        raw: string,
        full: string,
        regular: string,
        small: string,
        thumb: string
    },
    links: {
        self: string,
        html: string,
        download: string
    }

}