import { useDispatch, useSelector } from 'react-redux';
import { ColorsType, getSearchResult, OrderType } from './../Searcher-2-bll/SearchReducer';
import SearchForm from './SearchForm'
import PhotosResult from './PhotosResult';
import { isLoadingSelector, totalPhotosCountSelector } from '../Searcher-2-bll/SearchSelector';
import { currentPageSelector, pageSizeSelector } from './../Searcher-2-bll/SearchSelector';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getLoginThunk } from './../Searcher-2-bll/AuthReducer';
import { useState, useEffect } from 'react';



const SearchPage = () => {

    const isLoading = useSelector(isLoadingSelector)
    const totalPhotosCount = useSelector(totalPhotosCountSelector)
    const currentRage = useSelector(currentPageSelector)
    const pageSize = useSelector(pageSizeSelector)

    const [valueCode, setValueCode] = useState('')


    const dispatch = useDispatch()

    const searchPhotos = (query: string, orderBy: OrderType, color: null | ColorsType) => {
        dispatch(getSearchResult(query, 1, pageSize, orderBy, color))
    }


 
    const location = useLocation()
    const code = location.search.substr(6)

    useEffect(()=>{
        dispatch(getLoginThunk(code))
    },[])


    if (isLoading) {
        return <div>Is loading...</div>
    }


    return (
        <div>
            <a href='https://unsplash.com/oauth/authorize?client_id=-7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw&redirect_uri=http://localhost:3000/sercher&response_type=code&scope=public+read_user'>Login</a>
           
            <h2>Search Page:</h2>
            <SearchForm searchPhotos={searchPhotos} />

            <div>
                <PhotosResult totalPhotosCount={totalPhotosCount} currentRage={currentRage} pageSize={pageSize} />
            </div>


        </div>
    )
}

export default SearchPage