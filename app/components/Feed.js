
import React, { useState, useReducer } from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import Btn from './Btn'
import Signalcard from './Signalcard'
import Subscrcard from './Sbscrcard'
import Closedcard from './Closedcard'
import Header from './Header'

export function Feed({ fetchAll, navigation }) {
    const [count, setCount] = useState(0)
    console.log(navigation)

    return (
        <View>
            <Header navigation={navigation} />
            <ScrollView style={styles.view}>
                <Closedcard />
                <Text>{count}</Text>
                <Button
                    title='fetch feed'
                    onPress={fetchAll}
                />
                <Btn title='Get Started' onPress={() => setCount(count + 1)} />
                <Signalcard />
                <Subscrcard />
                <Subscrcard />
            </ScrollView>
        </View>

    )
}

Feed = connect(
    //mapStateToProp
    (state) => {
        return {
            messages: state.feedAll.data.messages,
            promos: state.feedAll.data.promos
        }
    },

    //mapDispatchToProp
    (dispatch) => {
        return {
            fetchAll: () => dispatch(actionCreators.fetchALL({ limit: 10, key: '' }))
        }

    }
)(Feed)

const styles = StyleSheet.create({
    view: {
        paddingTop: 0,
    }
})



