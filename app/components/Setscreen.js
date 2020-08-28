

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Image, SafeAreaView, StatusBar } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from './Signup'
import Premiumscreen from './Premiumscreen'
import Brokerpromo from './Brokerpromo'
import Buyoptscreen from './Buyoptscreen'
import { Signin } from './Signin'
import Text from './SFText'
const Stack = createStackNavigator();

export default function App(props) {

    return (
        (props.is_authorized ?
            <Stack.Navigator initialRouteName='Setscreen'>
                <Stack.Screen name="Setscreen" component={Setscreen} />
                {/* <Stack.Screen name="Premiumscreen" component={Premiumscreen} />
                <Stack.Screen name="Brokerpromo" component={Brokerpromo} />
                <Stack.Screen name="Buyoptscreen" component={Buyoptscreen} /> */}
                {/* <Stack.Screen options={{ headerShown: false }} name="Signupscreen" component={Signupscreen} />
                <Stack.Screen options={{ headerShown: false }} name="Loginscreen" component={Loginscreen} /> */}
            </Stack.Navigator>
            :
            <Stack.Navigator initialRouteName='Signupscreen'>
                {/* <Stack.Screen name="Setscreen" component={Setscreen} /> */}
                <Stack.Screen options={{ headerShown: false }} name="Signupscreen" component={Signupscreen} />
                <Stack.Screen options={{ headerShown: false }} name="Loginscreen" component={Loginscreen} />
            </Stack.Navigator>
        )
    );
}


function Signupscreen(props) {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Signup navigation={props.navigation} />
            </View >
        </View>
    )
}

function Loginscreen(props) {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Signin navigation={props.navigation} />
            </View >
        </View>
    )
}


function Setscreen(props) {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Button title='Log out' onPress={() => props.logOut()} />
                <Button title='Go premium' onPress={() => props.navigation.navigate('Premiumscreen')} />
            </View >
        </View>
    )
}

Setscreen = connect(
    null,
    (dispatch) => {
        return {
            logOut: () => dispatch(actionCreators.logOut())
        }
    }
)(Setscreen)


App = connect(
    (state) => {
        return {
            is_authorized: state.loginState.loginData.is_authorized
        }
    },
    null
)(App)
