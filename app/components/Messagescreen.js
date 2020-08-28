

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import Text from './SFText'

function Historyscreen(props) {

    const uri = props.route.params.link

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {

            props.navigation.push('Feed')
            props.navigation.popToTop()
        });

        return unsubscribe
    }, [props.navigation])

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



