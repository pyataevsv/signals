import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { MessageButton } from './Buttons'
import Text from './SFText'

export default function Messagecard(props) {
    let signalData = props.signalData
    return (
        <View style={styles.container}>
            <Image style={{ width: '100%', height: 300, resizeMode: 'cover' }} source={{ uri: signalData.image }} />
            <MessageButton onPress={() => props.navigation.navigate('message' + signalData.signal_id, { link: signalData.link })} title='Details' />
            <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                <Text style={{ textAlign: 'justify' }}>{signalData.text}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        // borderWidth: 1,
        // borderColor: 'rgb(200,200,200)',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 10,
    },

})