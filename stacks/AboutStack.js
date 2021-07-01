import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeaderDrawer from '../components/NavigationHeaderDrawer';
import BackButton from '../components/BackButton'

//Screens
import About from '../screens/About';

import { Colors } from '../components/styles';
const {primary, tertiary,green,brand} = Colors;
const Stack = createStackNavigator();

const AboutStack = ({navigation}) => {
    return (
            <Stack.Navigator
                screenOptions={{ 
                    headerTintColor: tertiary,
                    headerLeftContainerStyle: {
                        paddingLeft:20
                    }

                 }}
                 initialRouteName='Dashboard'
            >                    
                    <Stack.Screen 
                        options={{ 
                            headerTintColor:primary, 
                            headerStyle:{ 
                                backgroundColor:brand
                            },
                            headerTitle:'About',
                            headerTitleAlign:'center', 
                            // headerLeft:() => (
                            //     <BackButton navigation={navigation} />
                            // )
                            }} 
                        name="About" 
                        component={About}
                    />
                    
            </Stack.Navigator>
    )
}

export default AboutStack