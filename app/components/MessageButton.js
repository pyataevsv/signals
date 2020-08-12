import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

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
                    <Image source={require('../assets/icons/key_arrow_right-white.png')} />
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
}

export default Btn

const styles = StyleSheet.create({
    touch: {
        alignSelf: 'center',
        width: '100%',
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
})
