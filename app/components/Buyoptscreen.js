import React, { useEffect, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { LoginButton } from './Buttons'
import { TransparentButton } from './Buttons'
import Text from './SFText'
import { requestSubscription } from 'react-native-iap'
import AsyncStorage from '@react-native-community/async-storage';


import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    acknowledgePurchaseAndroid,
    consumePurchaseAndroid,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap';

const Buyoptscreen = () => {

    const updRef = useRef()
    const errRef = useRef()

    useEffect(() => {
        const itemSkus = Platform.select({
            ios: [
                'iap1'
            ],
            android: [
                'com.mightio.signal.sub1',
                'testsub2',
                'testsub'
            ]
        })

        async function getProducts() {

            try {
                const result = await RNIap.initConnection();
                console.log('result', result);

                const subscriptions = await RNIap.getSubscriptions(itemSkus);
                console.log('subscriptions', subscriptions);

            } catch (err) {
                console.warn(err) // standardized err.code and err.message available
            }

            try {
                const purchases = await RNIap.getAvailablePurchases();

                console.log('AvialabalePurch', purchases)
            } catch (err) {
                console.log('ErrAvialabalePurch', err); // standardized err.code and err.message available

            }

            let plan = await AsyncStorage.getItem('user_plan');
            console.log('AsyncPlanData: ', plan)
        }
        getProducts()



    })


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
                        <LoginButton
                            onPress={() => {
                                requestSubscription('testsub')
                            }}
                            white round title='One month 9.99$' />
                        <Text style={styles.underButton}>You saving 10% (29.99$)</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <LoginButton
                            onPress={() => {
                                requestSubscription('testsub2')
                            }}
                            white round title='Three month 20.99$' />
                        <Text style={styles.underButton}>You saving 20% (29.99$)</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        <LoginButton white round title='Six month 49.99$' />
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