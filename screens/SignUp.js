import React, { useState,useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator,ScrollView } from "react-native";
//Icons
import { Ionicons, AntDesign, Fontisto } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from "../components/CredentialsContext";
//formik
import { Formik } from "formik";
//yup
import * as yup from "yup";

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
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  FieldErrorBox,
} from "../components/styles";

import KeyBoardAvoidingWrapper from "../components/KeyBoardAvoidingWrapper";
import Loader from "../components/Loader";
//Colors
const { brand, darkLight, primary } = Colors;

//API client
import axios from "axios";

//Yup Schema

const SignupSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Too short, min of 5 characters"),
  password1: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be a minimum of six (6) characters"),
  password2: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password1"), null], "Passwords must match"),
  email: yup.string().email().required("Email is required"),
  first_name: yup
    .string()
    .min(2, "Too short")
    .required("First name is required"),
  last_name: yup.string().min(2, "Too short").required("Last name is required"),
});

const SignUp = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [loading,setLoading] = useState(false)
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
 
  const [
    isRegistrationSuccess,
    setIsRegistrationSuccess
  ] = useState(false);

  const handleSignup = (credentials, setSubmitting) => {
    handleMessage(null);
    setLoading(true)
    const url = "http://api.swiftcourier.org/auth/registration/";
    axios
      .post(url, credentials)
      .then((response) => {
        const { status, data, message = "SUCCESS" } = response;
        setLoading(false)
        //console.log(status)
        if (status == 201) {
          // navigation.navigate("Dashboard", { ...data.user });
          persistLogin({...data},message,status)

          //console.log(data)
          setSubmitting(false);
        }
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.toJSON());
        if (error.message !== "Network Error") {
          const api_errors = error.response.data;
          const errors = Object.keys(api_errors);
          errors.map((key, index) =>
            //console.log(api_errors[key][0])
            handleMessage(api_errors[key][0])
          );
        } else {
          handleMessage(
            "Account creation failed!, Please check your network and try again.",error.response.status
          );
        }

        setSubmitting(false);
      });
  };

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
      handleMessage("Persisting Login failed")
    })
  }

  return (
    <KeyBoardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
        <Loader loading={loading} />

          <PageTitle>Story Line</PageTitle>
          <SubTitle>Account Signup</SubTitle>
          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              password1: "",
              password2: "",
              email: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              // navigation.navigate('Welcome');
              handleSignup(values, setSubmitting);
            }}
            validationSchema={SignupSchema}
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
                <FieldErrorBox>
                  {props.touched.username && props.errors.username}
                </FieldErrorBox>

                <MyTextInput
                  label="Firstname"
                  icon="user"
                  placeholder="John"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  values={values.first_name}
                />
                <FieldErrorBox>
                  {props.touched.first_name && props.errors.first_name}
                </FieldErrorBox>
                <MyTextInput
                  label="Lastname"
                  icon="user"
                  placeholder="Doe"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  values={values.last_name}
                />
                <FieldErrorBox>
                  {props.touched.last_name && props.errors.last_name}
                </FieldErrorBox>
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Email Address"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  values={values.email}
                />
                <FieldErrorBox>
                  {props.touched.email && props.errors.email}
                </FieldErrorBox>

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="************"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password1")}
                  onBlur={handleBlur("password1")}
                  values={values.password1}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <FieldErrorBox>
                  {props.touched.password1 && props.errors.password1}
                </FieldErrorBox>
                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="************"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password2")}
                  onBlur={handleBlur("password2")}
                  values={values.password2}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <FieldErrorBox>
                  {props.touched.password2 && props.errors.password2}
                </FieldErrorBox>

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Create Account</ButtonText>
                  </StyledButton>
                )}

                {/* {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )} */}

                <Line />

                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
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

export default SignUp;
