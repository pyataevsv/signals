import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, PixelRatio } from 'react-native'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { feedAll } from '../config/messages'

const Donecard = (props) => {

    const [cardWidth, setCardWidth] = useState(0)

    const [exampleState, setExapmleState] = useState(0)


    let lastBottom, last_profit, profitArrow_style, roundStyle
    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


    let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition

    const fontColor = '#d9d9d9'

    if (signalData.graph.type === 'buy') {
        Sellbuytext = () => <Text style={{ color: '#eeb5ff' }}>Buy</Text>
        chartColor1 = '#eeb5ff'
        maxPoint = signalData.graph.take_profit
        minPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * (signalData.graph.open_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)
        currentPricePosition = cardWidth * (signalData.graph.current_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)

    } else {
        Sellbuytext = () => <Text style={{ color: 'rgba(79, 37, 252,0.4)' }}>Sell</Text>
        chartColor1 = 'rgba(79, 37, 252,0.4)'

        minPoint = signalData.graph.take_profit
        maxPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * (signalData.graph.open_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)
        currentPricePosition = cardWidth * (signalData.graph.current_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)

    }

    const priceDiff = ((signalData.graph.current_price - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(2)
    const ArrowImage = () => (priceDiff > 0) ? <Image blurRadius={1} style={{ height: 12, width: 15, transform: [{ rotate: "180deg" }] }} source={require('../assets/icons/arrow_down.png')} /> : <Image blurRadius={1} style={{ height: 12, width: 15, transform: [{ rotate: "0deg" }] }} source={require('../assets/icons/arrow_down.png')} />
    let imageSource, changeText
    if (signalData.done_status === 'profit') {
        profitArrow_style = { resizeMode: 'contain', width: 50, height: 50, transform: [{ rotate: "-90deg" }] }
        last_profit = '+' + ((signalData.graph.take_profit - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
        imageSource = require('../assets/icons/next_green.png')
        roundStyle = { borderColor: '#2db238', borderWidth: 2, }
        changeText = 'Profit'
    } else {
        last_profit = ((signalData.graph.stop_loss - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
        profitArrow_style = { resizeMode: 'contain', width: 50, height: 50, transform: [{ rotate: "90deg" }] }
        imageSource = require('../assets/icons/next.png')
        roundStyle = { borderColor: '#FF033F', borderWidth: 2, }
        changeText = 'Loss'
    }

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
                    <View style={{ flex: 1 }}><Text style={{ color: fontColor }}>{signalData.time}</Text></View>
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'rgb(170,178,183)', textAlign: 'justify' }}>{signalData.text}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{signalData.graph.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: fontColor }}><Sellbuytext /> under:
                        <Text style={{ fontWeight: '300' }}> {signalData.graph.open_price}</Text>
                            </Text></View>
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: fontColor }}>Take profit:
                        <Text style={{ fontWeight: '300' }}> {signalData.graph.take_profit}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: fontColor, lineHeight: 15 }}>Stop loss:
                        <Text style={{ fontWeight: '300' }}> {signalData.graph.stop_loss}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[{ marginRight: 10, marginTop: 10, flexDirection: 'row', }]} >
                    <View style={[styles.profitArrow, roundStyle]}>
                        <Image style={profitArrow_style} source={imageSource} />
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: 'grey' }}>{changeText}</Text>
                        <Text style={{ fontSize: 25, fontWeight: '700' }}>{last_profit}</Text>
                    </View>
                </View>
            </View>


            <View style={{ height: 150, backgroundColor: '#ffffff' }}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 10 }}>
                    <View style={{ position: 'relative', top: 7, left: 1 }}>
                        <Text style={{ color: fontColor }}>Current price</Text>
                    </View>
                    <View><Text style={{ fontSize: 26, fontWeight: 'bold', color: fontColor }}>{signalData.graph.current_price}</Text></View>
                    <View style={{ position: 'relative', bottom: 7, left: 3, flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        {(priceDiff > 0) ?

                            <View style={[{ position: 'relative', top: 3, height: 10, width: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'rgba(19,8,254,0.3)' }, { transform: [{ rotateZ: "-45deg" }] }]} />
                            :
                            <View style={[{ position: 'relative', bottom: 3, height: 10, width: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'rgba(19,8,254,0.3)' }, { transform: [{ rotateZ: "135deg" }] }]} />
                        }
                        <Text style={{ fontSize: 18, marginLeft: 5, color: fontColor }}>{priceDiff}%</Text>
                    </View>
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
                        <View style={{ position: 'relative', right: '35%' }}>
                            <Text style={{ color: fontColor }} >{minPoint}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', left: openPricePosition, zIndex: 0 }}>
                    <View style={{ position: 'relative' }}>
                        <View style={styles.dot}>
                            <View style={styles.dotInner}></View>
                        </View>
                        <Text style={{ position: 'relative', right: '35%', color: fontColor }}>{signalData.graph.open_price}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'center', position: 'absolute', left: 0 + cardWidth, zIndex: 1 }}>
                    <View style={{ position: 'relative' }}>
                        <View style={{ position: 'relative' }}>
                            <View style={styles.dot}>
                                <View style={styles.dotInner}></View>
                            </View>
                            <Text style={{ position: 'relative', right: '35%', color: fontColor }}>{maxPoint}</Text>
                        </View>
                    </View>
                </View>



                <View style={{ alignItems: 'center', position: 'absolute', left: currentPricePosition + 2, top: 0, zIndex: 2 }}>
                    <View style={{ position: 'relative' }}>
                        <View style={styles.doto}></View>

                        <Text style={{ position: 'relative', right: '35%', top: -35, color: fontColor }}>{signalData.graph.current_price}</Text>


                        {/* <Text style={{ position: 'relative', top: -10, }}>{signalData.graph.current_price.toFixed(2)}</Text> */}
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
        elevation: 10
    },
    profitArrow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        backgroundColor: 'white',
        elevation: 2,
        width: 70,
        height: 70,
        borderRadius: 70,

        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: 'rgba(50, 14, 253,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dotInner: {
        width: 5,
        height: 5,
        borderRadius: 7,
        backgroundColor: 'white'
    }
})


