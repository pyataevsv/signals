import React, { useState, useRef } from 'react'
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import * as actionCreators from '../reducers/actionCreators'
import { Provider, connect } from 'react-redux'
import { BarChart, Grid } from 'react-native-svg-charts'
import { LinearGradient, Defs, Stop } from 'react-native-svg'
import Text from './SFText'

export default function Monthchart({ data }) {
    const [width, setWidth] = useState(0)
    const [curItem, setCureItem] = useState(0)
    const listRef = useRef(null)
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    data.forEach((item, id) => {
        item.id = id
    })

    const fill = {
        svg: {
            fill: 'url(#gradient)',
        },
    }

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'30%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={'#A64EFF'} />
                <Stop offset={'100%'} stopColor={'#1C04ED'} />
            </LinearGradient>
        </Defs>
    )

    const renderItem = ({ item }) => (
        <View style={{ width, }}>
            <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
                <Text semibold style={{ fontSize: 18 }}>{monthNames[item.month]}</Text>
            </View>
            <BarChart
                style={{ height: 200, backgroundColor: 'rgb(245,245,245)' }}
                data={item.points}
                gridMin={0}
                svg={{ fill: 'url(#gradient)' }}
                yAccessor={({ item }) => item}
                contentInset={{ top: 20, bottom: 10, right: 10, left: 10 }}
            >
                <Gradient />
            </BarChart>
        </View >
    )

    return (
        <View style={styles.box} onLayout={e => setWidth(e.nativeEvent.layout.width)}>



            <TouchableOpacity
                style={{ position: 'absolute', top: 0, left: 0, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, zIndex: 1 }}
                onPress={() => {
                    if (curItem != 0) {
                        setCureItem(curItem - 1)
                        listRef.current.scrollToIndex({ animated: true, index: curItem - 1 })
                    }
                }}
            >
                <Image source={require('../assets/icons/left.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: 0, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', paddingVertical: 5, paddingHorizontal: 5, zIndex: 1 }}
                onPress={() => {
                    if (curItem != data.length - 1) {
                        setCureItem(curItem + 1)
                        listRef.current.scrollToIndex({ animated: true, index: curItem + 1 })
                    }
                }}
            >
                <Image source={require('../assets/icons/right.png')}></Image>
            </TouchableOpacity>
            <FlatList
                ref={listRef}
                data={data}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
                horizontal
            />
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        // borderWidth: 1,
        // borderColor: 'rgb(200,200,200)',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 3,

        elevation: 5,
    },

})


Monthchart = connect(
    //mapStateToProp
    (state) => {
        return {
            data: state.feedAll.feedCash.profiles[0].stat.graph
        }
    },

    null
)(Monthchart)

