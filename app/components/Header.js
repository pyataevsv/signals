import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'


export default function Header(props) {
    return (
        <View style={{
            padding: 15,
            backgroundColor: 'white',
        }}>
            <TouchableWithoutFeedback onPress={() => props.navigation.openDrawer()}>
                <Image
                    style={{ width: 30, height: 25 }}
                    source={require('../assets/icons/menu.png')} />
            </TouchableWithoutFeedback>
        </View>)

}