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

export default function Feed({ fetchAll, navigation, feedCash, isFetching }) {

    const [blockFetching, setBlockFetching] = useState(false)
    const [fetching, setFetchingStatus] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        if (fetching) {
            setFetchingStatus(false)
            fetchAll({ limit: 3, page: currentPage, key: '6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP' })
        }
    })

    return (
        <ScrollView style={styles.view}
            onScroll={(e) => {
                if ((e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height - 50) && !blockFetching) {

                    setCurrentPage(currentPage + 1)
                    setFetchingStatus(true)

                    setBlockFetching(true)
                    setTimeout(() => {
                        setBlockFetching(false)
                    }, 2000);

                }
            }}
            scrollEventThrottle={100}
        >
            <Header navigation={navigation} />
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
                    }) :
                    null

            }

            {(isFetching) ?
                <View style={{ alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
                : null}
        </ScrollView>
    )
}


Feed = connect(
    //mapStateToProp
    (state) => {
        return {
            feedCash: state.feedAll.feedCash,
            isFetching: state.feedAll.isFetching
        }
    },

    //mapDispatchToProp
    (dispatch) => {
        return {
            fetchAll: (e) => dispatch(actionCreators.fetchALL(e))
        }
        //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
    }
)(Feed)




const styles = StyleSheet.create({
    view: {
        paddingTop: 0,
    }
})
