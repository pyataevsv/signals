import React from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Text from './SFText'

function Btn(props) {
    return (
        <TouchableHighlight style={styles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
            <LinearGradient
                colors={['#db25fc', '#9526fc']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradient}
            >
                <View style={styles.button}>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
}

export default Btn

const styles = StyleSheet.create({
    touch: {
        borderRadius: 23,
        alignSelf: 'center'
    },
    gradient: {
        borderRadius: 23
    },
    button: {
        alignItems: "center",
        backgroundColor: "transparent",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 23,

    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
    },
})
