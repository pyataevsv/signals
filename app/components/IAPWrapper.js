import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../reducers/actionCreators'
import AsyncStorage from '@react-native-community/async-storage';
import RNIap, {
    InAppPurchase,
    PurchaseError,
    SubscriptionPurchase,
    finishTransaction,
    finishTransactionIOS,
    purchaseErrorListener,
    purchaseUpdatedListener,
} from 'react-native-iap'

// export const IAPContext: React.Context<any> = React.createContext({
//     processing: false,
//     setProcessing: () => { },
//     activePlan: 0,
//   });


const storePlanAsync = async (transactionReceipt) => {
    await AsyncStorage.setItem('transactionReceipt', transactionReceipt)
    let data = await AsyncStorage.getItem('transactionReceipt')
    console.log('storedAsyncData: ', data)
}


let IAPWrapper = (props) => {
    let purchaseUpdateSubscription = null;
    let purchaseErrorSubscription = null;

    const processNewPurchase = async (purchase) => {

        const { productId, transactionReceipt } = purchase;

        if (transactionReceipt !== undefined) {
            // fetch(API_URL + '/validate-transaction', {
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     method: "POST",
            //     body: JSON.stringify({
            //         receipt: transactionReceipt,
            //         productId: productId,
            //         token: props.token
            //     })
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         setProcessing(false);
            //         if (data.ack === 'success') {
            //             storePlanAsync({ planId: productId });
            //             props.setActivePlan({ planId: productId });
            //         }
            //     })
            //     .catch(e => {
            //         setProcessing(false);
            //     });
            storePlanAsync(transactionReceipt);
            // props.setActivePlan({ planId: productId });
            props.setPlanRecept(transactionReceipt)
        }
    }

    useEffect(() => {
        purchaseUpdateSubscription = purchaseUpdatedListener(
            async (purchase) => {
                const receipt = purchase.transactionReceipt;
                if (receipt) {
                    try {
                        if (Platform.OS === 'ios') {
                            finishTransactionIOS(purchase.transactionId);
                        }
                        await finishTransaction(purchase);
                        await processNewPurchase(purchase);
                        console.log('FinishedTransact', purchase);
                    } catch (ackErr) {
                        console.log('ackErr', ackErr);
                    }
                }
            },
        );
        purchaseErrorSubscription = purchaseErrorListener(
            (error) => {
                console.log('purchaseErrorListener', error);
            },
        );

        return (() => {
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
                purchaseUpdateSubscription = null;
            }
            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
                purchaseErrorSubscription = null;
            }
        })
    }, [])



    useEffect(() => {
        async function setInitialPlanState() {
            console.log('setInitialPlanState')
            try {
                const purchases = await RNIap.getAvailablePurchases();
                console.log('AvialabalePurch', purchases)
                if (purchases && purchases.length != 0) {
                    storePlanAsync(JSON.stringify(purchases[0]))
                    props.setPlanRecept(JSON.stringify(purchases[0]))
                } else if (purchases && purchases.length === 0) {
                    await AsyncStorage.removeItem('transactionReceipt')
                    props.setPlanRecept(null)
                }

            } catch (err) {
                console.warn('initialPlanStateReject: ', err)
                let transactionReceipt = await AsyncStorage.getItem('transactionReceipt')
                props.setPlanRecept(JSON.stringify(transactionReceipt))
            }
        }
        setInitialPlanState()
    }, [])

    return (
        <Fragment>
            {props.children}
        </Fragment>
    )
}

IAPWrapper = connect(
    (state) => {
        return {
            user: state.loginState.loginData
        }
    },
    (dispatch) => {
        return {
            setPlanRecept: (e) => dispatch(actionCreators.setPlanRecept(e))
        }
    }
)(IAPWrapper)


export default IAPWrapper
