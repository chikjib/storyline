import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';

import DashboardStack from '../stacks/DashboardStack';
import SettingStack from '../stacks/SettingStack';
import CustomSideBarMenu from '../components/CustomSideBarMenu';
import TabNavigationRoutes from './TabNavigationRoutes';
import AboutStack from '../stacks/AboutStack';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../components/styles';
const { primary,tertiary} = Colors;

const Drawer = createDrawerNavigator()

export default function DrawerNavigationRoutes() {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#4286f4',
                color: '#cee1f2',
                itemStyle: {marginVertical: 5, color: primary},
                labelStyle: {
                color: primary,
                fontWeight:'bold'
                },
                
            }}
            screenOptions={{headerShown: false}}
            drawerContent={(props) => <CustomSideBarMenu {...props} /> }
            
        >

            {/* <Drawer.Screen 
                name="DashboardStack"
                options={{drawerLabel: 'Home'}}
                component={DashboardStack}
                
            /> */}
            <Drawer.Screen 
                name="Home"
                component={TabNavigationRoutes}
                options={{ drawerIcon: () => (<Ionicons name='home' size={20} color={primary} style={{ fontWeight:'bold' }} />) }}
                
            />
           
            
        </Drawer.Navigator>
    )
}

