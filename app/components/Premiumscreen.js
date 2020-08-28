import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { LoginButton } from './Buttons'
import Text from './SFText'


export class Premiumscreen extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        console.log(this)
        return (
            <View style={styles.box}>
                <View style={{ flexShrink: 1 }}>
                    <Image style={{ height: '100%', resizeMode: 'contain', }} source={require('../assets/images/premium.png')} />
                </View>
                <View style={{ flexGrow: 1 }}>
                    <Text heavy style={{ fontSize: 32, lineHeight: 32, textAlign: 'center', color: '#1A3745' }}>GET ACCESS</Text>
                    <Text heavy style={{ fontSize: 32, lineHeight: 32, textAlign: 'center', color: '#1A3745' }}>TO PREMIUM</Text>
                    <Text style={[styles.benefit, { color: '#62737B' }]}>with premium subscription you will:</Text>
                </View>
                <View style={{ width: '80%', flexGrow: 1, marginTop: 10 }}>
                    <View style={styles.li}>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <View style={styles.dot}></View>
                        </View>
                        <View>
                            <Text style={styles.benefit}>Get real-time signals 4 market</Text>
                        </View>
                    </View>
                    <View style={styles.li}>
                        <View style={styles.dot}></View>
                        <View>
                            <Text style={styles.benefit}>Risk-managements updates when and how modify orders</Text>
                        </View>
                    </View>
                    <View style={styles.li}>
                        <View style={styles.dot}></View>
                        <View>
                            <Text style={styles.benefit}>Save time by searching actives ready to break-out</Text>
                        </View>
                    </View>
                </View>
                <View style={{}}>
                    <View style={{ marginVertical: 5 }}>
                        <LoginButton
                            round title='Buy premium 9.99$'
                            onPress={() => this.props.navigation.navigate('Buyoptscreen')}
                        />
                    </View>
                    <View style={{ marginVertical: 5 }}>
                        <LoginButton
                            white round title='1 mounth free'
                            onPress={() => this.props.navigation.navigate('Brokerpromo')} />
                    </View>
                    <View>
                        <Text style={{ textAlign: 'center', color: '#53656D' }}>if you open account with broker</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default Premiumscreen

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: 10
    },
    dot: {
        position: 'relative',
        top: 8,
        height: 5,
        width: 5,
        backgroundColor: '#1A3745',
        marginRight: 5,
        borderRadius: 5
    },
    li: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    benefit: {
        color: '#1A3745',
        fontSize: 15,
        fontWeight: '300'
    }
})
