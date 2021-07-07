import { Redirect, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { tokenSelector } from '../../Searcher-2-bll/SearchSelector';
import { getLoginThunk } from '../../Searcher-2-bll/ReduxToolkit/reducer';



const AuthCallback = () => {
    const token = useSelector(tokenSelector)

    const location = useLocation()
    const code = location.search.substr(6)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoginThunk(code))
    }, [])

    if (token) {
        return <Redirect to='sercher'></Redirect>
    }

    return (<div>Loading...</div>)
}

export default AuthCallback