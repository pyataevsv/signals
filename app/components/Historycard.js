import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'


const Historycard = (props) => {



    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]

    const history_items = allData.history_items.filter(item => item.signal_id === signalData.signal_id)

    return (
        <View style={styles.container}>
            <View style={styles.profBox}>
                <View style={styles.imgBox}>
                    <Image style={styles.img} source={{ uri: profile.image }} />
                </View>
                <View style={styles.poftitleBox}>
                    <View style={{ flex: 1 }}><Text style={{ fontWeight: 'bold' }}>{profile.name}</Text></View>
                    <View style={{ flex: 1 }}><Text>{signalData.time}</Text></View>
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text>{signalData.text}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    {signalData.history_items.map((item, id) => {


                        return (
                            <View key={id}>
                                <View>
                                    <Text style={{ fontSize: 30 }}>
                                        <Text>{(item.type === 'take_profit') ? 'TP: ' : 'SL: '}</Text>
                                        <Text>{item.old}</Text>
                                        <Image source={require('../assets/icons/arrow_right.png')} />
                                        <Text>{item.new}</Text>
                                    </Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    {(props.navigation) ? <TouchableWithoutFeedback onPress={() => props.navigation.navigate('History' + signalData.signal_id, { history_items })}>
                        <View>
                            <Image style={{ position: 'relative', bottom: 5 }} source={require('../assets/icons/key_arrow_right.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                        : null}
                </View>
            </View>

        </View>
    )
}

export default Historycard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 5,

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
    },
})


