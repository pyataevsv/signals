import 'react-native-gesture-handler'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FeedStack } from './Feedstack'
import Stats from './Stats'

import Setscreen from './Setscreen'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from './WelcomeScreen'
import Premiumscreen from './Premiumscreen'
import Brokerpromo from './Brokerpromo'
import Buyoptscreen from './Buyoptscreen'

import * as Analytics from 'expo-firebase-analytics'


function TabNavigator(props) {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    borderTopWidth: 1,
                    borderTopColor: 'rgb(200,200,200)'
                },
            }}
            // initialRouteName="Feed"
            initialRouteName="Stats"
        >
            <Tab.Screen
                name='Feed'
                component={FeedStack}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconPath = (focused) ? require('../assets/icons/feed.png') : require('../assets/icons/feed_black.png')
                        return <Image style={styles.tabIcon} source={iconPath} />
                    },
                    title: route.name,
                })}

            />
            <Tab.Screen
                name='Stats'
                component={Stats}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconPath = (focused) ? require('../assets/icons/stats_a.png') : require('../assets/icons/stats.png')
                        return <Image style={styles.tabIcon} source={iconPath} />
                    },
                    title: 'Stats'

                })}

            />
            <Tab.Screen
                name='Setscreen'
                component={Setscreen}
                options={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconPath = (focused) ? require('../assets/icons/settings_a.png') : require('../assets/icons/settings.png')
                        return <Image style={styles.tabIcon} source={iconPath} />
                    },
                    title: route.name

                })}
            />
        </Tab.Navigator>
    )
}

const Tab = createBottomTabNavigator()
const WelcomeStack = createStackNavigator()


function Root({ fetchAll, fetchALLWithClear, api_key, firstEnter, fontLoad }) {
    const keyRef = useRef('bonjour')
    const routeNameRef = React.useRef()
    const navigationRef = React.useRef()
    console.log(fontLoad)


    useEffect(() => {
        if (keyRef.current != api_key) {
            keyRef.current = api_key
            fetchALLWithClear({ limit: 10, page: 1, key: api_key }, -1)

        }
    })
    console.log(fontLoad)

    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
            onStateChange={() => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name
                if (previousRouteName !== currentRouteName) {
                    Analytics.setCurrentScreen(currentRouteName);
                }
                routeNameRef.current = currentRouteName;
            }}
        >
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
                <WelcomeStack.Navigator
                // mode='modal'
                >
                    {/* {firstEnter ? <WelcomeStack.Screen name='WelcomeScreen' component={WelcomeScreen} /> : null} */}
                    {/* <WelcomeStack.Screen options={{ headerShown: false }} name='WelcomeScreen' component={WelcomeScreen} /> */}
                    <WelcomeStack.Screen options={{ headerShown: false }} name='TabNavigator' component={TabNavigator} />
                    <WelcomeStack.Screen options={{ title: '' }} name="Premiumscreen" component={Premiumscreen} />
                    <WelcomeStack.Screen options={{ title: '' }} name="Brokerpromo" component={Brokerpromo} />
                    <WelcomeStack.Screen options={{ title: '' }} name="Buyoptscreen" component={Buyoptscreen} />
                </WelcomeStack.Navigator>
            </SafeAreaView>

        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        flex: 1,
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    bottomTab: {
        backgroundColor: '#ffffff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    }
})

Root = connect(
    //mapStateToProp
    (state) => {
        return {
            api_key: state.loginState.loginData.key,
            fontLoad: state.fontLoadState
        }
    },

    //mapDispatchToProp
    (dispatch) => {
        return {
            fetchALLWithClear: (x, y) => dispatch(actionCreators.fetchALLWithClear(x, y)),
        }
        //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
    }
)(Root)


export default Root