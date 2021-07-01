import React, { useState,useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator,ScrollView } from "react-native";
//Icons
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from "../components/CredentialsContext";
//formik
import { Formik } from "formik";
import * as yup from 'yup';

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  StyledButton,
  LeftIcon,
  RightIcon,
  ButtonText,
  Colors,
  MsgBox,
  FieldErrorBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";
//KeyboardAvoidingWrapper
import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import Loader from "../components/Loader";
import * as Google from 'expo-google-app-auth';

//Colors
const { brand, darkLight, primary } = Colors;

//API client
import axios from "axios";

//Yup Schema
const LoginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
})
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [loading, setLoading] = useState(false);
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    

  const handleLogin = (credentials,setSubmitting) => {
    handleMessage(null)
    setLoading(true)
    const url = "http://api.swiftcourier.org/auth/login/";
    axios
      .post(url, credentials)
      .then((response) => {
        const { status, data, message = "SUCCESS" } = response;
        setLoading(false)
        if (status == 200) {
          
          // navigation.navigate('DrawerNavigationRoutes',{...data.user});
          persistLogin({...data},message,status)
          // navigation.navigate("Dashboard", { ...data.user });     
          
          setSubmitting(false)
        } 
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        if(error.message !== "Network Error"){
        const api_errors = error.response.data;
        const errors = Object.keys(api_errors)
        errors.map((key,index) => (
          //console.log(api_errors[key][0])
          handleMessage(api_errors[key][0])
        ))
        }else{
          handleMessage("Account Login Failed!, Please check your network and try again.")
        }
        // console.log(api_errors['non_field_errors']);
        
        setSubmitting(false)
      });
  };

  const handleGoogleLogin = () => {
    handleMessage(null)
    setLoading(true)
    const config = {
      iosClientId : `814808528546-09f783edl4120iisoakk1ihopl45h7s5.apps.googleusercontent.com`,
      androidClientId:`814808528546-ejlsctdplh1t33get0vfuvs05iasfic5.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    }
  
  Google.logInAsync(config).then((result) => { 
    const {type,user} = result;
    if(type == 'success'){
      const {givenName,familyName,name,email,photoUrl} = user;
      handleMessage("Google SignIn was Successful",200)
      // persistLogin({givenName,familyName,email,photoUrl})

      setTimeout(() => persistLogin({givenName,familyName,name,email,photoUrl}),1000)
      setLoading(false)
    }else{
      handleMessage("Google SignIn was cancelled")
      setLoading(false)
    }
  }).catch((error) => {
    console.log(error)
    handleMessage("Login Failed!, Please check your network and try again.")
    setLoading(false)
  })
}
  const handleMessage = (message, type = 404) => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (credentials,message,status) => {
    AsyncStorage.setItem('storyLineCredentials',JSON.stringify(credentials))
    .then(() => {
      handleMessage(message,status)
      setStoredCredentials(credentials)
    }).catch(error => {
      console.log(error)
      handleMessage("Login failed")
    })
  }
  return (
    
    <KeyBoardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
         <InnerContainer>
      <Loader loading={loading} />
             
          <PageLogo
            resizeMode="contain"
            source={require("../assets/img/logo.png")}
          />
          <PageTitle>Story Line</PageTitle>
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, {setSubmitting}) => {
               //navigation.navigate('Dashboard');
              handleLogin(values,setSubmitting);
              
            }}
            validationSchema={LoginSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
              ...props
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Username"
                  icon="user"
                  placeholder="Username"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  values={values.username}
                />
                <FieldErrorBox>{props.touched.username && props.errors.username}</FieldErrorBox>
                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="************"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  values={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <FieldErrorBox>{props.touched.password && props.errors.password}</FieldErrorBox>

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Login</ButtonText>
                  </StyledButton>
                )}

                {/* {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size='large' color={primary} />
                  </StyledButton>
                )} */}

                <Line />

                <StyledButton google={true} onPress={handleGoogleLogin}>
                  <Fontisto name="google" color={primary} size={25} />
                  <ButtonText google={true}>Sign in with Google</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("SignUp")}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyBoardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <AntDesign name={icon} size={20} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={20}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
