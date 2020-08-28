import React from 'react'
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Text from './SFText'
function Btn(props) {
    return (
        <View style={styles.elevation}>
            <TouchableHighlight underlayColor={'rgba(250,250,250,0.5)'} style={styles.touch} onPress={() => (props.onPress) ? props.onPress() : null}>
                <View style={styles.button}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Image style={{ width: 20, height: 30 }} source={require('../assets/icons/key_arrow_right.png')} />
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default Btn

const styles = StyleSheet.create({
    elevation: {
        borderTopWidth: 1,
        borderColor: 'rgb(222,222,222)'

    },
    touch: {
        alignSelf: 'center',
        width: '100%',

    },

    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,


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
