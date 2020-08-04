import { combineReducers } from 'redux'
import * as actions from './actions'


const initialState = {
    feedAll: {
        isFetching: false,
        data: {},
        fetchErr: false,
        feedCash: {
            messages: [],
            profiles: [],
            promos: [],
            history_items: [],
            page_info: {}
        }
    }
}

function isFetchinReducer(state, action) {
    if (action.type === actions.IS_FETCHING) {
        return action.isFetching
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




export const rootReducer = function (state = initialState, action) {
    return {
        feedAll: {
            data: fetchAllreducer(state.feedAll.data, action),
            isFetching: isFetchinReducer(state.feedAll.isFetching, action),
            feedCash: refreshFeedCashReducer(state.feedAll.feedCash, action),
            fetchErr: fetchErrReducer(state.feedAll.fetchErr, action)
        }
    }
}


// export const rootReducer = combineReducers({ counter: countReducer, status: statusReducer })

