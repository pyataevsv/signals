import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, PixelRatio, ImageBackground } from 'react-native'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { feedAll } from '../config/messages'
import { BlurView } from 'expo-blur'

const Donecard = () => {

    const [cardWidth, setCardWidth] = useState(0)


    let lastBottom, last_profit, profitArrow_style
    let allData = JSON.parse(feedAll)
    let signalData = allData.messages[4]
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


    let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition

    const fontColor = '#d9d9d9'

    if (signalData.graph.type === 'buy') {
        Sellbuytext = () => <Text style={{ color: '#eeb5ff' }}>Buy</Text>
        chartColor1 = '#eeb5ff'
        maxPoint = signalData.graph.take_profit
        minPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * 0.98 * (signalData.graph.open_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)
        currentPricePosition = cardWidth * 0.98 * (signalData.graph.current_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)

    } else {
        Sellbuytext = () => <Text style={{ color: '#4f25fc' }}>Sell</Text>
        chartColor1 = '#4f25fc'

        minPoint = signalData.graph.take_profit
        maxPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * 0.98 * (signalData.graph.open_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)
        currentPricePosition = cardWidth * 0.98 * (signalData.graph.current_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)

    }

    const priceDiff = ((signalData.graph.current_price - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(2)
    const ArrowImage = () => (priceDiff > 0) ? <Image blurRadius={1} style={{ height: 12, width: 15, transform: [{ rotate: "180deg" }] }} source={require('../assets/icons/arrow_down.png')} /> : <Image blurRadius={1} style={{ height: 12, width: 15, transform: [{ rotate: "0deg" }] }} source={require('../assets/icons/arrow_down.png')} />

    if (signalData.done_status === 'profit') {
        profitArrow_style = { resizeMode: 'contain', width: 30, height: 30, transform: [{ rotate: "180deg" }] }
        last_profit = '+' + ((signalData.graph.take_profit - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
    } else {
        last_profit = ((signalData.graph.stop_loss - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
        profitArrow_style = { resizeMode: 'contain', width: 30, height: 30 }
    }

    class AreaChartExample extends React.PureComponent {

        render() {
            const data = signalData.graph.points
            const max = Math.max.apply(null, data)
            const min = Math.min.apply(null, data)
            lastBottom = 100 - 100 * (data[data.length - 1] - min) / (max - min)
            console.log(data)

            return (
                <View >
                    <View style={Object.assign({}, styles.price, { top: lastBottom })}><Text style={{ color: fontColor }}>{signalData.graph.current_price}</Text></View>

                    <View style={{ position: 'absolute', height: '100%', width: '100%', left: -20, zIndex: 1 }}>
                        <LineChart
                            style={{ height: 150 }}
                            data={data}
                            curve={shape.curveNatural}
                            svg={{ stroke: chartColor1, strokeWidth: 5 }}
                            contentInset={{ top: 20, bottom: 20 }}
                            showGrid={false}
                            numberOfTicks={0}
                        >
                            <Grid />
                        </LineChart>
                    </View>

                    <View style={{ position: 'absolute', height: '100%', width: '100%', left: -20, top: 7 }}>
                        <LineChart
                            style={{ height: 150 }}
                            data={data}
                            curve={shape.curveNatural}
                            svg={{ stroke: '#faebff', strokeWidth: 7 }}
                            contentInset={{ top: 20, bottom: 20 }}
                            showGrid={false}
                            numberOfTicks={0}
                        >
                            <Grid />
                        </LineChart>
                    </View>

                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profBox}>

                <View style={styles.imgBox}>
                    <Image style={styles.img} source={{ uri: profile.image }} />
                </View>
                <View style={styles.poftitleBox}>
                    <View style={{ flex: 1 }}><Text style={{ fontWeight: 'bold' }}>{profile.name}</Text></View>
                    <View style={{ flex: 1 }}><Text style={{ color: fontColor }}>{signalData.time}</Text></View>
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text>{signalData.text}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{signalData.graph.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ fontWeight: 'bold', color: fontColor }}><Sellbuytext /> under</Text>
                <Image source={require('../assets/342.png')} style={{ height: 17, width: 40 }} />
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', color: fontColor }}>Take profit</Text>
                    <Image source={require('../assets/342.png')} style={{ height: 17, width: 40 }} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', color: fontColor }}>Stop loss</Text>
                    <Image source={require('../assets/342.png')} style={{ height: 17, width: 40 }} />
                </View>
            </View>

            <View style={{ height: 150, backgroundColor: '#ffffff' }}>
                <AreaChartExample />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 10 }}>
                    <View><Text style={{ color: fontColor }}>Current price</Text></View>
                    <View><Text style={{ fontSize: 26, fontWeight: 'bold', color: fontColor }}>{signalData.graph.current_price}</Text></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <ArrowImage />

                        <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, }} />

                    </View>
                </View>


            </View>

            <View style={{ marginTop: 30, height: 50, marginHorizontal: 10 }}
                onLayout={(e) => {
                    setCardWidth(e.nativeEvent.layout.width)
                    console.log(e.nativeEvent.layout.width)
                }}
            >
                <View style={{ backgroundColor: '#deddff', height: 2 }}></View>

                <View style={{ alignItems: 'center', position: 'absolute', left: -23, top: -15, zIndex: 1 }}>

                    <Image blurRadius={2} source={require('../assets/icons/doto.png')} />

                    <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'absolute', top: 30 }} />
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', left: -18 + openPricePosition, top: -15, zIndex: 0 }}>
                    <Image blurRadius={2} source={require('../assets/icons/doto.png')} />
                    <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'absolute', top: 30 }} />

                </View>
                <View style={{ alignItems: 'center', position: 'absolute', right: -23, top: -15, zIndex: 1 }}>
                    <Image blurRadius={2} source={require('../assets/icons/doto.png')} />
                    <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'absolute', top: 30 }} />

                </View>

                <View style={{ alignItems: 'center', position: 'absolute', left: currentPricePosition, top: -13, zIndex: 2 }}>
                    <Image blurRadius={2} source={require('../assets/icons/dot.png')} style={{ width: 40, height: 40, position: 'absolute' }} />
                    <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'absolute', top: -10 }} />
                </View>
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
    price: {
        backgroundColor: 'white',
        alignSelf: 'center',
        position: 'absolute',
        left: 290,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 15,
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4
    },
    profitArrow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        backgroundColor: 'white',
        elevation: 2,
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


