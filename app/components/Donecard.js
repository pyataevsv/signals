import React, { useState } from 'react'
import { StyleSheet, View, Image, PixelRatio } from 'react-native'
import { AreaChart, LineChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Signal from './Signal'
import { BlurView } from 'expo-blur'
import Text from './SFText'


const Signalcard = (props) => {
    const [cardWidth, setCardWidth] = useState(0)

    let lastBottom, last_profit, profitArrow_style
    let allData = props.feedAll
    let signalData = props.signalData
    let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


    let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition, badgeColor, changeTextColor

    if (signalData.graph.type === 'buy') {
        badgeColor = '#2db238'
        Sellbuytext = () => <Text semibold style={{ color: badgeColor, fontSize: 17 }}>Buy:</Text>
        chartColor1 = '#cc26fc'
        maxPoint = signalData.graph.take_profit
        minPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * (signalData.graph.open_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)
        currentPricePosition = cardWidth * (signalData.graph.current_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)

    } else {
        badgeColor = 'red'
        Sellbuytext = () => <Text semibold style={{ color: badgeColor, fontSize: 17 }}>Sell:</Text>
        chartColor1 = '#4f25fc'

        minPoint = signalData.graph.take_profit
        maxPoint = signalData.graph.stop_loss

        openPricePosition = cardWidth * (signalData.graph.open_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)
        currentPricePosition = cardWidth * (signalData.graph.current_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)

    }
    if (signalData.done_status === 'profit') {
        profitArrow_style = { resizeMode: 'contain', width: 50, height: 50, transform: [{ rotate: "-90deg" }] }
        last_profit = '+' + Math.abs((signalData.graph.take_profit - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
        imageSource = require('../assets/icons/next_green.png')
        // roundStyle = { borderColor: '#2db238', borderWidth: 2, }
        changeText = 'Profit:'
        changeTextColor = '#61B75A'
    } else {
        last_profit = '-' + Math.abs((signalData.graph.stop_loss - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
        profitArrow_style = { resizeMode: 'contain', width: 50, height: 50, transform: [{ rotate: "90deg" }] }
        imageSource = require('../assets/icons/next.png')
        // roundStyle = { borderColor: '#FF033F', borderWidth: 2, }
        changeText = 'Loss:'
        changeTextColor = '#FF7D7D'
    }

    const priceDiff = ((signalData.graph.current_price - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(2)
    const ArrowImage = () => (priceDiff > 0) ? <Image style={{ height: 12, width: 15, transform: [{ rotate: "180deg" }] }} source={require('../assets/icons/arrow_down.png')} /> : <Image style={{ height: 12, width: 15, transform: [{ rotate: "0deg" }] }} source={require('../assets/icons/arrow_down.png')} />

    const data = signalData.graph.points
    const max = Math.max.apply(null, data)
    const min = Math.min.apply(null, data)
    lastBottom = 100 - 100 * (data[data.length - 1] - min) / (max - min)

    const innerColor = 'rgb(' + signalData.market_r_color + ',' + signalData.market_g_color + ',' + signalData.market_b_color + ')'
    const outerColor = 'rgba(' + signalData.market_r_color + ',' + signalData.market_b_color + ',' + signalData.market_b_color + ',0.2)'

    const marketInicator = <View style={[styles.marketIndicator, { backgroundColor: outerColor }]}>
        <View style={[styles.marketIndicatorInner, { backgroundColor: innerColor }]}></View>
    </View>
    const groundColor = 'rgb(255,255,255)'

    function getFirstDone(mas) {
        for (let i in mas) {
            if (mas[i].type === 'signal' && mas[i].status === 'done') return i
        }
    }

    return (
        <>
            {(Number(getFirstDone(props.feedAll.messages)) === props.id) ?
                (<View style={{ marginHorizontal: 20, marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
                    <Signal color='grey' radius={20} />
                    <View>
                        <Text heavy style={{ fontSize: 25, color: 'rgb(50,50,90)' }}>
                            CLOSED SIGNALS
                        </Text>
                    </View>
                </View>) : null}

            <View
                style={[styles.container]}
                onLayout={(e) => (props.setHeader) ? props.setHeader([e.nativeEvent.layout.y, e.nativeEvent.layout.y + e.nativeEvent.layout.height, 'Signal', signalData.status]) : null}
            >
                <BlurView intensity={Platform.OS === 'ios' ? 30 : 60} tint={'light'} style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', backgroundColor: 'red', zIndex: 10, backgroundColor: 'red' }]}>
                    <Text></Text>
                </BlurView>
                <View style={styles.profileBox}>
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
                    backgroundColor: groundColor,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor: 'rgb(245,245,245)'
                }}>
                    <View style={{}}>
                        <View style={[{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'rgb(245,245,245)' }]} >
                            <Text semibold style={{ fontSize: 17 }} > {signalData.graph.name}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text semibold style={{ fontSize: 17, color: changeTextColor }}>{changeText}</Text>
                                <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                    {/* <Text style={{ position: 'relative', top: 6, color: 'rgba(23,31,36,0.7)' }}>Under</Text> */}
                                    <Text semibold style={{ fontSize: 17 }}>{last_profit}</Text>
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
                            <View style={{ position: 'relative', right: 5 }}>
                                <View style={styles.dot}>
                                    <View style={styles.dotInner}></View>
                                </View>
                                <View style={{ position: 'relative', right: '40%' }}>
                                    <Text semibold style={{ fontSize: 12 }} >{minPoint.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', position: 'absolute', left: openPricePosition, zIndex: 0 }}>
                            <View style={{ position: 'relative', right: 5 }}>
                                <View style={styles.dot}>
                                    <View style={styles.dotInner}></View>
                                </View>
                                <Text semibold style={{ fontSize: 12, position: 'relative', right: '40%' }}>{signalData.graph.open_price.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', position: 'absolute', left: 0 + cardWidth, zIndex: 1 }}>
                            <View style={{ position: 'relative', right: 5 }}>
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
                                <View style={[styles.doto, { position: 'relative', right: 3 }]}></View>
                                <Text semibold style={{ fontSize: 12, position: 'relative', right: '40%', top: -35 }}>{signalData.graph.current_price.toFixed(2)}</Text>
                                {/* <Text style={{ position: 'relative', top: -10, }}>{signalData.graph.current_price.toFixed(2)}</Text> */}
                            </View>
                        </View>
                    </View>
                </View>
            </View >
        </>
    )
}

export default Signalcard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,

        borderWidth: 1,
        borderColor: 'rgb(200,200,200)',

        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.1,
        // shadowRadius: 10,

        // elevation: 5,
    },
    profileBox: {
        backgroundColor: 'white',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderColor: 'rgb(200,200,200)',
        // borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 0,
        paddingBottom: 10
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
    dot: {
        position: 'relative',
        bottom: 5,
        width: 12,
        height: 12,
        borderRadius: 15,
        backgroundColor: '#cc26fc',
        justifyContent: 'center',
        alignItems: 'center'
    },
    doto: {
        position: 'relative',
        bottom: 3,
        width: 9,
        height: 9,
        borderRadius: 15,
        backgroundColor: '#320efd',
        justifyContent: 'center',
        alignItems: 'center'
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
})




// const Donecard = (props) => {

//     const [cardWidth, setCardWidth] = useState(0)

//     const [exampleState, setExapmleState] = useState(0)

//     let lastBottom, last_profit, profitArrow_style, roundStyle
//     let allData = props.feedAll
//     let signalData = props.signalData
//     let profile = allData.profiles.filter(item => item.id === signalData.profile_id)[0]


//     let Sellbuytext, chartColor1, minPoint, maxPoint, openPricePosition, currentPricePosition, badgeColor

//     const fontColor = 'rgb(150,150,150)'

//     if (signalData.graph.type === 'buy') {
//         Sellbuytext = () => <Text style={{ color: '#eeb5ff' }}>Buy</Text>
//         chartColor1 = '#eeb5ff'

//         maxPoint = signalData.graph.take_profit
//         minPoint = signalData.graph.stop_loss

//         openPricePosition = cardWidth * (signalData.graph.open_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)
//         currentPricePosition = cardWidth * (signalData.graph.current_price - signalData.graph.stop_loss) / (signalData.graph.take_profit - signalData.graph.stop_loss)

//     } else {
//         Sellbuytext = () => <Text style={{ color: 'rgba(79, 37, 252,0.4)' }}>Sell</Text>
//         chartColor1 = 'rgba(79, 37, 252,0.4)'

//         minPoint = signalData.graph.take_profit
//         maxPoint = signalData.graph.stop_loss

//         openPricePosition = cardWidth * (signalData.graph.open_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)
//         currentPricePosition = cardWidth * (signalData.graph.current_price - signalData.graph.take_profit) / (-signalData.graph.take_profit + signalData.graph.stop_loss)

//     }

//     const priceDiff = ((signalData.graph.current_price - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(2)
//     const ArrowImage = () => (priceDiff > 0) ? <Image blurRadius={1} style={{ height: 12, width: 15, transform: [{ rotate: "180deg" }] }} source={require('../assets/icons/arrow_down.png')} /> : <Image blurRadius={1} style={{ height: 12, width: 15, transform: [{ rotate: "0deg" }] }} source={require('../assets/icons/arrow_down.png')} />
//     let imageSource, changeText
//     if (signalData.done_status === 'profit') {
//         profitArrow_style = { resizeMode: 'contain', width: 50, height: 50, transform: [{ rotate: "-90deg" }] }
//         last_profit = '+' + ((signalData.graph.take_profit - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
//         imageSource = require('../assets/icons/next_green.png')
//         // roundStyle = { borderColor: '#2db238', borderWidth: 2, }
//         changeText = 'Profit'
//     } else {
//         last_profit = ((signalData.graph.stop_loss - signalData.graph.open_price) * 100 / signalData.graph.open_price).toFixed(1) + '%'
//         profitArrow_style = { resizeMode: 'contain', width: 50, height: 50, transform: [{ rotate: "90deg" }] }
//         imageSource = require('../assets/icons/next.png')
//         // roundStyle = { borderColor: '#FF033F', borderWidth: 2, }
//         changeText = 'Loss'
//     }

//     const data = signalData.graph.points
//     const max = Math.max.apply(null, data)
//     const min = Math.min.apply(null, data)
//     lastBottom = 100 - 100 * (data[data.length - 1] - min) / (max - min)

//     function getFirstDone(mas) {
//         for (let i in mas) {
//             if (mas[i].type === 'signal' && mas[i].status === 'done') return i
//         }
//     }
//     const groundColor = 'rgb(247,250,252)'
//     const marketInicator =
//         <View style={{
//             marginRight: 15,
//             marginLeft: 5,
//             justifyContent: 'center',
//             alignItems: 'center',
//         }}>
//             <View style={[styles.marketIndicator, { backgroundColor: 'rgba(121,121,121,0.3)' }]}>
//                 <View style={[styles.marketIndicatorInner, { backgroundColor: 'rgba(121,121,121,1)' }]}></View>
//             </View>
//         </View>
//     return (
//         <>
//             {(Number(getFirstDone(props.feedAll.messages)) === props.id) ?
//                 (<View style={{ marginHorizontal: 20, marginTop: 40, flexDirection: 'row', alignItems: 'center' }}>
//                     <Signal color='grey' radius={20} />
//                     <View>
//                         <Text style={{ fontSize: 30, fontWeight: '700', color: 'rgb(50,50,90)' }}>
//                             Closed signals
//                         </Text>
//                     </View>
//                 </View>) : null}
//             <View style={styles.container}
//                 onLayout={(e) => (props.setHeader) ? props.setHeader([e.nativeEvent.layout.y, e.nativeEvent.layout.y + e.nativeEvent.layout.height, 'Done', signalData.status]) : null}
//             >
//                 {/* <BlurView intensity={50} style={[StyleSheet.absoluteFill, { width: 300, height: 700, backgroundColor: 'red', zIndex: 10, backgroundColor: 'red' }]}>
//                     <Text>not</Text>
//                 </BlurView> */}
//                 <View style={styles.profBox}>

//                     <View style={{ flexDirection: 'row', marginBottom: 10 }}>
//                         <View style={styles.imgBox}>
//                             <Image style={styles.img} source={{ uri: profile.image }} />
//                         </View>
//                         <View style={styles.poftitleBox}>
//                             <View style={{ flex: 1, justifyContent: 'flex-end' }}><Text style={{ fontWeight: 'bold' }}>{profile.name}</Text></View>
//                             <View style={{ flex: 1 }}><Text style={{ color: 'grey' }}>{signalData.time}</Text></View>
//                         </View>
//                     </View>


//                     {signalData.text ?
//                         <View style={{ marginBottom: 0 }}>
//                             <Text style={{ color: 'rgb(170,178,183)', textAlign: 'justify', color: 'rgba(23,31,36,0.7)' }}>{signalData.text}</Text>
//                         </View>
//                         : null}

//                 </View>
//                 <View style={{
//                     backgroundColor: groundColor,
//                     paddingHorizontal: 20,
//                     paddingVertical: 10,
//                     borderBottomLeftRadius: 5,
//                     borderBottomRightRadius: 5
//                 }}>
//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <View>
//                             <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
//                                 <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{signalData.graph.name}</Text>
//                             </View>
//                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
//                                 <View>
//                                     <Text style={{ fontWeight: 'bold', color: fontColor }}><Sellbuytext /> under:
//                         <Text style={{ fontWeight: '300' }}> {signalData.graph.open_price}</Text>
//                                     </Text></View>
//                             </View>
//                             <View style={{ justifyContent: 'flex-end' }}>
//                                 <View>
//                                     <Text style={{ fontWeight: 'bold', color: fontColor }}>Take profit:
//                         <Text style={{ fontWeight: '300' }}> {signalData.graph.take_profit}</Text>
//                                     </Text>
//                                 </View>
//                                 <View>
//                                     <Text style={{ fontWeight: 'bold', color: fontColor, lineHeight: 15 }}>Stop loss:
//                         <Text style={{ fontWeight: '300' }}> {signalData.graph.stop_loss}</Text>
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={[{ flexDirection: 'row', }]} >
//                             <View style={[styles.profitArrow, roundStyle]}>
//                                 <Image style={profitArrow_style} source={imageSource} />
//                             </View>
//                             <View style={{ justifyContent: 'center', postion: 'relative', bottom: 26 }}>
//                                 <Text style={{ position: 'relative', top: 6, color: 'rgba(23,31,36,0.7)' }}>{changeText}</Text>
//                                 <Text style={{ fontSize: 25, fontWeight: '700' }}>{last_profit}</Text>
//                             </View>
//                         </View>
//                     </View>


//                     <View style={{ height: 150, backgroundColor: '#ffffff' }}>
//                         <View >
//                             <View style={Object.assign({}, styles.price, { top: lastBottom })}><Text style={{ color: fontColor }}>{signalData.graph.current_price}</Text></View>

//                             <View style={{ position: 'relative', height: '100%', width: '100%', left: -0, zIndex: 1, backgroundColor: groundColor }}>
//                                 <LineChart
//                                     style={{ height: 150, position: 'relative', left: -20 }}
//                                     data={data}
//                                     curve={shape.curveNatural}
//                                     svg={{ stroke: chartColor1, strokeWidth: 5 }}
//                                     contentInset={{ top: 20, bottom: 20 }}
//                                     showGrid={false}
//                                     numberOfTicks={0}
//                                     key={props.id}
//                                 >

//                                 </LineChart>
//                             </View>

//                             <View style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 7, zIndex: 1 }}>
//                                 <LineChart
//                                     style={{ height: 150, position: 'relative', left: -20 }}
//                                     data={data}
//                                     curve={shape.curveNatural}
//                                     svg={{ stroke: 'rgba(204, 38, 252,0.1)', strokeWidth: 7 }}
//                                     contentInset={{ top: 20, bottom: 20 }}
//                                     showGrid={false}
//                                     numberOfTicks={0}
//                                     key={1000 + props.id}
//                                 >
//                                 </LineChart>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={{ flexDirection: 'row' }}>
//                         <View>
//                             <View style={{ marginLeft: 10 }}>
//                                 <View style={{ position: 'relative', top: 7, left: 1 }}>
//                                     <Text style={{ color: fontColor }}>Current price</Text>
//                                 </View>
//                                 <View><Text style={{ fontSize: 26, fontWeight: 'bold', color: fontColor }}>{signalData.graph.current_price}</Text></View>
//                                 <View style={{ position: 'relative', bottom: 7, left: 3, flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
//                                     {(priceDiff > 0) ?

//                                         <View style={[{ position: 'relative', top: 3, height: 10, width: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'rgba(19,8,254,0.3)' }, { transform: [{ rotateZ: "-45deg" }] }]} />
//                                         :
//                                         <View style={[{ position: 'relative', bottom: 3, height: 10, width: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: 'rgba(19,8,254,0.3)' }, { transform: [{ rotateZ: "135deg" }] }]} />
//                                     }
//                                     <Text style={{ fontSize: 18, marginLeft: 5, color: fontColor }}>{priceDiff}%</Text>
//                                 </View>
//                             </View>
//                         </View>

//                     </View>

//                     <View style={{ marginTop: 30, height: 50, marginHorizontal: 10 }}
//                         onLayout={(e) => { setCardWidth(e.nativeEvent.layout.width) }}
//                     >
//                         <View style={{ backgroundColor: '#deddff', height: 2 }}></View>

//                         <View style={{ alignItems: 'center', position: 'absolute', zIndex: 1 }}>
//                             <View style={{ position: 'relative' }}>
//                                 <View style={styles.dot}>
//                                     <View style={styles.dotInner}></View>
//                                 </View>
//                                 <View style={{ position: 'relative', right: '35%' }}>
//                                     <Text style={{ color: fontColor }} >{minPoint}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={{ alignItems: 'center', position: 'absolute', left: openPricePosition, zIndex: 0 }}>
//                             <View style={{ position: 'relative' }}>
//                                 <View style={styles.dot}>
//                                     <View style={styles.dotInner}></View>
//                                 </View>
//                                 <Text style={{ position: 'relative', right: '35%', color: fontColor }}>{signalData.graph.open_price}</Text>
//                             </View>
//                         </View>
//                         <View style={{ alignItems: 'center', position: 'absolute', left: 0 + cardWidth, zIndex: 1 }}>
//                             <View style={{ position: 'relative' }}>
//                                 <View style={{ position: 'relative' }}>
//                                     <View style={styles.dot}>
//                                         <View style={styles.dotInner}></View>
//                                     </View>
//                                     <Text style={{ position: 'relative', right: '55%', color: fontColor }}>{maxPoint}</Text>
//                                 </View>
//                             </View>
//                         </View>



//                         <View style={{ alignItems: 'center', position: 'absolute', left: currentPricePosition + 2, top: 0, zIndex: 2 }}>
//                             <View style={{ position: 'relative' }}>
//                                 <View style={styles.doto}></View>

//                                 <Text style={{ position: 'relative', right: '55%', top: -35, color: fontColor }}>{signalData.graph.current_price}</Text>


//                                 {/* <Text style={{ position: 'relative', top: -10, }}>{signalData.graph.current_price.toFixed(2)}</Text> */}
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View >
//         </>
//     )
// }

// export default Donecard

// const styles = StyleSheet.create({
//     container: {
//         marginHorizontal: 10,
//         marginVertical: 5,

//         borderBottomEndRadius: 5,
//         borderRadius: 5,

//         // borderWidth: 1,
//         // borderColor: 'rgb(200,200,200)',

//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,

//         elevation: 10,
//     },
//     profBox: {
//         borderColor: 'rgb(200,200,200)',
//         borderBottomWidth: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 10,
//         borderTopRightRadius: 5,
//         borderTopLeftRadius: 5,
//         backgroundColor: 'white'
//     },
//     imgBox: {
//         marginRight: 10
//     },
//     img: {
//         height: 50,
//         width: 50,
//         borderRadius: 50
//     },
//     price: {
//         backgroundColor: 'white',
//         alignSelf: 'center',
//         position: 'absolute',
//         right: 0,
//         paddingVertical: 5,
//         paddingHorizontal: 7,
//         borderRadius: 15,
//         zIndex: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.3,
//         shadowRadius: 10,
//         elevation: 10
//     },
//     profitArrow: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 0.1,
//         shadowRadius: 10,
//         backgroundColor: 'white',
//         elevation: 2,
//         width: 70,
//         height: 70,
//         borderRadius: 70,

//         marginRight: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dot: {
//         position: 'relative',
//         bottom: 5,
//         width: 12,
//         height: 12,
//         borderRadius: 15,
//         backgroundColor: 'rgba(204, 38, 252,0.3)',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     doto: {
//         position: 'relative',
//         bottom: 3,
//         width: 9,
//         height: 9,
//         borderRadius: 15,
//         backgroundColor: 'rgba(50, 14, 253,0.4)',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     dotInner: {
//         width: 5,
//         height: 5,
//         borderRadius: 7,
//         backgroundColor: 'white'
//     },
//     marketIndicator: {
//         position: 'absolute',
//         width: 100,
//         height: 100,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 10,
//         borderRadius: 50
//     },
//     marketIndicatorInner: {
//         position: 'absolute',
//         width: 10,
//         height: 10,
//         borderRadius: 50
//     },
// })


