import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../components/styles";
const { primary, tertiary, green, brand } = Colors;

const NavigationDrawerHeader = ({navigation}) => {

  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Ionicons name='menu' size={30} color={primary}/>
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;