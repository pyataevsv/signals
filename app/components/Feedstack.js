
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'

import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { connect } from 'react-redux'

import Historyscreen from './Historyscreen'
import Messagescreen from './Messagescreen'
import Feed from './Feed'

const Stack = createStackNavigator()

export function FeedStack(props) {
    return (
        <Stack.Navigator
            screenOptions={({ route }) => {
                if (route.name === 'Feed') {
                    return {
                        headerShown: false,
                    }
                } else if (route.name.slice(0, 3) === 'his') {
                    return {
                        title: 'History'
                    }
                } else {
                    return {
                        title: 'Title'
                    }
                }
            }}
        >
            <Stack.Screen name="Feed" component={Feed} />
            {('messages' in props.feedAll) ?

                [...new Set(props.feedAll.messages.filter(i => (i.type === 'history' || i.type === 'message')).map((i, f, arr) =>
                    ({
                        type: i.type,
                        signal_id: i.signal_id,
                    })).map(i => JSON.stringify(i)))]
                    .map(i => JSON.parse(i))
                    .map((item, id, arr) => {

                        if (item.type === 'history') return <Stack.Screen key={id} name={item.type + item.signal_id} component={Historyscreen} />
                        if (item.type === 'message') return <Stack.Screen key={id} name={item.type + item.signal_id} component={Messagescreen} />

                    })
                : null}

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

    // //mapDispatchToProp
    // (dispatch) => {
    //     return {
    //         fetchAll: () => dispatch(actionCreators.fetchALL({ limit: 10, key: '6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP' }))
    //     }
    //     //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
    // }
)(FeedStack)



const styles = StyleSheet.create({
    view: {
        paddingTop: 0,
    }
})



