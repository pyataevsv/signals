import React, { useState, useEffect, useRef, useReducer } from 'react'
import { StyleSheet, View, Button, Image, ScrollView, ActivityIndicator, RefreshControl, Animated } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import Signalcard from './Signalcard'
import Subscrcard from './Sbscrcard'
import Donecard from './Donecard'
import Header from './Header'
import Historycard from './Historycard'
import Historyscreen from './Historyscreen'
import Message from './Messagecard'
import Signal from './Signal'
import Text from './SFText'

export default function Feed({ fetchAll, navigation, feedCash, isFetching, clearCash, fetchALLWithClear, fetchErr, api_key }) {

    const [blockFetching, setBlockFetching] = useState(false)
    const [fetching, setFetchingStatus] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [loaderDirection, setLoaderDirection] = useState('top')
    const [showErrMessage, setShowErrMessage] = useState(true)
    const [headerWord, setHeaderWord] = useState('feed')
    const [cardsY, setCardsY] = useState([])

    const yOffset = useRef(new Animated.Value(0)).current
    const headXY = useRef([])
    const keyRef = useRef(api_key)


    useEffect(() => {
        if (fetching) {
            setFetchingStatus(false)
            fetchAll({ limit: 10, page: currentPage, key: api_key })//6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP

        }
        if (api_key != keyRef.current) {
            keyRef.current = api_key
            setCardsY([])
        }
    })


    const headerTop = yOffset.interpolate({
        inputRange: [0, 200],
        outputRange: [-40, 0],
        extrapolate: 'clamp'
    })



    function getDonOffset(mass) {

        for (let item of mass) {
            if (item[2] === 'Done') return item[0]
        };
        return null
    }



    return (
        <View style={{ backgroundColor: 'rgb(240,240,240)', }} >
            <Animated.View style={[styles.header, { top: headerTop, }]}>
                <Text heavy style={{ fontSize: 16 }}>{headerWord}</Text>
            </Animated.View>
            <ScrollView style={{ backgroundColor: 'rgb(250,250,250)', marginTop: 0 }}
                contentContainerStyle={{ paddingTop: 0 }}

                onScroll={(e) => {
                    if ((e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height >= e.nativeEvent.contentSize.height - 500) && !blockFetching && feedCash.page_info.has_next_page && cardsY.length > 0) {

                        setShowErrMessage(true)//!blockFetching
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

                    let doneOffset = getDonOffset(cardsY.sort((x, y) => x[0] - y[0]))


                    if (doneOffset > e.nativeEvent.contentOffset.y) {
                        setHeaderWord('ACTIVE SIGNALS')
                    } else {
                        setHeaderWord('CLOSED SIGNALS')
                    }

                    Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: {
                                    y: yOffset
                                }
                            }
                        }
                    ], { useNativeDriver: false })(e)
                }}

                scrollEventThrottle={10}
                refreshControl={
                    <RefreshControl refreshing={(isFetching && loaderDirection == 'top')} onRefresh={() => {
                        if (!blockFetching) {
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

                            fetchALLWithClear({ limit: 10, page: 1, key: api_key }, feedCash.page_info.total_lines)
                            //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
                        }
                    }} />
                }>
                {(fetchErr && feedCash.messages.length != 0 && showErrMessage) ?
                    <View style={{ backgroundColor: 'red', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold', paddingVertical: 1 }}>Something went wrong...</Text>
                    </View>
                    : null}
                {(fetchErr && feedCash.messages.length === 0) ?
                    <View style={{ alignItems: 'center' }}>
                        <Text>Something went wrong!</Text>
                    </View>
                    : null}
                <View>
                    {(feedCash.messages.length > 0) ?
                        <View style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                            {(feedCash.messages.length > 0) ? <Signal color={'rgba(31,200,50,0.4)'} radius={20} /> : null}
                            <View style={{ alignItems: 'center' }}>
                                <Text heavy style={{ fontSize: 25, color: 'rgb(50,50,90)' }}>ACTIVE SIGNALS</Text>
                            </View>
                        </View> : null}
                    {(feedCash.messages[0] != undefined) ?
                        feedCash.messages.map((item, id) => {
                            if (item.type === 'signal' && item.status === 'done') {
                                return (
                                    <Donecard feedAll={feedCash} key={id} signalData={item} id={id} setHeader={(x) => setCardsY(cardsY.concat([x]))} />
                                )
                            }
                            if (item.type === 'signal' && item.status === 'active' && item.has_subscription === false && item.payment === 'paid') {
                                return (
                                    <Subscrcard feedAll={feedCash} signalData={item} key={id} id={id} />
                                )
                            }
                            if (item.type === 'signal' && item.status === 'active' && ((item.has_subscription === true && item.payment === 'paid') || item.payment === 'free')) {
                                return (
                                    <Signalcard feedAll={feedCash} signalData={item} key={id} id={id} setHeader={(x) => setCardsY(cardsY.concat([x]))} />
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

                    {(!feedCash.page_info.has_next_page && feedCash.messages.length > 0) ?
                        <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: 'rgb(50,50,90)' }}>-END-</Text>
                            </View>
                        </View> : null
                    }

                    {(isFetching && loaderDirection === 'bottom') ?
                        <View style={{ alignItems: 'center' }}>
                            <ActivityIndicator size="large" />
                        </View>
                        : null}
                </View>
            </ScrollView>
        </ View >
    )
}


Feed = connect(
    //mapStateToProp
    (state) => {
        return {
            feedCash: state.feedAll.feedCash,
            isFetching: state.feedAll.isFetching,
            fetchErr: state.feedAll.fetchErr,
            api_key: state.loginState.loginData.key
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
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 40,
        left: 0, width: '100%',
        backgroundColor: 'white',
        zIndex: 3,
        borderBottomWidth: 1,
        borderColor: 'rgb(200,200,200)',
    },
    marketIndicator: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 50
    },
    marketIndicatorInner: {
        width: 10,
        height: 10,
        borderRadius: 50
    },
})
