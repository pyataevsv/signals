import * as actions from './actions'
import AsyncStorage from '@react-native-community/async-storage';

const setStorageObj = async (value) => {

    const jsonValue = JSON.stringify(value)
    try {
        await AsyncStorage.setItem('login_storage', jsonValue)
    } catch (e) {

    }
}

const removeLoginStorage = async () => {
    try {
        await AsyncStorage.removeItem('login_storage')
        let a = await AsyncStorage.getItem('login_storage')
    } catch (e) {
        // remove error
    }
}
export function fontLoad(status) {
    return {
        type: actions.FONT_LOAD,
        status
    }
}

export function isFetching(isFetching) {
    return {
        type: actions.IS_FETCHING,
        isFetching
    }
}
export function fetchErr(fetchErr) {
    return {
        type: actions.FETCH_ERR,
        fetchErr
    }
}
export function fetchErrText(fetchErrText) {
    return {
        type: actions.FETCH_ERR_TEXT,
        fetchErrText
    }
}

export function fetchALL({ limit = '', page = '', key = '' }) {
    let url = 'http://148.251.195.78:99/app/all'

    if (!!limit || !!page || !!key) url = url + '?'
    if (!!limit) url = url + 'limit=' + limit + '&'
    if (!!page) url = url + 'page=' + page + '&'
    if (!!key) url = url + 'key=' + key + '&'



    return (dispatch) => {

        dispatch(isFetching(true))
        dispatch(fetchErr(false))
        // setTimeout(() => {
        fetch(url, { mode: 'no-cors' })
            .then(resp => {
                dispatch(isFetching(false))
                if (!resp.ok) {
                    dispatch(fetchErrText(JSON.stringify(resp)))
                    throw new Error(resp.statusText)
                }
                return resp
            })
            .then(resp => resp.json())
            .then(feed => {
                dispatch(fetchAllSuccess(feed))
                dispatch(refreshFeedCash(feed))
            })
            .catch(err => {
                dispatch(isFetching(false))
                dispatch(fetchErrText('errrrr'))
                dispatch(fetchErr(true))
            })
        // }, 1000);
    }
}

export function fetchALLWithClear({ limit = '', page = '', key = '' }, total_lines) {
    let url = 'http://148.251.195.78:99/app/all'


    if (!!limit || !!page || !!key) url = url + '?'
    if (!!limit) url = url + 'limit=' + limit + '&'
    if (!!page) url = url + 'page=' + page + '&'
    if (!!key) url = url + 'key=' + key + '&'



    return (dispatch) => {

        dispatch(isFetching(true))
        dispatch(fetchErr(false))
        //dispatch(fetchErrText('oshibochka'))
        fetch(url, { mode: 'no-cors' })
            .then(resp => {
                dispatch(isFetching(false))
                if (!resp.ok) {
                    dispatch(fetchErrText(JSON.stringify(resp)))
                    throw new Error(resp.statusText)
                }
                return resp
            })
            .then(resp => resp.json())
            .then(feed => {

                dispatch(clearCash())
                dispatch(fetchAllSuccess(feed))
                dispatch(refreshFeedCash(feed))

            })
            .catch(err => {
                dispatch(isFetching(false))
                dispatch(fetchErrText('errrrr'))
                dispatch(fetchErr(true))
            })
    }
}

export function fetchAllSuccess(feed) {
    return {
        type: actions.FETCH_ALL_SUCCESS,
        data: feed
    }
}

export function refreshFeedCash(feed) {
    return {
        type: actions.REFRESG_FEED_CASH,
        data: feed
    }
}

export function clearCash() {
    return {
        type: actions.CLEAR_CASH
    }
}
//////////////////////////////// LOGIN


export function isLoginFetching(isFetching) {
    return {
        type: actions.IS_LOGIN_FETCHING,
        isFetching
    }
}

export function setLoginError(text) {
    return {
        type: actions.SET_LOGIN_ERROR,
        text
    }
}


export function setLoginData(Feed) {

    return {
        type: actions.SET_LOGIN_DATA,
        feed: Feed
    }
}
export function logOut() {
    removeLoginStorage()
    return {
        type: actions.LOG_OUT
    }
}


export function signUpRequest({ fname = '', lname = '', email = '', password = '', password2 = '' }) {

    let url = 'http://148.251.195.78:99/app/signup'

    if (!!fname || !!lname || !!email || !!password || !!password2) url = url + '?'
    if (!!fname) url = url + 'fname=' + fname + '&'
    if (!!lname) url = url + 'lname=' + lname + '&'
    if (!!email) url = url + 'email=' + email + '&'
    if (!!password) url = url + 'password=' + password + '&'
    if (!!password2) url = url + 'password2=' + password2 + '&'

    return (dispatch) => {

        dispatch(isLoginFetching(true))
        dispatch(setLoginError(''))

        fetch(url)
            .then(resp => {
                dispatch(isLoginFetching(false))
                if (!resp.ok) {
                    throw new Error(resp.statusText)
                }
                return resp
            })
            .then(resp => resp.json())
            .then(feed => {
                if (feed.error) {
                    dispatch(setLoginError(feed.result))
                } else {
                    //set login state
                    dispatch(setLoginData(feed.result))
                    setStorageObj(feed.result)
                }
            })
            .catch(err => {
                dispatch(setLoginError('Service error, please try later'))
            })

    }
}


export function logInRequest({ email = '', password = '' }) {

    let url = 'http://148.251.195.78:99/app/signin'

    if (!!email || !!password) url = url + '?'
    if (!!email) url = url + 'email=' + email + '&'
    if (!!password) url = url + 'password=' + password + '&'

    return (dispatch) => {

        dispatch(isLoginFetching(true))
        dispatch(setLoginError(''))
        setTimeout(() => {


            fetch(url)
                .then(resp => {
                    dispatch(isLoginFetching(false))

                    if (!resp.ok) {

                        throw new Error(resp.statusText)
                    }
                    return resp
                })
                .then(resp => resp.json())
                .then(feed => {

                    if (feed.error) {
                        dispatch(setLoginError(feed.result))
                    } else {
                        //set login state

                        dispatch(setLoginData(feed.result))
                        setStorageObj(feed.result)
                    }

                })
                .catch(err => {
                    dispatch(setLoginError('Service error, please try later'))
                })
        }, 1000);

    }
}


export function setPlanRecept(json) {
    return {
        type: actions.SET_ACTIVE_PLAN,
        json
    }
}


