import { combineReducers } from 'redux'
import * as actions from './actions'


const initialState = {
    feedAll: {
        isFetching: false,
        data: {},
        feedCash: {
            messages: [],
            profiles: [],
            promos: [],
            history_items: [],
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

function refreshFeedCashReducer(state, action) {
    if (action.type === actions.REFRESG_FEED_CASH) {

        return {
            messages: state.messages.concat(action.data.messages),
            profiles: state.messages.concat(action.data.profiles),
            promos: state.messages.concat(action.data.promos),
            history_items: state.messages.concat(action.data.history_items),
        }
    }
    return state
}




export const rootReducer = function (state = initialState, action) {
    return {
        feedAll: {
            data: fetchAllreducer(state.feedAll.data, action),
            isFetching: isFetchinReducer(state.feedAll.isFetching, action),
            feedCash: refreshFeedCashReducer(state.feedAll.feedCash, action)

        }
    }
}


// export const rootReducer = combineReducers({ counter: countReducer, status: statusReducer })

