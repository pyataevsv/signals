import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

function Btn(props) {
    return (
        <TouchableHighlight style={styles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
            <LinearGradient
                // colors={['#db25fc', '#9526fc']}
                colors={['grey', 'grey']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.gradient}
            >
                <View style={styles.button}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Image source={require('../assets/icons/arrow_right.png')} />
                </View>
            </LinearGradient>
        </TouchableHighlight>
    )
}

export default Btn

const styles = StyleSheet.create({
    touch: {
        alignSelf: 'center',
        width: '100%',
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "transparent",
        marginVertical: 1,
        marginHorizontal: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',

    },
})



// import React from 'react'
// import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'

// function Btn(props) {
//     return (
//         // <TouchableOpacity activeOpacity={0.4} style={styles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
//         <TouchableHighlight underlayColor="white" style={styles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
//             <LinearGradient
//                 colors={['#db25fc', '#1308FE']}
//                 start={[1, 1]}
//                 end={[-1, -1]}
//                 style={styles.gradient}
//             >
//                 <View style={styles.button}>
//                     <Text style={styles.text}>{props.title}</Text>
//                 </View>

//             </LinearGradient>
//         </TouchableHighlight>)
//     {/* </TouchableOpacity > */ }

// }

// export default Btn

// const styles = StyleSheet.create({
//     gradient: {
//         paddingTop: 3,
//         paddingBottom: 3,
//         borderRadius: 20,
//         paddingLeft: 3,
//         paddingRight: 3
//     },
//     touch: {
//         alignSelf: 'center',
//         width: '100%',
//         borderRadius: 20
//     },

//     button: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 5,
//         paddingHorizontal: 20,
//         backgroundColor: 'white',
//         borderRadius: 22,
//         width: '100%',

//     },
//     text: {
//         fontSize: 20,
//         fontWeight: '500',
//         color: '#cc26fc'
//     },
// })
