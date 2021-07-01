import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { StyledContainer } from "../components/styles";

export default function Splash({ navigation }) {
  const [animating, setAnimating] = useState(true);

  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@login_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }  
 
  
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      
      const result = getData()
      if(result !== null){
        navigation.navigate("AuthNavigationRoutes")
        console.log(result)
      }else{
        navigation.navigate("DrawerNavigationRoutes",result)
        console.log("no")
      }
      // SecureStore.getItemAsync(key).then((value) =>
      //   navigation.replace(value === null ? "AuthNavigationRoutes" : "DrawerNavigationRoutes")
      // );
    }, 5000);
  }, []);
  return (
    <StyledContainer> 
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={{ height: 80, alignItems: "center" }}
      ></ActivityIndicator>
    </StyledContainer>
  );
}
