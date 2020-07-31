import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Btn from './Btn'

const boxPadding = 20

const Donecard = () => {
    const [width, setWidth] = useState(0)
    return (
        <View style={styles.container}
            onLayout={(e) => {
                setWidth(e.nativeEvent.layout.width)
            }}
        >
            <View
                style={{ position: 'absolute', top: 150, left: 0, width: width, height: 50, zIndex: 1 }}>
                <Image style={{ width: '100%', height: 200 }} source={require('../assets/icons/graph.png')} />
            </View>
            <View style={styles.profBox}>
                <View style={styles.imgBox}>
                    <Image style={styles.img} source={require('../assets/icons/ava_card.png')} />
                </View>
                <View style={styles.poftitleBox}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20 }}>Profile Title</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Cruid oil</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image style={{ height: 150, width: 150 }} source={require('../assets/icons/locked.png')} />
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Buy premium</Text>
                <Text style={{ marginHorizontal: '5%', textAlign: 'center', color: 'grey', marginVertical: 10 }}>Take our free online English test to find out which level to choose. Select...</Text>
                <Btn title='Get Started' />
            </View>
        </View>
    )
}

export default Donecard


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: boxPadding,
        paddingVertical: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 2
    },
    profBox: {
        flexDirection: 'row',
        marginBottom: 10
    },
    imgBox: {
        marginRight: 10
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 50
    }
})
