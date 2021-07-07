import { useDispatch, useSelector } from 'react-redux';
import { ColorsType, OrderType } from '../../Searcher-2-bll/SearchReducer';
import SearchForm from './SearchForm'
import PhotosResult from './PhotosResult';
import { isLoadingSelector, totalPhotosCountSelector } from '../../Searcher-2-bll/SearchSelector';
import { currentPageSelector, pageSizeSelector, isAuthSelector } from '../../Searcher-2-bll/SearchSelector';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, AppBar, Toolbar, Typography , Container} from '@material-ui/core';
import { getSearchResult } from '../../Searcher-2-bll/ReduxToolkit/reducer';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
        searchForm:{
            marginTop: theme.spacing(3)
        },
        appBar:{
            backgroundColor: 'white'
        },
        toolbar:{
            color: 'black'
        }
    }),
);

const SearchPage = () => {

    const classes = useStyles();

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

            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}  >
                    <Typography variant="h6" className={classes.title}>
                        Searcher Unsplash
                    </Typography>

                    {!isAuth ? <Button color="inherit" > <a href='https://unsplash.com/oauth/authorize?client_id=-7Zizqlf3Gfd2aWnELKsllUey2-0cIwnZc60S7IKbjw&redirect_uri=http://localhost:3000/authcallback&response_type=code&scope=public+read_user+write_likes'>
                        Login</a>   </Button> :
                        <Button color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>

            <Container maxWidth='md' className={classes.searchForm}>
                <SearchForm searchPhotos={searchPhotos} />
            </Container>

            <Container maxWidth='lg'>
                <PhotosResult totalPhotosCount={totalPhotosCount} currentRage={currentRage} pageSize={pageSize} />
            </Container>


        </div>
    )
}

export default SearchPage