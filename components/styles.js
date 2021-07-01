import styled from "styled-components";
import { View, Text, Image,TextInput,TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;
//colors
export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7E8",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#FF1358",
  red: "#EF4444",

  primaryLight: '#829BF8',
  primaryGradientStart: '#4f44b6',
  primaryGradientEnd: '#4f44b6',
  secondaryGradientStart: '#FF1358',
  secondaryGradientEnd: '#FF1358',
  profileGradientStart: '#54CBF6',
  profileGradientEnd: '#49D2D0',
  grey: '#acacac',
  gray: '#5f5f5f',
  darkGray: '#4d4d4d',
  lightGray: '#9b9b9b',
  white: '#ffffff',
  blue: '#5A81F7',
  bluish: '#F1F1F7',
  black: '#000000',
  green: '#6DB0A3',
  yellow: '#ffc247',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const DashboardContainer = styled(InnerContainer)`
    padding:25px;
    width:100%;
    justify-content:center;
`;

export const PostContainer = styled(InnerContainer)`
    padding:10px;
    width:100%;
    justify-content:center;
`;

export const Header = styled.View`
    flex-direction:row;
    align-items:center;
    justify-content:center;
`;

export const HeaderTitle = styled.View`
    flex-direction:row;
`;

export const HeaderText = styled.Text`
    font-weight:bold;
    font-size:20px;
    color: ${green};
    letter-spacing:1px;
`;
export const HeaderIcon = styled.View`
    position:absolute;
    left:16px;
`;


export const PageLogo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const Avatar = styled.Image`
    width:100px;
    height:100px;
    margin:auto;
    border-radius:50px;
    border-width:2px;
    border-color:${primary};
    margin-bottom:10px;
    margin-top:10px;
`;

export const WelcomeImage = styled.Image`
    height:52%;
    min-width:100%;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
  ${(props) => props.welcome == true && `
    font-size:30px;
  `}
`;

export const SubTitle = styled.Text`
    font-size:18px;
    margin-bottom:15px;
    letter-spacing:1px;
    font-weight:bold;
    color:${tertiary};
    ${(props) => props.welcome == true && `
    margin-bottom: 5px;
    font-weight:normal;
  `}
`;

export const StyledFormArea = styled.View`
    width:90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color:${secondary};
    padding:5px;
    padding-left:50px;
    border-radius:5px;
    font-size:16px;
    margin-vertical:3px;
    margin-bottom:5px;
    color:${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color:${tertiary};
    font-size:13px;
    text-align:left;
`;

export const LeftIcon = styled.View`
    left:15px;
    top:30px;
    position:absolute;
    z-index:1;
`;

export const RightIcon = styled.TouchableOpacity`
    right:15px;
    top:30px;
    position:absolute;
    z-index:1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding:15px;
    background-color:${brand};
    justify-content:center;
    border-radius:5px;
    margin-vertical:5px;
    height:40px;
    align-items:center;
    ${(props) => props.google == true && `
    background-color:${green}
    flex-direction:row;
    justify-content:center;
    `}
`;


export const ButtonText = styled.Text`
    color:${primary};
    font-size:16px;
    ${(props) => props.google == true && `
    padding:25px;
    `}
`;

export const MsgBox = styled.Text`
    text-align:center;
    font-size:13px;
    ${(props) => (props.type == 200) ? `
       color:${green}` : `color: ${red}`
    }
`;


export const FieldErrorBox = styled.Text`
    text-align:center;
    font-size:13px;
    color:${red};
`;

export const Line = styled.View`
    height:1px;
    width:100%;
    background-color:${darkLight};
    margin-vertical:10px;
`;

export const ExtraView = styled.View`
    justify-content:center;
    flex-direction:row;
    align-items:center;
    padding:10px;
`;

export const ExtraText = styled.Text`
    justify-content:center;
    align-items:center;
    color:${tertiary};
    font-size:15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content:center;
    align-items:center;
`;

export const TextLinkContent = styled.Text`
    color:${brand};
    font-size:15px;
`;