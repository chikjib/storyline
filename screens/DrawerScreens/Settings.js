import React,{useContext} from 'react'
import {View,Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { InnerContainer,PostContainer,Colors } from '../../components/styles'
import { AntDesign,Ionicons } from '@expo/vector-icons';
import SettingCard from '../../components/SettingCard';
import { CredentialsContext } from '../../components/CredentialsContext';

const { primary, tertiary, brand } = Colors;

export default function Settings({navigation}) {
    const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const { key, user } = storedCredentials;

    return (
      
                <ScrollView style={styles.container}>
                    <SettingCard>
                        <AntDesign name="user" size={25} style={styles.iconLeft} />
                        <Text style={styles.profileHeading}>Profile</Text>
                        <Text style={styles.subHeading}>Manage your Profile</Text>
                        <TouchableOpacity style={styles.iconRight} onPress={() => navigation.navigate('Profile', storedCredentials)}>
                        <AntDesign name='right' size={20}  />
                        </TouchableOpacity>
                    </SettingCard>
          

                    <SettingCard>
                        <AntDesign name="key" size={25} style={styles.iconLeft} /> 
                        <Text style={styles.profileHeading}>Security</Text>
                        <Text style={styles.subHeading}>Change your password</Text>
                        <TouchableOpacity style={styles.iconRight} onPress={() => navigation.navigate('Security')}>
                        <AntDesign name='right' size={20}  />
                        </TouchableOpacity>
                    </SettingCard>
                </ScrollView>
         
    )
}

const styles = StyleSheet.create({
    container: {
        margin:8
    },
    profileHeading:{
        fontSize:17,
        marginLeft:35
    },
    subHeading: {
        fontSize:12,
        fontStyle:'italic',
        marginLeft:35
    },
    iconRight: {
        position:'absolute',
        paddingLeft:255,
        paddingVertical:12,
    },
    iconLeft: {
        position:'absolute',
        paddingVertical:7,
        paddingHorizontal:5
    }
})