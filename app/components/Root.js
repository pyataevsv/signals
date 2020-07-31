import 'react-native-gesture-handler'
import React, { useState, useReducer } from 'react'
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native'
import { store } from '../config/store'
import { Provider, connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { Feed } from './Feed'
import { Signup } from './Signup'
import Header from './Header'

function Settings(props) {

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Signup />
            </View >
        </View>
    )
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Image style={{ height: 100, width: 400 }} source={require('../assets/icons/trading1.png')} />
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

const Root = () => {

    return (
        <Provider store={store}>
            <NavigationContainer >
                <SafeAreaView style={{ flex: 1 }}>
                    <Drawer.Navigator
                        drawerContent={props => <CustomDrawerContent {...props} />}
                        initialRouteName="Settings"
                    >
                        <Drawer.Screen
                            name='Feed'
                            component={Feed}
                            options={{ title: 'Feed' }}
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
        </Provider>
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
export default Root