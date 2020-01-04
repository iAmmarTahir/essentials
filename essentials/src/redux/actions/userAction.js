import  {SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI,SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'
import {URL} from '../../webConfig'

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post(URL + 'api/user/login', {
        email: userData.email,
        password: userData.password
    }).then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
        history.push('/home')
    }).catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.errorMessage
        })
    })
}

export const getUserData = () => (dispatch) => (
    axios.post(URL + 'api/user/getTokenData', {
            token: 'Bearer '.concat(localStorage.getItem('token'))
        })
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
)

export const logOutUser = () => (dispatch) => {
    console.log('In here')
    localStorage.removeItem('token')
    dispatch({
        type: SET_UNAUTHENTICATED
    })
}

export const signUpUser = (userData, history) => (dispatch) => {
    
    dispatch({type: LOADING_UI})

    axios.post(URL + 'api/user/signup', {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone
    }).then((res) => {
        localStorage.setItem('token', res.data.token)
        dispatch(getUserData())
        dispatch({
            type: CLEAR_ERRORS
        })
        history.push('/home')
    }).catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data.errorMessage
        })
    })
}