

import React, { useState, useReducer } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import Signalcard from './Signalcard'
import Subscrcard from './Sbscrcard'
import Donecard from './Donecard'
import Historycard from './Historycard'


function Historyscreen(props) {

    const items = props.route.params.history_items

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.view}>
                {
                    (items) ?
                        items.map((item, id) => {
                            if (item.type === 'signal' && item.status === 'done') {
                                return (
                                    <Donecard feedAll={props.feedAll} signalData={item} key={id} />
                                )
                            }
                            if (item.type === 'signal' && item.status === 'active' && item.has_subscription === false && item.payment === 'paid') {
                                return (
                                    <Subscrcard feedAll={props.feedAll} signalData={item} key={id} />
                                )
                            }
                            if (item.type === 'signal' && item.status === 'active' && ((item.has_subscription === true && item.payment === 'paid') || item.payment === 'free')) {
                                return (
                                    <Signalcard feedAll={props.feedAll} signalData={item} key={id} />
                                )
                            }
                            if (item.type === 'history') {
                                return (
                                    <Historycard feedAll={props.feedAll} signalData={item} key={id} />
                                )
                            }
                        }) :
                        null

                }
            </ScrollView>
        </View>
    )
}

Historyscreen = connect(
    //mapStateToProp
    (state) => {
        return {
            feedAll: state.feedAll.feedCash,
        }
    },

    //mapDispatchToProp

)(Historyscreen)

export default Historyscreen

const styles = StyleSheet.create({
    view: {
        paddingTop: 0,
    }
})



