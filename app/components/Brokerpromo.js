import React, { Component } from 'react'
import { View, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native'
import { LoginButton } from './Buttons'
// import { ScrollView } from 'react-native-gesture-handler'
import Text from './SFText'

export class Brokerpromo extends Component {
    render() {
        return (
            <SafeAreaView style={styles.box}>
                <View style={styles.circle} ></View>
                <View style={styles.circleOut}></View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20 }}>
                    <Text heavy style={{ fontSize: 26, color: '#1A3745', lineHeight: 26 }}>CREATE NEW </Text>
                    <Text heavy style={{ fontSize: 26, color: '#1A3745', lineHeight: 26 }}>ACCOUNT AND GET</Text>
                    <Text heavy style={{ fontSize: 26, color: '#DBC92C', lineHeight: 26 }}> FREE</Text>
                    <Text heavy style={{ fontSize: 26, color: '#DBC92C', lineHeight: 26 }}>PREMIUM </Text>
                    <View>
                        <Image style={{ position: 'relative', top: -5 }} source={require('../assets/icons/crown.png')} />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../assets/icons/tech.png')} />
                    <Text heavy style={{ color: '#5317FD', fontSize: 26 }}>TRADE TECH .CO</Text>
                    <View style={{ width: '80%' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '200' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 0, paddingHorizontal: 20 }}>
                        <View style={styles.li}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <View style={styles.dot}></View>
                            </View>
                            <View>
                                <Text semibold style={styles.benefit}>Broker covers the cost of the 1st month.</Text>
                            </View>
                        </View>
                        <View style={styles.li}>
                            <View style={{ justifyContent: 'flex-start' }}>
                                <View style={styles.dot}></View>
                            </View>
                            <View>
                                <Text semibold style={styles.benefit}>Future personal discounts for active traders.</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: '#3B12FE', textAlign: 'center' }}>www.payment-link.com</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f4f4f4', width: '100%', paddingVertical: 10 }}>
                    <View style={styles.brik}></View>
                    <View style={styles.brik2}></View>
                    <View style={styles.brik3}></View>
                    <View style={styles.brik4}></View>
                    <View style={{ borderBottomWidth: 1, borderColor: '#C4C4C4', marginHorizontal: 70, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 22, marginRight: 10, fontWeight: '700' }}>01</Text>
                            <Text style={{ fontSize: 17, fontWeight: '300', position: 'relative', bottom: 2, color: '#314B58' }}>Follow to the link</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: '#C4C4C4', marginHorizontal: 70, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 22, marginRight: 10, fontWeight: '700' }}>02</Text>
                            <Text style={{ fontSize: 17, fontWeight: '300', position: 'relative', bottom: 2, color: '#314B58' }}>Create new account</Text>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: '#C4C4C4', marginHorizontal: 70, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                            <Text style={{ fontSize: 22, marginRight: 10, fontWeight: '700' }}>03</Text>
                            <Text style={{ fontSize: 17, fontWeight: '300', position: 'relative', bottom: 2, color: '#314B58' }}>Refill account</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 5, width: '70%' }}>
                    <LoginButton title='Get premium' round />
                </View>
                <View style={{ width: '70%' }}>
                    <Text style={{ fontWeight: '300', fontSize: 11, textAlign: 'center' }}>Within a day, the broker confirms and we open access.</Text>
                    <Text style={{ fontWeight: '300', fontSize: 11, textAlign: 'center' }}>if you have questions send us email <Text style={{ color: '#3B12FE' }}>trade@mail.com</Text></Text>
                </View>
            </SafeAreaView>
        )
    }
}

export default Brokerpromo


const styles = StyleSheet.create({
    circle: {
        width: 150,
        height: 150,
        position: 'absolute',
        borderRadius: 200,
        backgroundColor: '#5618FE',
        opacity: 0.1,
        top: 0,
        left: -20
    },
    circleOut: {
        width: 250,
        height: 250,
        position: 'absolute',
        borderRadius: 200,
        backgroundColor: '#5618FE',
        opacity: 0.05,
        top: -60,
        left: -90
    },
    box: {
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        flex: 1,

    },
    dot: {
        position: 'relative',
        bottom: 0,
        height: 5,
        width: 5,
        backgroundColor: '#1A3745',
        marginRight: 5,
        borderRadius: 5
    },
    li: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    benefit: {
        color: '#1A3745',
        fontSize: 17,
    },
    brik: {
        width: 100,
        height: 30,
        position: 'absolute',
        left: -50,
        top: '30%',
        backgroundColor: 'white',
        transform: [{ rotateZ: '-30deg' }]
    },
    brik2: {
        width: 60,
        height: 15,
        position: 'absolute',
        left: -30,
        bottom: '20%',
        backgroundColor: 'white',
        transform: [{ rotateZ: '-30deg' }]
    },
    brik3: {
        width: 100,
        height: 30,
        position: 'absolute',
        right: -50,
        top: '10%',
        backgroundColor: 'white',
        transform: [{ rotateZ: '-30deg' }]
    },
    brik4: {
        width: 60,
        height: 15,
        position: 'absolute',
        right: -10,
        bottom: '30%',
        backgroundColor: 'white',
        transform: [{ rotateZ: '-30deg' }]
    }
})
