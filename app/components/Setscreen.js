

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Image, SafeAreaView, StatusBar, Platform, Dimensions } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import Signup from './Signup'
import Premiumscreen from './Premiumscreen'
import Brokerpromo from './Brokerpromo'
import Buyoptscreen from './Buyoptscreen'
import { Signin } from './Signin'
import Text from './SFText'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin'

import * as RNIap from 'react-native-iap'

const Stack = createStackNavigator();

export default function App(props) {
    return (
        <Stack.Navigator initialRouteName='Setscreen'>
            <Stack.Screen name="Setscreen" options={{ headerShown: false }} component={Setscreen} />
            {!props.is_authorized ?
                <>
                    <Stack.Screen options={{ headerShown: true, title: '', headerBackTitle: 'Back' }} name="Signupscreen" component={Signupscreen} />
                    <Stack.Screen options={{ headerShown: true, title: '', headerBackTitle: 'Back' }} name="Loginscreen" component={Loginscreen} />
                </> : null}
            {/* <Stack.Screen name="Premiumscreen" component={Premiumscreen} />
                <Stack.Screen name="Brokerpromo" component={Brokerpromo} />
                <Stack.Screen name="Buyoptscreen" component={Buyoptscreen} /> */}
            {/* <Stack.Screen options={{ headerShown: false }} name="Signupscreen" component={Signupscreen} />
                <Stack.Screen options={{ headerShown: false }} name="Loginscreen" component={Loginscreen} /> */}
        </Stack.Navigator>
    );
}



function Signupscreen(props) {

    const [state, setState] = useState({ result: '', subscriptions: '', products: '' })

    useEffect(() => {
        const itemSkus = Platform.select({
            ios: [
                'iap1'
            ],
            android: [
                'com.mightio.signal.sub1',
                'android.test.purchased',
                'android.test.canceled',
            ]
        })

        async function getProducts() {

            try {
                const result = await RNIap.initConnection();
                console.log('result', result);

                const subscriptions = await RNIap.getSubscriptions(itemSkus);
                console.log('subscriptions', subscriptions);

                // setState({ result, subscriptions, products })
            } catch (err) {
                console.warn(err) // standardized err.code and err.message available
            }
        }
        getProducts()
    })
    console.log(state.result)
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

    GoogleSignin.configure({
        webClientId: '818625970032-fnnq7isghkv5tvk815m00vq1et11a5oq.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    })


    const signOut = async () => {

        const isSignedIn = await GoogleSignin.isSignedIn();

        if (isSignedIn) {
            try {
                await GoogleSignin.revokeAccess();
                await GoogleSignin.signOut();

            } catch (error) {
                console.log('here is error')
                console.error(error);
            }
        } else {
            props.logOut()
        }
    };


    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text bold style={{ textAlign: 'center' }}>{props.user.fname} {props.user.lname}</Text>
                <Text bold style={{ textAlign: 'center' }}>{props.user.email}</Text>
                {props.is_authorized ?
                    <Button title='Log out' onPress={() => {
                        signOut()
                        props.logOut()
                    }} />
                    :
                    <Button title='LogIn/SignIn' onPress={() => {
                        props.navigation.navigate('Signupscreen')
                    }} />}
                {!props.currentPlanRecept ?
                    <Button title='Go premium' onPress={() => props.is_authorized ?
                        props.navigation.navigate('Premiumscreen')
                        :
                        props.navigation.navigate('Signupscreen')
                    } />
                    :
                    props.is_authorized ?
                        <Text>Yor plan :{JSON.parse(props.currentPlanRecept).productId}</Text>
                        : null
                }
            </View >
        </View>
    )
}

Setscreen = connect(
    (state) => {
        return {
            user: state.loginState.loginData,
            currentPlanRecept: state.activePlan.currentPlanRecept,
            is_authorized: state.loginState.loginData.is_authorized
        }
    },
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
