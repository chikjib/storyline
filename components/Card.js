import React from 'react'
import {StyleSheet, View,Dimensions} from 'react-native'
import { Colors } from './styles'
const {primary, tertiary,brand} = Colors;

function Card(props) {
    return (
       <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
       </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        flex:1, 
        borderRadius:6,
        elevation:3,
        backgroundColor:primary,
        shadowOffset:{width:1,height:1},
        shadowColor:tertiary,
        shadowOpacity:0.3,
        shadowRadius:5,
        width:'100%',
        marginBottom:15
    },
    cardContent: {
        marginHorizontal:5,
        marginVertical:5,
        // flexDirection:'row',
        // alignContent:'center',
        // width: Dimensions.get('window').width,
    }
})  