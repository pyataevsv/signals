import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, SafeAreaView, StatusBar } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FeedStack } from './Feedstack'
import { Signup } from './Signup'
import Stats from './Stats'
import Header from './Header'


function Settings(props) {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Signup />
            </View >
        </View>
    )
}

const Drawer = createBottomTabNavigator();


function Root({ fetchAll }) {

    const [fetching, setFetchingStatus] = useState(true)

    useEffect(() => {
        if (fetching) {
            setFetchingStatus(false)
            fetchAll({ limit: 10, page: 1, key: '6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP' })//
        }
    })

    return (

        <NavigationContainer >
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
                <Drawer.Navigator
                    initialRouteName="Feed"
                >
                    <Drawer.Screen
                        name='Feed'
                        component={FeedStack}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => {
                                let iconPath = (focused) ? require('../assets/icons/feed.png') : require('../assets/icons/feed_black.png')
                                return <Image style={styles.tabIcon} source={iconPath} />
                            },
                            title: route.name

                        })}
                    />
                    <Drawer.Screen
                        name='Stats'
                        component={Stats}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => {
                                let iconPath = (focused) ? require('../assets/icons/stats1_active.png') : require('../assets/icons/stats1.png')
                                return <Image style={styles.tabIcon} source={iconPath} />
                            },
                            title: route.name

                        })}

                    />
                    <Drawer.Screen
                        name='Settings'
                        component={Settings}
                        options={({ route }) => ({
                            tabBarIcon: ({ focused, color }) => {
                                let iconPath = (focused) ? require('../assets/icons/set_active.png') : require('../assets/icons/fill5.png')
                                return <Image style={styles.tabIcon} source={iconPath} />
                            },
                            title: route.name

                        })}
                    />
                </Drawer.Navigator>
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
    null,

    //mapDispatchToProp
    (dispatch) => {
        return {
            fetchAll: (e) => dispatch(actionCreators.fetchALL(e)),
        }
        //6MHcOk1qs2SPAvVyUeoj8zMFQQSW66AocxQkzDNvdsHfoH9TdUOeI83JIcpeWelP
    }
)(Root)


export default Root