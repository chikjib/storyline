import React,{useContext, useEffect,useState} from 'react';
import {View, Text, Alert, StyleSheet,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';
import { Ionicons } from '@expo/vector-icons';


import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { Colors } from './styles';
const {primary,tertiary,brand} = Colors;

const CustomSidebarMenu = (props) => {
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {user,name,email,photoUrl} = storedCredentials;
  const [Gname,setGName] = useState("");
  const [Gmail,setGmail] = useState("");
  // const [Gphoto,setGPhoto] = useState({});
  
  useEffect(() => {
    if(name != undefined){
       setGName(name);
       setGmail(email); 
    }
  },[])
//console.log(givenName)
  const clearLogin = () => {
    AsyncStorage.removeItem('storyLineCredentials').then(() => {
      setStoredCredentials("");
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 50, color: tertiary}}>
            {(storedCredentials.user != undefined) ? (
                  user.first_name.charAt(0).toUpperCase() || 
                  user.username.charAt(0).toUpperCase()
            ):(<View><Image source={{ uri:photoUrl }} style={{ width:60,height:60}} /></View> || null)
            } 
          </Text>
         
        </View>
        <Text style={stylesSidebar.profileHeaderUsername}>
        {(storedCredentials.user != undefined) ? (
          user.first_name.toUpperCase() +" " + user.last_name.toUpperCase() || user.username.toUpperCase()
        ):(Gname || null)
        }    
        </Text> 
        
      </View>
      <Text style={stylesSidebar.profileHeaderEmail}>
      {(storedCredentials.user != undefined) ? (
          user.email 
      ):(Gmail || null)
        } 
      </Text>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => 
            <Text style={{color: '#d8d8d8',fontWeight:'bold'}}>
              Logout
            </Text>
          }
          icon={(color,size) => (<Ionicons name="log-out-outline" color={primary} size={20} style={{fontWeight:'bold'}}/>)}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    clearLogin()
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: brand,
    paddingTop: 40,
    color: primary,
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: brand,
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileHeaderUsername: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderEmail: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal:50
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});