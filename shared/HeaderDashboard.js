import React from 'react'
import {View} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Header,HeaderTitle,HeaderText,HeaderIcon } from '../components/styles'

const HeaderDashboard = ({navigation,title}) => {
    const openMenu = () => {
        navigation.openDrawer()
    }
    return (
        <View>
            <Header>
                <HeaderIcon>
                <Ionicons name="menu" size={30} onPress={openMenu} />
                </HeaderIcon>
                <HeaderTitle>
                    <HeaderText>{title}</HeaderText>
                </HeaderTitle>
            </Header>
        </View>
    )
}

export default HeaderDashboard