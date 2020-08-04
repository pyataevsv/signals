
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import React, { useState, useReducer } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import Signalcard from './Signalcard'
import Subscrcard from './Sbscrcard'
import Donecard from './Donecard'
import Header from './Header'
import Historycard from './Historycard'
import Historyscreen from './Historyscreen'
import Feed from './Feed'

const Stack = createStackNavigator()

export function FeedStack(props) {

    return (
        <Stack.Navigator
            screenOptions={({ route }) => {
                if (route.name === 'FeedStack') {
                    return {
                        headerShown: false,
                    }
                } else {
                    return {
                        title: 'History'
                    }
                }
            }}
        >
            <Stack.Screen name="FeedStack" component={Feed} />
            {('messages' in props.feedAll) ?

                (Array.from(new Set(props.feedAll.messages.filter(i => i.type === 'history').map(i => i.signal_id)))).map((item, id) => {

                    return <Stack.Screen key={id} name={'History' + item} component={Historyscreen} />

                }) : null}

        </Stack.Navigator>
    );
}

FeedStack = connect(
    //mapStateToProp
    (state) => {
        return {
            feedAll: state.feedAll.feedCash,
        }
    },

    //mapDispatchToProp
    (dispatch) => {
        return {
            fetchAll: () => dispatch(actionCreators.fetchALL({ limit: 20, key: '6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP' }))
        }
        //
    }
)(FeedStack)



const styles = StyleSheet.create({
    view: {
        paddingTop: 0,
    }
})



