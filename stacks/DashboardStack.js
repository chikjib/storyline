import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeaderDrawer from '../components/NavigationHeaderDrawer';
import BackButton from '../components/BackButton'

//Screens
import Dashboard from '../screens/DrawerScreens/Dashboard';
import Details from '../screens/DrawerScreens/Details';

import { Colors } from '../components/styles';
const {primary, tertiary,green,brand} = Colors;
const Stack = createStackNavigator();

const DashboardStack = ({navigation}) => {
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
                            headerTitle:'Story Line',
                            headerTitleAlign:'center', 
                            headerLeft:() => (
                                <NavigationHeaderDrawer navigation={navigation} />
                            )
                            }} 
                        name="Dashboard" 
                        component={Dashboard}
                    />
                    <Stack.Screen 
                        options={{ 
                            headerTintColor:primary, 
                            headerStyle:{ 
                                backgroundColor:brand
                            },
                            headerTitle:'Article',
                            headerTitleAlign:'center', 
                            headerLeft:() => (
                                <BackButton navigation={navigation} />
                            )
                            }} 
                        name="Details" 
                        component={Details}
                    />
            </Stack.Navigator>
    )
}

export default DashboardStack