import React from 'react'
import {StyleSheet, View,Dimensions} from 'react-native'
import { Colors } from './styles'
const {primary, tertiary,brand} = Colors;

function SettingCard(props) {
    return (
       <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
       </View>
    )
}

export default SettingCard

const styles = StyleSheet.create({
    card: {
        flex:1,
        borderRadius:6,
        elevation:3,
        backgroundColor:'#fff',
        shadowOffset:{width:1, height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        shadowRadius:2,
        marginHorizontal:4,
        marginVertical:6

    },
    cardContent: {
        marginHorizontal:5,
        marginVertical:5,
        // flexDirection:'row'
    }
})  