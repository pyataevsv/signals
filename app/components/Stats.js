import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { isFetching } from '../reducers/actionCreators'

function Stats(props) {

    if (!!props.feedAll.profiles[0]) {
        return (
            <ScrollView>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.statBox}>
                        <Text style={{ fontSize: 20 }}>Signals</Text>
                        <Text style={{ fontSize: 20, color: '#1308fe' }}>{props.feedAll.profiles[0].stat.signals}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={{ fontSize: 20 }}>Profitable deals</Text>
                        <Text style={{ fontSize: 20, color: '#1308fe' }}>{props.feedAll.profiles[0].stat.profitable_deals}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={{ fontSize: 20 }}>Average loss</Text>
                        <Text style={{ fontSize: 20, color: '#1308fe' }}>{props.feedAll.profiles[0].stat.average_loss}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={{ fontSize: 20 }}>Duration</Text>
                        <Text style={{ fontSize: 20, color: '#1308fe' }}>{props.feedAll.profiles[0].stat.duration}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={{ fontSize: 20 }}>Total profit</Text>
                        <Text style={{ fontSize: 20, color: '#1308fe' }}>{props.feedAll.profiles[0].stat.profit}</Text>
                    </View>
                </View>
                <View style={styles.marketsBox}>
                    <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>Profit by market</Text>
                    </View>
                    <View>

                        {props.feedAll.profiles[0].stat.markets.map((item, id) => {

                            const fontColor = (item.value > 0) ? 'rgb(19,8,254)' : 'rgb(198,37,252)'

                            const innerColor = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')'
                            const outerColor = 'rgba(' + item.r + ',' + item.g + ',' + item.b + ',0.2)'

                            return (<View key={id} style={styles.markBox}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={[styles.marketIndicator, { backgroundColor: outerColor }]}>
                                        <View style={[styles.marketIndicatorInner, { backgroundColor: innerColor }]}></View>
                                    </View>
                                    <Text style={{ fontSize: 20, }}>{item.name}</Text>
                                </View>
                                <Text style={{ fontSize: 20, color: fontColor }}>{item.value} %</Text>
                            </View>)
                        })
                        }
                    </View>

                </View>
            </ScrollView>
        )
    } else if (isFetching) {
        return (
            <View>
                <Text> fething </Text>
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
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 2,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 2,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    marketsBox: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 20,

        paddingTop: 20,
        borderRadius: 2,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 2,

    },
    markBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(241,241,241)',
        paddingHorizontal: 20,
        paddingVertical: 20
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
    }

})



export default Stats
