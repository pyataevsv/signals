import React from 'react'
import { View, Button, StyleSheet, Image, TouchableHighlight, SafeAreaView, TouchableOpacity } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { LinearGradient } from 'expo-linear-gradient'
import * as Font from 'expo-font'
import { useFonts } from 'expo-font'

import Text from './SFText'

const slides = [
    {
        key: '0',
        title: 'Stop guessing',
        text: 'follow professionals',
        image: require('../assets/images/buysell.png'),
        backgroundColor: 'white',
        styles: {
            image: {
                marginBottom: 220,
            }
        },
    },
    {
        key: '1',
        title: 'Get hot push',
        text: 'notifications what and where to buy on markey',
        image: require('../assets/images/push_screen.png'),
        backgroundColor: 'white',
        styles: {
            image: {
                // marginBottom: -150,
            }
        },
    },
    {
        key: '2',
        title: 'Earn money',
        text: 'by trading stocks, forex, crypto and commodities',
        image: require('../assets/images/earn_group.png'),
        backgroundColor: 'white',
        styles: {
            image: {
                marginBottom: 20,

            }
        },
    },

]


export default class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props)
    }



    _renderPagination = (activeIndex) => {
        return (
            <View style={styles.paginationContainer}>
                <View style={styles.paginationDots}>
                    {slides.length > 1 &&
                        slides.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i === activeIndex
                                        ? { backgroundColor: '#4440ff' }
                                        : { backgroundColor: 'rgba(0, 0, 0, .2)' },
                                ]}
                            />
                        ))}
                </View>
            </View>
        );
    };
    _renderItem = ({ item }) => {
        return (
            <View style={[styles.slide, { backgroundColor: 'white' }]}>
                <Image style={[{ width: '100%', height: '100%', resizeMode: 'contain', marginBottom: 50 }, item.styles.image]} source={item.image} />

                <View style={styles.textBox}>
                    <View style={{ width: '80%' }}>
                        <Text heavy style={styles.title}>{item.title.toUpperCase()}</Text>
                        <Text style={{ fontSize: 20, paddingRight: 20, textAlign: 'left', color: '#767E82' }}>{item.text}</Text>
                    </View>
                    <View style={{ width: '20%' }}>
                        <TouchableOpacity style={{}} onPress={() =>
                            item.key != 2 ? this.slider.goToSlide(item.key + 1, true) : this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'TabNavigator' }],
                            })
                        }>
                            <View style={styles.nextBtn}>
                                <LinearGradient
                                    colors={['#9025FC', '#1308FE']}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                    style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 35 }}
                                >
                                    <Text style={{ fontSize: 24, color: 'white' }}>next</Text>
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>



                    </View>
                </View>
            </View >

        );
    }
    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Text>NEXT</Text>
            </View>
        );
    };
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <TouchableHighlight
                    underlayColor={'rgba(250,250,250,0.5)'}
                    onPress={() => this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'TabNavigator' }],
                    })}>
                    <Text style={{ fontSize: 20, color: 'white' }}>ENTER</Text>
                </TouchableHighlight>
            </View>
        );
    };
    render() {
        return (
            <AppIntroSlider
                // bottomButton={true}
                data={slides}
                renderItem={this._renderItem}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
                renderPagination={this._renderPagination}
                ref={(ref) => (this.slider = ref)}
            />
        );
    }
}

const styles = StyleSheet.create({
    buttonCircle: {
        position: 'absolute',
        top: 10,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#1A3745'
    },
    textBox: {
        flexDirection: 'row',
        marginHorizontal: 30,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        position: 'absolute',
        bottom: 0
    },
    nextBtn: {
        height: 70,
        width: 70,
        // backgroundColor: '#4021D2',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    paginationContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
    },
    paginationDots: {
        height: 16,
        margin: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    }
});

