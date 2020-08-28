import React from 'react'
import { View, SafeAreaView, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { LoginButton } from './Buttons'
import { TransparentButton } from './Buttons'
import Text from './SFText'

const Buyoptscreen = () => {
    return (
        <LinearGradient
            colors={['#9025FC', '#1308FE']}
            start={[0, 0]}
            end={[1, 1]}
            style={{ flex: 1 }}
        >
            <Image style={{ position: 'absolute', left: '-60%', top: -150 }} source={require('../assets/images/thing.png')} />
            <SafeAreaView style={{ alignItems: 'center', height: '100%' }}>
                <View style={{ justifyContent: 'center', flexGrow: 2 }}>
                    <Text heavy style={[styles.title, { color: 'white' }]}>BIG ECONOMY</Text>
                    <Text heavy style={styles.title}>SAVE MORE</Text>
                    <Text heavy style={styles.title}>THAN 30%</Text>
                </View>
                <View style={{ width: '80%', justifyContent: 'flex-end', flexGrow: 1 }}>
                    <Image style={{ position: 'absolute', left: '60%', top: '-30%' }} source={require('../assets/images/thing.png')} />
                    <View style={styles.buttonBox}>
                        <LoginButton white round title='One mounth 9.99$' />
                        <Text style={styles.underButton}>You saving 10% (29.99$)</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <LoginButton white round title='Three mounth 20.99$' />
                        <Text style={styles.underButton}>You saving 20% (29.99$)</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <LoginButton white round title='Six mounth 49.99$' />
                        <Text style={styles.underButton}>You saving 30% (79.99$)</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <TransparentButton white round title='1 year 99.99$' />
                        <Text style={styles.underButton}>You saving 50% (199.99$)</Text>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Buyoptscreen


const styles = StyleSheet.create({
    half: {
        height: '50%'
    },
    title: {
        textAlign: 'center',
        fontSize: 45,
        lineHeight: 45
    },
    underButton: {
        textAlign: 'center',
        color: 'white',
        marginTop: 5,
        fontSize: 15
    },
    buttonBox: {
        marginBottom: 15
    }
})