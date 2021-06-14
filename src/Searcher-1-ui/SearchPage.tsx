import { useDispatch, useSelector } from 'react-redux';
import { ColorsType, getSearchResult, OrderType } from './../Searcher-2-bll/SearchReducer';
import SearchForm from './SearchForm'
import PhotosResult from './PhotosResult';
import { isLoadingSelector, totalPhotosCountSelector } from '../Searcher-2-bll/SearchSelector';
import { currentPageSelector, pageSizeSelector, isAuthSelector } from './../Searcher-2-bll/SearchSelector';



const SearchPage = () => {

    const isLoading = useSelector(isLoadingSelector)
    const totalPhotosCount = useSelector(totalPhotosCountSelector)
    const currentRage = useSelector(currentPageSelector)
    const pageSize = useSelector(pageSizeSelector)
    const isAuth = useSelector(isAuthSelector)

    const dispatch = useDispatch()

    const searchPhotos = (query: string, orderBy: OrderType, color: null | ColorsType) => {
        dispatch(getSearchResult(query, 1, pageSize, orderBy, color))
    }


    if (isLoading) {
        return <div>Is loading...</div>
    }


    return (
        <div>
            {!isAuth ? <a href='https://unsplash.com/oauth/authorize?client_id=-7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw&redirect_uri=http://localhost:3000/authcallback&response_type=code&scope=public+read_user+write_likes'>
                Login</a> :
                <button>Logout</button>}


            <h2>Search Page:</h2>
            <SearchForm searchPhotos={searchPhotos} />

            <div>
                <PhotosResult totalPhotosCount={totalPhotosCount} currentRage={currentRage} pageSize={pageSize} />
            </div>


        </div>
    )
}

export default SearchPage