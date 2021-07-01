import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NavigationHeaderDrawer from '../components/NavigationHeaderDrawer';


//Screens
import Settings from '../screens/DrawerScreens/Settings';
import Profile from '../screens/TabScreens/Profile';
import Security from '../screens/TabScreens/Security';

import { Colors } from '../components/styles';
import BackButton from '../components/BackButton';
const {primary, tertiary,green,brand} = Colors;

const Stack = createStackNavigator();

const SettingStack = ({navigation}) => {
    return (
            <Stack.Navigator
                screenOptions={{ 
                    headerTintColor: brand,
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
                            headerTitleAlign:'center', 
                            title: 'Settings', 
                            // headerLeft: () => (<BackButton navigation={navigation} />)                          
                            }}

                        name="Settings" 
                        component={Settings}
                    />
                    <Stack.Screen 
                        options={{ 
                            headerTintColor:primary, 
                            headerStyle:{ 
                                backgroundColor:brand 
                            },
                            headerTitleAlign:'center', 
                            title: 'Profile', 
                            // headerLeft: () => (<BackButton navigation={navigation} />)                          
                            }}

                        name="Profile" 
                        component={Profile}
                    />
                    <Stack.Screen 
                        options={{ 
                            headerTintColor:primary, 
                            headerStyle:{ 
                                backgroundColor:brand 
                            },
                            headerTitleAlign:'center', 
                            title: 'Security', 
                            // headerLeft: () => (<BackButton navigation={navigation} />)                          
                            }}

                        name="Security" 
                        component={Security}
                    />
            </Stack.Navigator>
    )
}

export default SettingStack