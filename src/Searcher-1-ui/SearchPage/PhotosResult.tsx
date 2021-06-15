import { useDispatch, useSelector } from 'react-redux';
import s from './SearchPage.module.css'
import { colorSelector, photosSelector, queriSelector, orderBySelector, tokenSelector, isAuthSelector } from '../../Searcher-2-bll/SearchSelector';
import axios from 'axios';
import cn from "classnames"
import { Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { getSearchResult } from '../../Searcher-2-bll/SearchReducer';
import { actions } from './../../Searcher-2-bll/SearchReducer';
import Paginator from './../Paginator/Paginator';

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
    const isAuth = useSelector(isAuthSelector)

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
            <Grid container direction="row"
                justify="center"
                alignItems="flex-start" spacing={2}>
                {photos && photos.map((p) => <Grid item className={s.grid_item_photo} key={p.id}>
                    <img src={p.urls.small} alt={p.description}></img>

                    {isAuth && <div className={s.like_area} onClick={() => { !p.liked_by_user ? onLikePhoto(p.id) : disLikePhoto(p.id) }}>

                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon className={cn({
                                [s.activeHeart]: p.liked_by_user
                            }, s.commonHeart)} />
                        </IconButton>
                        {p.likes}

                    </div>}

                </Grid>)}
            </Grid>
        </div>
    )
}

export default PhotosResult