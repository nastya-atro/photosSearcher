import { useDispatch, useSelector } from 'react-redux';
import { colorSelector, photosSelector, queriSelector, orderBySelector, tokenSelector } from './../Searcher-2-bll/SearchSelector';
import Paginator from './Paginator';
import { actions, getSearchResult } from './../Searcher-2-bll/SearchReducer';
import axios from 'axios';

type PropsType = {
    pageSize: number
    totalPhotosCount: number
    currentRage: number
}

const PhotosResult: React.FC<PropsType> = ({ pageSize, totalPhotosCount, currentRage }) => {

    const dispatch = useDispatch()

    const query = useSelector(queriSelector)
    const color = useSelector(colorSelector)
    const orderBy = useSelector(orderBySelector)
    const token = useSelector(tokenSelector)
    const photos = useSelector(photosSelector)

    const onPageChanged = (currentRage: number) => {
        dispatch(getSearchResult(query, currentRage, pageSize, orderBy, color))
    }

    const instanse = axios.create({
        headers: { "Authorization": `Bearer ${token}` },
        baseURL: `https://api.unsplash.com/`
    })

    const onLikePhoto = (id: string) => {
        instanse.post(`photos/${id}/like/`)
            .then(res => {
                dispatch(actions.changeLikesPhoto(res.data.photo.id, res.data.photo.likes, res.data.photo.liked_by_user))
            })
    }

    const disLikePhoto = (id: string) => {
        instanse.delete(`photos/${id}/like/`)
            .then(res => {
                dispatch(actions.changeLikesPhoto(res.data.photo.id, res.data.photo.likes, res.data.photo.liked_by_user))
            })
    }
   
    return (
        <div>
            <Paginator totalPhotosCount={totalPhotosCount} pageSize={pageSize} currentPage={currentRage} onPageChanged={onPageChanged} />

            {photos && photos.map((p) => <div key={p.id}>
                <img src={p.urls.small} alt={p.description}></img>
                
                <div onClick={() => {!p.liked_by_user? onLikePhoto(p.id): disLikePhoto(p.id) }}>{p.likes}

                <div>{p.liked_by_user? 'true': 'false'}</div>

                </div>
            </div>)}
        </div>
    )
}

export default PhotosResult