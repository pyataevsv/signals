import { combineReducers } from 'redux'
import * as actions from './actions'


const initialState = {
    feedAll: {
        isFetching: false,
        data: {},
        fetchErr: false,
        fetchErrText: '',
        feedCash: {
            messages: [],
            profiles: [],
            promos: [],
            history_items: [],
            page_info: {}
        }
    },
    loginState: {
        loginError: '',
        isLoginFetching: false,
        loginData: {
            is_authorized: false,
            key: '',
            fname: '',
            lname: '',
            email: ''
        }
    },
    activePlan: {
        currentPlanRecept: null,
        planProcessing: false
    }
}



////////////////    FEED STATE     ///////////////

function isFetchinReducer(state, action) {
    if (action.type === actions.IS_FETCHING) {
        return action.isFetching
    }
    return state
}

function fontLoadReducer(state, action) {
    if (action.type === actions.FONT_LOAD) {
        return action.status
    }
    return state
}


function fetchAllreducer(state, action) {
    if (action.type === actions.FETCH_ALL_SUCCESS) {
        return action.data
    }
    return state
}

function fetchErrReducer(state, action) {
    if (action.type === actions.FETCH_ERR) {
        return action.fetchErr
    }
    return state
}

function fetchErrTextReducer(state, action) {
    if (action.type === actions.FETCH_ERR_TEXT) {
        return action.fetchErrText
    }
    return state
}

function refreshFeedCashReducer(state, action) {

    if (action.type === actions.REFRESG_FEED_CASH) {

        return {
            messages: state.messages.concat(action.data.messages),
            profiles: state.profiles.concat(action.data.profiles),
            promos: state.promos.concat(action.data.promos),
            history_items: state.history_items.concat(action.data.history_items),
            page_info: action.data.page_info

        }
    }
    if (action.type === actions.CLEAR_CASH) {

        return initialState.feedAll.feedCash
    }
    return state
}
////////////////    LOGIN STATE    ///////////////

function isLoginFetchinReducer(state, action) {
    if (action.type === actions.IS_LOGIN_FETCHING) {
        return action.isFetching
    }
    return state
}

function loginErrorReducer(state, action) {
    if (action.type === actions.SET_LOGIN_ERROR) {
        return action.text
    }
    return state
}

function loginDataReducer(state, action) {

    if (action.type === actions.SET_LOGIN_DATA) {

        return {
            is_authorized: true,
            key: action.feed.key,
            fname: action.feed.fname,
            lname: action.feed.lname,
            email: action.feed.email
        }
    }
    if (action.type === actions.LOG_OUT) {

        return {
            is_authorized: false,
            key: '',
            fname: '',
            lname: '',
            email: ''
        }
    }
    return state
}


function activePlanReducer(state, action) {
    if (action.type === actions.SET_ACTIVE_PLAN) {
        return action.json
    }
    return state
}




////////////////    ROOT REDUCER   //////////////////

export const rootReducer = function (state = initialState, action) {
    console.log(action.type)
    return {
        feedAll: {
            data: fetchAllreducer(state.feedAll.data, action),
            isFetching: isFetchinReducer(state.feedAll.isFetching, action),
            feedCash: refreshFeedCashReducer(state.feedAll.feedCash, action),
            fetchErr: fetchErrReducer(state.feedAll.fetchErr, action),
            fetchErrText: fetchErrTextReducer(state.feedAll.fetchErrText, action)
        },
        loginState: {
            isLoginFetching: isLoginFetchinReducer(state.loginState.isLoginFetching, action),
            loginError: loginErrorReducer(state.loginState.loginError, action),
            loginData: loginDataReducer(state.loginState.loginData, action)
        },
        activePlan: {
            currentPlanRecept: activePlanReducer(state.activePlan.currentPlanRecept, action)
        }
    }
}



