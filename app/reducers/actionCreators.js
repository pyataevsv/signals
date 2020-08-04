import * as actions from './actions'

export function asyncAddCounter() {

    return (dispatch) => {
        dispatch(setAsyncStatus('PROGRESS'))
        setTimeout(() => {
            dispatch(addCounter())
            dispatch(setAsyncStatus('DONE'))
        }, 2000);
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

export function fetchALL({ limit = '', page = '', key = '' }) {
    let url = 'http://148.251.195.78:99/app/all'

    if (!!limit || !!page || !!key) url = url + '?'
    if (!!limit) url = url + 'limit=' + limit + '&'
    if (!!page) url = url + 'page=' + page + '&'
    if (!!key) url = url + 'key=' + key + '&'




    return (dispatch) => {

        dispatch(isFetching(true))
        dispatch(fetchErr(false))
        setTimeout(() => {
            fetch(url)
                .then(resp => {
                    dispatch(isFetching(false))
                    if (!resp.ok) {
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
                    dispatch(fetchErr(true))
                })
        }, 1000);
    }
}

export function fetchALLWithClear({ limit = '', page = '', key = '' }, total_lines) {
    let url = 'http://148.251.195.78:99/app/all'


    if (!!limit || !!page || !!key) url = url + '?'
    if (!!limit) url = url + 'limit=' + limit + '&'
    if (!!page) url = url + 'page=' + page + '&'
    if (!!key) url = url + 'key=' + key + '&'

    console.log('wtf')
    return (dispatch) => {

        dispatch(isFetching(true))
        dispatch(fetchErr(false))
        setTimeout(() => {
            fetch(url)
                .then(resp => {
                    dispatch(isFetching(false))
                    if (!resp.ok) {
                        throw new Error(resp.statusText)
                    }
                    return resp
                })
                .then(resp => resp.json())
                .then(feed => {
                    if (feed.page_info.total_lines != total_lines) {
                        console.log('go')
                        dispatch(clearCash())
                        dispatch(fetchAllSuccess(feed))
                        dispatch(refreshFeedCash(feed))
                    }

                })
                .catch(err => {
                    dispatch(fetchErr(true))
                })
        }, 1000);
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
