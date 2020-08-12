

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'


function Historyscreen(props) {

    const uri = props.route.params.link
    console.log(props.route.name)

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri }} />
        </View>
    )
}

export default Historyscreen

const styles = StyleSheet.create({
    view: {
        paddingTop: 0,
    }
})



