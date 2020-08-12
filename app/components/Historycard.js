import React from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Historybutton from './Historybutton'

const Historycard = (props) => {

    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]

    const history_items = allData.history_items.filter(item => item.signal_id === signalData.signal_id)

    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20, }}>
                <View style={styles.profBox}>
                    <View style={styles.imgBox}>
                        <Image style={styles.img} source={{ uri: profile.image }} />
                    </View>
                    <View style={styles.poftitleBox}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold' }}>{profile.name}</Text>
                            </View>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Text style={{ position: 'relative', top: 1, fontSize: 20, color: 'rgba(0,0,0,0.7)' }}> <Text style={{ color: 'blue' }}>*</Text>has made changes</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}><Text style={{ color: 'grey' }}>{signalData.time}</Text></View>
                    </View>
                </View>
                {(signalData.text ?
                    <View style={{ marginBottom: 10 }}>
                        <Text>{signalData.text}</Text>
                    </View> : null)}
                <View>
                    {signalData.history_items.map((item, id) => {
                        return (
                            <View key={id}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderColor: '#efefef', borderBottomWidth: 1, }}>
                                    <View
                                        style={{ marginLeft: 10, width: 40, justifyContent: 'center', alignItems: 'center', }}
                                    >
                                        {(item.type === 'take_profit') ?
                                            <View >
                                                <View style={{ position: 'relative', top: 0 }}><Text style={{ color: '#db25fc' }} > Take</Text></View>
                                                <View style={{ position: 'relative', bottom: 0, color: 'white' }}><Text style={{ color: '#db25fc' }}>profit</Text></View>
                                            </View>
                                            :
                                            <View>
                                                <View style={{ position: 'relative', top: 0 }}><Text style={{ color: '#1308FE' }} >Stop</Text></View>
                                                <View style={{ position: 'relative', bottom: 0, color: 'white' }}><Text style={{ color: '#1308FE' }}>loss</Text></View>
                                            </View>}
                                    </View>

                                    <View style={{ flexGrow: 2, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 0 }}>
                                        <Text style={{ fontSize: 30, marginLeft: 0, fontWeight: '300' }}>{item.old}</Text>
                                        <Image style={{ marginHorizontal: 10 }} source={require('../assets/icons/arrow_right.png')} />
                                        <Text style={{ fontSize: 30, marginLeft: 0, fontWeight: '300' }}>{item.new}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                {/* <View style={{ justifyContent: 'flex-end' }}>
                {(props.navigation) ? <TouchableWithoutFeedback onPress={() => props.navigation.navigate('history' + signalData.signal_id, { history_items })}>
                    <View>
                        <Image style={{ position: 'relative', bottom: 5 }} source={require('../assets/icons/key_arrow_right.png')} />
                    </View>
                </TouchableWithoutFeedback>
                    : null}
            </View> */}
            </View >
            {(props.navigation) ?
                <Historybutton title="View history" onPress={() => props.navigation.navigate('history' + signalData.signal_id, { history_items })} />
                : null}
        </View >


    )
}

export default Historycard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 10,

        paddingTop: 20,
        borderRadius: 5,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        elevation: 10
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


