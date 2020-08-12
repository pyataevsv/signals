import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, PixelRatio, ImageBackground } from 'react-native'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { feedAll } from '../config/messages'
import Btn from './Btn'

const Donecard = (props) => {

    const [cardWidth, setCardWidth] = useState(0)


    let lastBottom, last_profit, profitArrow_style
    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


    let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition

    const fontColor = '#eeeeee'

    if (signalData.graph.type === 'buy') {
        Sellbuytext = () => <Text style={{ color: '#f5dbfd' }}>Buy</Text>
        chartColor1 = '#f5dbfd'
        maxPoint = signalData.graph.take_profit
        minPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * 0.98 * (signalData.graph.open_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)
        currentPricePosition = cardWidth * 0.98 * (signalData.graph.current_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)

    } else {
        Sellbuytext = () => <Text style={{ color: '#cbbeff' }}>Sell</Text>
        chartColor1 = '#cbbeff'

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


    const data = signalData.graph.points
    const max = Math.max.apply(null, data)
    const min = Math.min.apply(null, data)
    lastBottom = 100 - 100 * (data[data.length - 1] - min) / (max - min)

    const innerColor = 'rgb(' + signalData.market_r_color + ',' + signalData.market_g_color + ',' + signalData.market_b_color + ')'
    const outerColor = 'rgba(' + signalData.market_r_color + ',' + signalData.market_b_color + ',' + signalData.market_b_color + ',0.2)'

    const marketInicator = <View style={[styles.marketIndicator, { backgroundColor: outerColor }]}>
        <View style={[styles.marketIndicatorInner, { backgroundColor: innerColor }]}></View>
    </View>

    console.log(marketInicator)
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {marketInicator}
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{signalData.graph.name}</Text>
            </View>
            <View>
                <View style={{ ...StyleSheet.absoluteFill, zIndex: 2, alignItems: 'center' }}>
                    <View style={styles.lockedBox}>
                        <Image style={{ width: 50, height: 50 }} source={require('../assets/icons/locked.png')} />
                    </View>
                    <Text style={{ fontSize: 30, fontWeight: '700' }}>Buy premium</Text>
                    <Text style={{ textAlign: 'center', marginVertical: 10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                    <Btn title='Get Started' />
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
                    <View >
                        {/* <View style={Object.assign({}, styles.price, { top: lastBottom })}><Text style={{ color: fontColor }}>{signalData.graph.current_price}</Text></View> */}

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
                                svg={{ stroke: '#f9f4fb', strokeWidth: 7 }}
                                contentInset={{ top: 20, bottom: 20 }}
                                showGrid={false}
                                numberOfTicks={0}
                            >
                                <Grid />
                            </LineChart>
                        </View>

                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ position: 'relative', top: 7, left: 1 }}>
                            <Text style={{ color: fontColor }}>Current price</Text>
                        </View>
                        <View>
                            <Image source={require('../assets/342.png')} style={{ height: 40, width: 80 }} />
                        </View>
                        {/* <View style={{ position: 'relative', bottom: 7, left: 3, flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                            {(priceDiff > 0) ?

                                <View style={[{ position: 'relative', top: 3, height: 10, width: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'rgba(19,8,254,0.3)' }, { transform: [{ rotateZ: "-45deg" }] }]} />
                                :
                                <View style={[{ position: 'relative', bottom: 3, height: 10, width: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'rgba(19,8,254,0.3)' }, { transform: [{ rotateZ: "135deg" }] }]} />
                            }
                            <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'relative' }} />
                        </View> */}
                    </View>


                </View>

                <View style={{ marginTop: 30, height: 50, marginHorizontal: 10 }}
                    onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}
                >
                    <View style={{ backgroundColor: '#deddff', height: 2 }}></View>

                    <View style={{ alignItems: 'center', position: 'absolute', zIndex: 1 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.dot}>
                                <View style={styles.dotInner}></View>
                            </View>
                            <View style={{ position: 'relative', right: '40%' }}>
                                <Image source={require('../assets/342.png')} style={{ height: 17, width: 40 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', left: openPricePosition, zIndex: 0 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.dot}>
                                <View style={styles.dotInner}></View>
                            </View>
                            <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'relative', right: '40%' }} />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', left: 0 + cardWidth, zIndex: 1 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.dot}>
                                <View style={styles.dotInner}></View>
                            </View>
                            <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'relative', right: '40%' }} />

                        </View>
                    </View>



                    <View style={{ alignItems: 'center', position: 'absolute', left: currentPricePosition, top: -1, zIndex: 2 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.doto}></View>
                            <Image source={require('../assets/342.png')} style={{ height: 17, width: 40, position: 'relative', right: '40%', top: -35 }} />
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default Donecard

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

        elevation: 5
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
    },
    dotInner: {
        width: 5,
        height: 5,
        borderRadius: 7,
        backgroundColor: 'white'
    },
    marketIndicator: {

        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 50
    },
    marketIndicatorInner: {

        width: 10,
        height: 10,
        borderRadius: 50
    },
    dot: {
        position: 'relative',
        bottom: 5,
        width: 12,
        height: 12,
        borderRadius: 15,
        backgroundColor: 'rgba(204, 38, 252,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    doto: {
        position: 'relative',
        bottom: 3,
        width: 9,
        height: 9,
        borderRadius: 15,
        backgroundColor: 'rgba(50, 14, 253,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lockedBox: {
        backgroundColor: 'white',
        alignSelf: 'center',


        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,

        marginTop: 30,
        marginBottom: 10,
        height: 70,
        width: 70,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


