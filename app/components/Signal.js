import React, { Component, useRef, useEffect } from 'react'
import { View, Animated, StyleSheet } from 'react-native'
import { Easing } from "react-native"

export default function Signal(props) {

    const enter = useRef('bonjour')

    const fadeAnim = useRef(new Animated.Value(1))
    const fadeAnimIn = useRef(new Animated.Value(1))


    useEffect(() => {
        // if (enter.current === 'bonjour') {

        enter.current = false;

        Animated.loop(
            Animated.timing(fadeAnim.current, {
                toValue: 0,
                duration: 5000,
                easing: Easing.linear,
                useNativeDriver: false
            })).start()

        Animated.sequence([
            Animated.delay(2500),
            Animated.loop(
                Animated.timing(fadeAnimIn.current, {
                    toValue: 0,
                    duration: 5000,
                    easing: Easing.linear,
                    useNativeDriver: false
                }))
        ]).start()

        // }
    })

    const styles = StyleSheet.create({
        box: {
            marginRight: 15,
            marginLeft: 5,
            justifyContent: 'center',
            alignItems: 'center',

        },
        marketIndicator: {
            position: 'absolute',
            borderRadius: props.radius,
            width: props.radius,
            height: props.radius,
            backgroundColor: props.color,

        }
    })


    return (
        <View style={styles.box}>
            <Animated.View
                style={
                    [styles.marketIndicator,
                    {
                        transform: [{
                            scale: fadeAnim.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [2, 0]
                            })
                        }]
                    },
                    { opacity: fadeAnim.current }]}>

            </Animated.View>
            <Animated.View
                style={
                    [styles.marketIndicator,
                    { backgroundColor: props.color },
                    {
                        transform: [{
                            scale: fadeAnimIn.current.interpolate({
                                inputRange: [0, 1],
                                outputRange: [2, 0]
                            })
                        }]
                    },
                    { opacity: fadeAnimIn.current }]}>
            </Animated.View>
        </View>
    )

}


