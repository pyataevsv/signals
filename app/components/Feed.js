import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, ActivityIndicator } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import Signalcard from './Signalcard'
import Subscrcard from './Sbscrcard'
import Donecard from './Donecard'
import Header from './Header'
import Historycard from './Historycard'
import Historyscreen from './Historyscreen'
import Message from './Messagecard'

export default function Feed({ fetchAll, navigation, feedCash, isFetching, clearCash, fetchALLWithClear, fetchErr }) {

    const [blockFetching, setBlockFetching] = useState(false)
    const [fetching, setFetchingStatus] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [loaderDirection, setLoaderDirection] = useState('top')
    const [showErrMessage, setShowErrMessage] = useState(true)
    const [headerHeight, setHeaderHeight] = useState(0)

    useEffect(() => {
        if (fetching) {
            setFetchingStatus(false)
            fetchAll({ limit: 10, page: currentPage, key: '6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP' })//6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
        }
    })

    return (
        <>

            <ScrollView style={{ backgroundColor: 'white' }}
                contentContainerStyle={{ paddingTop: 0 }}

                onScroll={(e) => {
                    if ((e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height - 10) && !blockFetching) {
                        setShowErrMessage(true)
                        setTimeout(() => {
                            setShowErrMessage(false)
                        }, 4000)
                        setLoaderDirection('bottom')
                        setCurrentPage(currentPage + 1)
                        setFetchingStatus(true)

                        setBlockFetching(true)
                        setTimeout(() => {
                            setBlockFetching(false)
                        }, 2000);

                    }
                    if (e.nativeEvent.contentOffset.y <= 0 && !blockFetching) {
                        setShowErrMessage(true)
                        setTimeout(() => {
                            setShowErrMessage(false)
                        }, 4000)
                        setLoaderDirection('top')
                        // setCurrentPage(1)
                        setBlockFetching(true)

                        // clearCash()
                        // setFetchingStatus(true)
                        setTimeout(() => {
                            setBlockFetching(false)
                        }, 2000);

                        fetchALLWithClear({ limit: 3, page: 1, key: '6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP' }, feedCash.page_info.total_lines) //feedCash.page_info.total_lines
                        //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP

                    }
                }}
                scrollEventThrottle={100}

            >

                {(fetchErr && feedCash.messages.length === 0) ?
                    <View style={{ alignItems: 'center' }}>
                        <Text>Something went wrong!</Text>
                    </View>
                    : null}
                {(fetchErr && feedCash.messages.length != 0 && showErrMessage) ?
                    <View style={{ backgroundColor: 'red', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', paddingVertical: 1 }}>Something went wrong...</Text>
                    </View>
                    : null}
                <View>
                    {(isFetching && loaderDirection == 'top') ?
                        <View style={{ alignItems: 'center' }}>
                            <ActivityIndicator size="large" />
                        </View>
                        : null}

                    {
                        (feedCash.messages[0] != undefined) ?
                            feedCash.messages.map((item, id) => {

                                if (item.type === 'signal' && item.status === 'done') {
                                    return (
                                        <Donecard feedAll={feedCash} signalData={item} key={id} id={id} />
                                    )
                                }
                                if (item.type === 'signal' && item.status === 'active' && item.has_subscription === false && item.payment === 'paid') {
                                    return (
                                        <Subscrcard feedAll={feedCash} signalData={item} key={id} id={id} />
                                    )
                                }
                                if (item.type === 'signal' && item.status === 'active' && ((item.has_subscription === true && item.payment === 'paid') || item.payment === 'free')) {
                                    return (
                                        <Signalcard feedAll={feedCash} signalData={item} key={id} id={id} />
                                    )
                                }
                                if (item.type === 'history') {
                                    return (

                                        <Historycard feedAll={feedCash} navigation={navigation} signalData={item} key={id} id={id} />

                                    )
                                }
                                if (item.type === 'message') {
                                    return (

                                        <Message key={id} navigation={navigation} signalData={item} id={id} />
                                    )
                                }

                            }) :
                            null

                    }

                    {(isFetching && loaderDirection === 'bottom') ?
                        <View style={{ alignItems: 'center' }}>
                            <ActivityIndicator size="large" />
                        </View>
                        : null}
                </View>
            </ScrollView>
        </>
    )
}


Feed = connect(
    //mapStateToProp
    (state) => {
        return {
            feedCash: state.feedAll.feedCash,
            isFetching: state.feedAll.isFetching,
            fetchErr: state.feedAll.fetchErr
        }
    },

    //mapDispatchToProp
    (dispatch) => {
        return {
            fetchAll: (e) => dispatch(actionCreators.fetchALL(e)),
            clearCash: () => dispatch(actionCreators.clearCash()),
            fetchALLWithClear: (req, total_lines) => dispatch(actionCreators.fetchALLWithClear(req, total_lines))
        }
        //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
    }
)(Feed)




const styles = StyleSheet.create({
    view: {
        paddingTop: 0,

    }
})
