
import { useDispatch, useSelector } from 'react-redux';
import { colorSelector, photosSelector, queriSelector, orderBySelector } from './../Searcher-2-bll/SearchSelector';
import Paginator from './Paginator';
import { getSearchResult } from './../Searcher-2-bll/SearchReducer';

type PropsType={
    pageSize:number
    totalPhotosCount:number
    currentRage: number
}

const PhotosResult:React.FC<PropsType>=({pageSize, totalPhotosCount,currentRage})=>{

    const dispatch = useDispatch()
    const query = useSelector(queriSelector)
    const color=useSelector(colorSelector)
    const orderBy=useSelector(orderBySelector)

    const onPageChanged=(currentRage:number)=>{
        dispatch(getSearchResult(query, currentRage, pageSize, orderBy, color))
    }


    const photos = useSelector(photosSelector)
    return(
        <div>
            <Paginator totalPhotosCount={totalPhotosCount} pageSize={pageSize} currentPage={currentRage} onPageChanged={onPageChanged}/>
            {photos && photos.map((p)=><div key={p.id}>
                    <img src={p.urls.small}></img>
                </div>)}
        </div>
    )
}

export default PhotosResult