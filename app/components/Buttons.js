import React from 'react'
import { StyleSheet, View, TouchableHighlight, Image, ActivityIndicator, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Text from './SFText'

export function MessageButton(props) {
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

export function HistoryButton(props) {
    return (
        <View style={hisStyles.elevation}>
            <TouchableHighlight underlayColor={'rgba(250,250,250,0.5)'} style={hisStyles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
                <View style={hisStyles.button}>
                    <Text style={hisStyles.text}>{props.title}</Text>
                    <Image style={{ width: 20, height: 30 }} source={require('../assets/icons/key_arrow_right.png')} />
                </View>
            </TouchableHighlight>
        </View>
    )
}
const hisStyles = StyleSheet.create({
    elevation: {
        // borderTopWidth: 1,
        // borderColor: 'rgb(222,222,222)'

    },
    touch: {
        alignSelf: 'center',
        width: '100%',

    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        fontSize: 14,
    },
})

export function SubscrBtn(props) {
    return (
        <TouchableHighlight style={SubStyles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
            <LinearGradient
                colors={['#db25fc', '#9526fc']}
                start={[0, 0]}
                end={[1, 0]}
                style={SubStyles.gradient}
            >
                <View style={SubStyles.button}>
                    <Text style={SubStyles.text}>{props.title}</Text>
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
}


const SubStyles = StyleSheet.create({
    touch: {
        borderRadius: 5,
        alignSelf: 'center'
    },
    gradient: {
        borderRadius: 5
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

export function LoginButton(props) {
    let gradient, border, whiteStyle = {}, roundStyle = {}

    gradient = ['#9025FC', '#1308FE']

    if (props.white) {
        gradient = ['white', 'white']
        whiteStyle = StyleSheet.create({
            gradient: {
                borderWidth: 1,
                borderColor: '#2E0FFE'
            },
            text: {
                color: '#2E0FFE',
                fontSize: 17
            }
        })
    }
    if (props.round) {
        roundStyle = StyleSheet.create({
            gradient: {
                borderRadius: Platform.OS === 'ios' ? 20 : 30,
            },
        })
    }

    return (
        <TouchableHighlight style={[LoginStyles.touch, roundStyle.gradient]} onPress={() => (props.onPress) ? props.onPress() : null}>
            <LinearGradient
                colors={gradient}
                start={[0, 0]}
                end={[1, 0]}
                style={[LoginStyles.gradient, whiteStyle.gradient, roundStyle.gradient]}
            >
                <View style={[LoginStyles.button, roundStyle.gradient]}>
                    {!props.fetching ? <Text semibold style={[LoginStyles.text, whiteStyle.text]}>{props.title}</Text> : <ActivityIndicator />}

                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
}


const LoginStyles = StyleSheet.create({
    touch: {
        borderRadius: 0,
        alignSelf: 'center',
        width: '100%'
    },
    gradient: {
        borderRadius: 0
    },
    button: {
        alignItems: "center",
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 0,

    },
    text: {
        fontSize: 17,
        color: 'white'
    },
})



export function TransparentButton(props) {
    let gradient, border, whiteStyle = {}, roundStyle = {}

    gradient = ['#9025FC', '#1308FE']

    if (props.white) {
        gradient = ['white', 'white']

    }
    if (props.round) {
        roundStyle = StyleSheet.create({
            gradient: {
                borderRadius: 23,
            },
        })
    }

    return (
        <TouchableHighlight underlayColor={'#6159ff'} style={[TransparentStyles.touch, roundStyle.gradient]} onPress={() => (props.onPress) ? props.onPress() : null}>
            <View style={[TransparentStyles.button, roundStyle.gradient]}>
                {!props.fetching ? <Text semibold style={[TransparentStyles.text]}>{props.title}</Text> : <ActivityIndicator />}

            </View>
        </TouchableHighlight>
    )
}


const TransparentStyles = StyleSheet.create({
    touch: {
        borderRadius: 5,
        alignSelf: 'center',
        width: '100%'
    },
    gradient: {
        borderRadius: 5
    },
    button: {
        alignItems: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 30,

    },
    text: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white'
    },
})




