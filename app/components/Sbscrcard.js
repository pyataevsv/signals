import React, { useState, Component } from 'react'
import { StyleSheet, View, Image, PixelRatio, ImageBackground, Platform } from 'react-native'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { feedAll } from '../config/messages'
import { SubscrBtn } from './Buttons'
import { BlurView } from 'expo-blur'
import Text from './SFText'

const Donecard = (props) => {

    const [cardWidth, setCardWidth] = useState(0)


    let lastBottom, last_profit, profitArrow_style
    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


    let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition

    const fontColor = 'black'

    if (signalData.graph.type === 'buy') {
        Sellbuytext = () => <Text style={{ color: '#7FC37D' }}>Buy</Text>
        chartColor1 = '#cc26fc'
        maxPoint = signalData.graph.take_profit
        minPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * 0.98 * (signalData.graph.open_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)
        currentPricePosition = cardWidth * 0.98 * (signalData.graph.current_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)

    } else {
        Sellbuytext = () => <Text style={{ color: '#E48181' }}>Sell</Text>
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
        last_profit = '+' + Math.abs((signalData.graph.take_profit - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
    } else {
        last_profit = '-' + Math.abs((signalData.graph.stop_loss - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
        profitArrow_style = { resizeMode: 'contain', width: 30, height: 30 }
    }


    const data = signalData.graph.points
    const max = Math.max.apply(null, data)
    const min = Math.min.apply(null, data)
    lastBottom = 100 - 100 * (data[data.length - 1] - min) / (max - min)

    const innerColor = 'rgb(' + signalData.market_r_color + ',' + signalData.market_g_color + ',' + signalData.market_b_color + ')'
    const outerColor = 'rgba(' + signalData.market_r_color + ',' + signalData.market_b_color + ',' + signalData.market_b_color + ',1)'

    const marketInicator = <View style={[styles.marketIndicator, { backgroundColor: outerColor }]}>
        <View style={[styles.marketIndicatorInner, { backgroundColor: innerColor }]}></View>
    </View>


    return (
        <View style={styles.container}>
            <BlurView intensity={Platform.OS === 'ios' ? 60 : 120} tint={'light'} style={{ ...StyleSheet.absoluteFill, zIndex: 2, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 5 }}>
                <View style={styles.lockedBox}>
                    <Image style={{ width: 50, height: 50 }} source={require('../assets/icons/locked.png')} />
                </View>
                <Text heavy style={{ fontSize: 26 }}>BUY PREMIUM</Text>
                <Text light style={{ textAlign: 'center', marginVertical: 10 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <SubscrBtn title='Get Started' />
            </BlurView>
            <View style={[styles.profileBox, { paddingHorizontal: 20, }]}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <View style={styles.imgBox}>
                        <Image style={styles.img} source={{ uri: profile.image }} />
                    </View>
                    <View style={styles.poftitleBox}>
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}><Text semibold>{profile.name}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ color: 'grey' }}>{signalData.time}</Text></View>
                    </View>
                </View>
                {signalData.text ?
                    <View style={{ marginBottom: 0 }}>
                        <Text style={{ color: 'rgb(170,178,183)', textAlign: 'justify', color: 'rgba(23,31,36,0.7)' }}>{signalData.text}</Text>
                    </View>
                    : null}
            </View>
            <View style={{
                backgroundColor: 'white',
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                backgroundColor: 'rgb(245,245,245)'
            }}>
                <View style={{}}>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgb(245,245,245)' }]} >
                        <Text semibold style={{ fontSize: 17 }}>{signalData.graph.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Sellbuytext />
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                {/* <Text style={{ position: 'relative', top: 6, color: 'rgba(23,31,36,0.7)' }}>Under</Text> */}
                                <Text semibold style={{ fontSize: 17 }}>{signalData.graph.open_price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 0 }}>
                            {/* {marketInicator} */}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: 17, color: 'rgba(23,31,36,0.7)' }}>take profit:
                                <Text semibold style={{ fontSize: 17, color: 'rgb(23,31,36)' }}> {signalData.graph.take_profit}</Text>
                                </Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 17, color: 'rgba(23,31,36,0.7)' }}>stop loss:
                                <Text semibold style={{ fontSize: 17, color: 'rgb(23,31,36)' }}> {signalData.graph.stop_loss}</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ height: 150, backgroundColor: '#ffffff', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'rgb(245,245,245)' }}>
                    <View >
                        <View style={Object.assign({}, styles.price, { top: lastBottom })}><Text semibold>{signalData.graph.current_price}</Text></View>

                        <View style={{ position: 'relative', height: '100%', width: '100%', left: -0, zIndex: 1, backgroundColor: 'rgb(245,245,245)' }}>
                            <LineChart
                                style={{ height: 150, position: 'relative', left: -20 }}
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

                        <View style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 7, zIndex: 1 }}>
                            <LineChart
                                style={{ height: 150, position: 'relative', left: -20 }}
                                data={data}
                                curve={shape.curveNatural}
                                svg={{ stroke: 'rgba(204, 38, 252,0.2)', strokeWidth: 7 }}
                                contentInset={{ top: 20, bottom: 20 }}
                                showGrid={false}
                                numberOfTicks={0}
                                key={1000 + props.id}
                            >
                            </LineChart>
                        </View>

                    </View>
                </View>
                <View style={{ marginTop: 20, height: 40, marginHorizontal: 30, backgroundColor: 'rgb(245,245,245)' }}
                    onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}
                >
                    <View style={{ backgroundColor: '#deddff', height: 2 }}></View>

                    <View style={{ alignItems: 'center', position: 'absolute', zIndex: 1 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.dot}>
                                <View style={styles.dotInner}></View>
                            </View>
                            <View style={{ position: 'relative', right: '40%' }}>
                                <Text semibold style={{ fontSize: 12, }}>{minPoint.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', left: openPricePosition, zIndex: 0 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.dot}>
                                <View style={styles.dotInner}></View>
                            </View>
                            <Text semibold style={{ fontSize: 12, position: 'relative', right: '40%' }}>{signalData.graph.open_price.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', left: 0 + cardWidth, zIndex: 1 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={{ position: 'relative' }}>
                                <View style={styles.dot}>
                                    <View style={styles.dotInner}></View>
                                </View>
                                <Text semibold style={{ fontSize: 12, position: 'relative', right: '70%' }}>{maxPoint.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', position: 'absolute', left: currentPricePosition, top: -1, zIndex: 2 }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.doto}></View>
                            <Text semibold style={{ fontSize: 12, position: 'relative', right: '40%', top: -35 }}>{signalData.graph.current_price.toFixed(2)}</Text>
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
        marginVertical: 5,
        paddingTop: 20,
        borderRadius: 5,

        borderWidth: 1,
        borderColor: 'rgb(200,200,200)',

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,
        // elevation: 5
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
        backgroundColor: 'rgba(204, 38, 252,1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    doto: {
        position: 'relative',
        bottom: 3,
        width: 9,
        height: 9,
        borderRadius: 15,
        backgroundColor: 'rgba(50, 14, 253,1)',
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

        marginTop: 0,
        marginBottom: 30,
        height: 70,
        width: 70,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


