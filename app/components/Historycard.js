import React from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { HistoryButton } from './Buttons'
import Text from './SFText'

const Historycard = (props) => {

    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]

    const history_items = allData.history_items.filter(item => item.signal_id === signalData.signal_id)

    return (
        <>
            <View style={styles.container}>
                <View style={{}}>
                    <View style={[styles.profBox, { paddingHorizontal: 20 }]}>
                        <View style={styles.imgBox}>
                            <Image style={styles.img} source={{ uri: profile.image }} />
                        </View>
                        <View style={styles.poftitleBox}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Text semibold>{profile.name}</Text>
                                </View>
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Text style={{ position: 'relative', color: 'rgba(0,0,0,0.7)' }}> <Text style={{ color: 'blue' }}>*</Text>has made changes</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}><Text style={{ color: 'grey' }}>{signalData.time}</Text></View>
                        </View>
                    </View>
                    {(signalData.text ?
                        <View style={{ marginBottom: 10, paddingHorizontal: 20, }}>
                            <Text style={{ color: 'rgba(23,31,36,0.7)' }}>{signalData.text}</Text>
                        </View> : null)}
                    <View>
                        {signalData.history_items.map((item, id, arr) => {

                            // const borderStyle = (id + 1 !== arr.length) ? { borderColor: '#efefef', borderBottomWidth: 1 } : null
                            return (
                                <View key={id}>
                                    <View style={[{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'rgb(245,245,245)', borderBottomRightRadius: 5, borderBottomLeftRadius: 5 }]}>
                                        <View
                                            style={{ marginLeft: 0, justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            {(item.type === 'take_profit') ?
                                                <Text semibold style={{ color: '#db25fc', fontSize: 20 }} >Take profit</Text>
                                                :
                                                <Text semibold style={{ color: '#1308FE', fontSize: 20 }} >Stop loss</Text>
                                            }
                                        </View>
                                        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 0 }}>
                                            <Text bold style={{ fontSize: 20, marginLeft: 0 }}>{item.old}</Text>
                                            <Image style={{ marginHorizontal: 10 }} source={require('../assets/icons/arrow_right.png')} />
                                            <Text bold style={{ fontSize: 20, marginLeft: 0 }}>{item.new}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View >
                {(props.navigation) ?
                    <HistoryButton title="View history" onPress={() => props.navigation.navigate('history' + signalData.signal_id, { history_items })} />
                    : null}
            </View >

        </>

    )
}

export default Historycard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 5,

        paddingTop: 20,
        borderRadius: 5,

        borderWidth: 1,
        borderColor: 'rgb(200,200,200)',

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,

        // elevation: 10
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


