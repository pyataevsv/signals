import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { isFetching } from '../reducers/actionCreators'
import Text from './SFText'
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Monthchart from './Monthchart'

import * as RNIap from 'react-native-iap'

function Stats(props) {

    if (!!props.feedAll.profiles[0]) {
        return (
            <View style={{ backgroundColor: 'rgb(255,255,255)', flex: 1 }}>
                {/* <View style={[styles.header]}>
                        <Text style={{ fontSize: 20, fontWeight: '700' }}>Stats</Text>
                    </View> */}

                <ScrollView style={{}}>
                    <View style={{ marginTop: 30, marginHorizontal: 10, marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text heavy style={{ fontSize: 25, color: 'rgb(50,50,90)' }}>STATISTIC</Text>
                    </View>
                    <LinearGradient
                        colors={['#9025FC', '#1308FE']}
                        start={[0, -1]}
                        end={[1, 0]}
                        style={styles.gradient}
                    >
                        <View style={{ flexDirection: 'row', flex: 1, marginRight: 20 }}>
                            <Text style={{ color: 'white', fontSize: 14 }}>Risk management updates when and how modify orders</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} style={styles.nextBtn}>
                            <Text style={{ color: '#1308FE', fontSize: 22 }}>Next</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <Monthchart />
                    <View style={{ marginTop: 5 }}>
                        <View style={styles.statBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text semibold style={{ fontSize: 20, marginRight: 10 }}>Signals</Text>
                                <Image style={{ width: 25, resizeMode: 'contain' }} source={require('../assets/icons/bell.png')} />
                            </View>
                            <View style={[styles.backlay, { backgroundColor: 'rgba(104, 28, 253,0.1)' }]}>
                                <Text semibold style={{ fontSize: 20, color: 'rgb(104, 28, 253)' }}>{props.feedAll.profiles[0].stat.signals}</Text>
                            </View>
                        </View>
                        <View style={[styles.statBox]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text semibold style={[{ fontSize: 20, marginRight: 10 }]}>Profitable deals</Text>
                                <Image style={{ width: 25, resizeMode: 'contain' }} source={require('../assets/icons/bucks.png')} />
                            </View>
                            <View style={[styles.backlay, { backgroundColor: 'rgba(0, 170, 37,0.1)' }]}>
                                <Text semibold style={{ fontSize: 20, color: 'rgb(0, 170, 37)' }}>{props.feedAll.profiles[0].stat.profitable_deals}</Text>
                            </View>
                        </View>
                        <View style={styles.statBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text semibold style={{ fontSize: 20, marginRight: 10 }}>Average loss</Text>
                                <Image style={{ width: 25, resizeMode: 'contain' }} source={require('../assets/icons/loss.png')} />
                            </View>
                            <View style={[styles.backlay, { backgroundColor: 'rgba(170, 0, 10,0.1)' }]}>
                                <Text semibold style={{ fontSize: 20, color: 'rgb(170, 0, 10)' }}>{props.feedAll.profiles[0].stat.average_loss}</Text>
                            </View>
                        </View>
                        <View style={styles.statBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text semibold style={{ fontSize: 20, marginRight: 10 }}>Duration</Text>
                                <Image style={{ width: 25, resizeMode: 'contain' }} source={require('../assets/icons/clock.png')} />
                            </View>
                            <View style={[styles.backlay, { backgroundColor: 'rgba(55, 98, 252,0.1)' }]}>
                                <Text semibold style={{ fontSize: 20, color: 'rgb(55, 98, 252)' }}>{props.feedAll.profiles[0].stat.duration}</Text>
                            </View>
                        </View>
                        <View style={styles.statBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text semibold style={{ fontSize: 20, marginRight: 10 }}>Total profit</Text>
                                <Image style={{ width: 25, resizeMode: 'contain' }} source={require('../assets/icons/profit.png')} />
                            </View>
                            <View style={[styles.backlay, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                                <Text semibold style={{ fontSize: 20, color: 'rgb(0,0,0)' }}>{props.feedAll.profiles[0].stat.profit}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 30, marginHorizontal: 10, marginBottom: 0, flexDirection: 'row', alignItems: 'center' }}>
                        <Text heavy style={{ fontSize: 25, color: 'rgb(50,50,90)' }}>PROFIT BY MARKET</Text>
                    </View>
                    <View style={styles.marketsBox}>
                        <View>
                            {props.feedAll.profiles[0].stat.markets.map((item, id) => {

                                const fontColor = (item.value > 0) ? 'rgb(19,8,254)' : 'rgb(198,37,252)'
                                const innerColor = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')'
                                const outerColor = 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',0.2)'

                                return (
                                    <View key={id} style={styles.markBox}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text semibold style={{ fontSize: 20 }}>{item.name}</Text>
                                            <View style={[styles.marketIndicator, { backgroundColor: 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',0.2)' }]}>
                                                <View style={[styles.marketIndicatorInner, { backgroundColor: 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')' }]}></View>
                                            </View>
                                        </View>
                                        <View style={[styles.backlay, { backgroundColor: 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',0.2)' }]}>
                                            <Text semibold style={{ fontSize: 20, color: 'black' }}>{item.value} %</Text>
                                        </View>
                                    </View>
                                )
                            })
                            }
                        </View>

                    </View>
                </ScrollView>
            </View >
        )
    } else if (isFetching) {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', minHeight: Dimensions.get('window').height }}>
                <Text>Something went wrong:(</Text>
            </View>
        )
    } else {
        return (
            <View>
                <Text> Something went wrong.. :( </Text>
            </View>
        )
    }


}


Stats = connect(
    //mapStateToProp
    (state) => {
        return {
            feedAll: state.feedAll.feedCash,
            isFetching: state.feedAll.isFetching,
            fetchErr: state.feedAll.fetchErr
        }
    },

    //mapDispatchToProp
    null
)(Stats)

const styles = StyleSheet.create({
    statBox: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginVertical: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(200,200,200)',

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,

        // elevation: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gradient: {
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 13,
        marginHorizontal: 10,
        flexWrap: 'nowrap',
        marginBottom: 10,
        marginTop: 20
    },
    nextBtn: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    marketsBox: {
        backgroundColor: '#ffffff',
        marginVertical: 20,
        marginHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgb(200,200,200)',

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.3,
        // shadowRadius: 3,

        // elevation: 6,

    },
    backlay: {
        alignItems: 'flex-end',
        backgroundColor: 'red',
        width: 100,
        paddingRight: 15,
        paddingVertical: 0,
        borderRadius: 40
    },
    markBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(241,241,241)',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    marketIndicator: {
        marginLeft: 10,
        position: 'relative',
        top: 2,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 20
    },
    marketIndicatorInner: {

        width: 10,
        height: 10,
        borderRadius: 50,

    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: 40,
        left: 0, width: '100%',
        backgroundColor: 'white',
        zIndex: 3,
        borderBottomWidth: 1,
        borderColor: 'rgb(200,200,200)'
    }

})



export default Stats
