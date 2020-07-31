import { combineReducers } from 'redux'
import * as actions from './actions'


const initialState = {
    feedAll: {
        isFetching: false,
        data: {}
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


export const rootReducer = function (state = initialState, action) {
    return {
        feedAll: {
            data: fetchAllreducer(state.feedAll.data, action),
            isFetching: isFetchinReducer(state.feedAll.isFetching, action)
        }
    }
}


// export const rootReducer = combineReducers({ counter: countReducer, status: statusReducer })

