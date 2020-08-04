import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, PixelRatio } from 'react-native'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


const Signalcard = (props) => {
    console.log(props)
    const [cardWidth, setCardWidth] = useState(0)

    let lastBottom, last_profit, profitArrow_style
    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


    let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition

    if (signalData.graph.type === 'buy') {
        Sellbuytext = () => <Text style={{ color: '#cc26fc' }}>Buy</Text>
        chartColor1 = '#cc26fc'
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
    const ArrowImage = () => (priceDiff > 0) ? <Image style={{ height: 12, width: 15, transform: [{ rotate: "180deg" }] }} source={require('../assets/icons/arrow_down.png')} /> : <Image style={{ height: 12, width: 15, transform: [{ rotate: "0deg" }] }} source={require('../assets/icons/arrow_down.png')} />

    const data = signalData.graph.points
    const max = Math.max.apply(null, data)
    const min = Math.min.apply(null, data)
    lastBottom = 100 - 100 * (data[data.length - 1] - min) / (max - min)



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
            <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{signalData.graph.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <View><Text style={{ fontWeight: 'bold' }}><Sellbuytext /> under {signalData.graph.open_price}</Text></View>
            </View>
            <View style={{ justifyContent: 'flex-end' }}>
                <View><Text style={{ fontWeight: 'bold' }}>Take profit {signalData.graph.take_profit}</Text></View>
                <View><Text style={{ fontWeight: 'bold' }}>Stop loss {signalData.graph.stop_loss}</Text></View>
            </View>



            <View style={{ height: 150, backgroundColor: '#ffffff' }}>
                <View >
                    <View style={Object.assign({}, styles.price, { top: lastBottom })}><Text>{signalData.graph.current_price}</Text></View>

                    <View style={{ position: 'absolute', height: '100%', width: '100%', left: -20, zIndex: 1 }}>
                        <LineChart
                            style={{ height: 150 }}
                            data={data}
                            curve={shape.curveNatural}
                            svg={{ stroke: chartColor1, strokeWidth: 5 }}
                            contentInset={{ top: 20, bottom: 20 }}
                            showGrid={false}
                            numberOfTicks={0}
                            key={props.id}
                        >

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
                            key={1000 + props.id}
                        >

                        </LineChart>

                    </View>

                </View>
            </View>
            <View style={{ marginLeft: 10 }}>
                <View><Text>Current price</Text></View>
                <View><Text style={{ fontSize: 26, fontWeight: 'bold' }}>{signalData.graph.current_price}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                    <ArrowImage />
                    <Text style={{ fontSize: 18, marginLeft: 5 }}>{priceDiff}%</Text>
                </View>
            </View>
            <View style={{ marginTop: 30, height: 50, marginHorizontal: 10 }}
                onLayout={(e) => {
                    setCardWidth(e.nativeEvent.layout.width)


                }}
            >
                <View style={{ backgroundColor: '#deddff', height: 2 }}></View>

                <View style={{ alignItems: 'center', position: 'absolute', left: -23, top: -15, zIndex: 1 }}>
                    <Image source={require('../assets/icons/doto.png')} />
                    <Text style={{ position: 'relative', top: -20, }}>{minPoint.toFixed(2)}</Text>
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', left: -18 + openPricePosition, top: -15, zIndex: 0 }}>
                    <Image source={require('../assets/icons/doto.png')} />
                    <Text style={{ position: 'relative', top: -20, }}>{signalData.graph.open_price.toFixed(2)}</Text>
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', right: -23, top: -15, zIndex: 1 }}>
                    <Image source={require('../assets/icons/doto.png')} />
                    <Text style={{ position: 'relative', top: -20, }}>{maxPoint.toFixed(2)}</Text>
                </View>

                <View style={{ alignItems: 'center', position: 'absolute', left: currentPricePosition, top: -13, zIndex: 2 }}>
                    <Image source={require('../assets/icons/dot.png')} style={{ width: 40, height: 40, position: 'absolute' }} />
                    <Text style={{ position: 'absolute', top: -10, }}>{signalData.graph.current_price.toFixed(2)}</Text>
                </View>
            </View>
        </View >
    )
}

export default Signalcard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
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
        right: 0,
        paddingVertical: 5,
        paddingHorizontal: 7,
        borderRadius: 15,
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4
    }
})


