import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../components/styles";
const { primary, tertiary, green, brand } = Colors;

const BackButton = ({navigation}) => {

  const back = () => {
    navigation.popToTop();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={back}>
        <Ionicons name='arrow-back' size={30} color={primary}/>
      </TouchableOpacity>
    </View>
  );
};
export default BackButton;