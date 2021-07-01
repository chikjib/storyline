import React,{useState,useContext} from "react";
import { View, Text,ActivityIndicator,Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../../components/KeyBoardAvoidingWrapper";
import { CredentialsContext } from "../../components/CredentialsContext";
import { Ionicons } from "@expo/vector-icons";
import {
  InnerContainer,
  StyledFormArea,
  StyledTextInput,
  StyledButton,
  StyledInputLabel,
  StyledContainer,
  Colors,
  LeftIcon,
  RightIcon,
  ButtonText,
  Line,
  MsgBoxSuccess,
  MsgBox,
  FieldErrorBox
} from "../../components/styles";
import { Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
const { primary, tertiary, darkLight, brand } = Colors;

const Security = () => { 
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const {key,user} = storedCredentials
  //const {username,email,first_name,last_name} = user
  const [hidePassword,setHidePassword] = useState(true)
  //Yup Schema
const SecuritySchema = yup.object({
  old_password: yup.string().required("Old Password is required")
  .min(6, "Password should be a minimum of six (6) characters"),
  new_password1: yup
    .string()
    .required("New Password is required")
    .min(6, "Password should be a minimum of six (6) characters"),
  new_password2: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("new_password1"), null], "Passwords must match"),
})

  const url = 'http://api.swiftcourier.org/auth/password/change/'
  const AuthKey = "Token " + key;

  const handleSave = (credentials,setSubmitting) => {
    handleMessage(null)
      axios.post(url, credentials, { headers: { Authorization: AuthKey } }).then((response) => {
          console.log(response.data)
          const {data,status,message = "Password Changed Successfully"} = response;
          if(status == 200){
            // persistUpdate({...data},message,status)
            handleMessage(message,status)
            setSubmitting(false)
          }
      }).catch((error) => { 
        console.log(error)
        if(error.message !== "Network Error"){
          const api_errors = error.response.data;
          const errors = Object.keys(api_errors)
          errors.map((key,index) => (
            //console.log(api_errors[key][0])
            handleMessage(api_errors[key][0])
          ))
          }else{
            handleMessage("Password Updating Failed!, Please check your network and try again.")
          }
        setSubmitting(false)
      })  
  }
  
  const handleMessage = (message, type = 404) => {
    setMessage(message);
    setMessageType(type);
  };

  

  return (
    <KeyBoardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="light" />
        <InnerContainer style={{ height:500 }}>
          <Formik
            initialValues={{
              old_password: "",
              new_password1: "",
              new_password2: ""
            }}
            onSubmit={(values, { setSubmitting }) => {
              Alert.alert('Change Password','Are you sure you want to change your current password?',[
                {
                  text: 'Cancel',
                  onPress: () => {
                    
                    setSubmitting(false)
                  }
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    handleSave(values,setSubmitting)
                  }
                }
                
              ],
              {cancelable: false},
              )
                // handleSave(values,setSubmitting)
            }}
            validationSchema={SecuritySchema}
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
                  label="Old Password"
                  icon="key"
                  placeholder="***********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("old_password")}
                  onBlur={handleBlur("old_password")}
                  values={values.old_password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <FieldErrorBox>{props.touched.old_password && props.errors.old_password}</FieldErrorBox>

                <MyTextInput
                  label="New Password"
                  icon="key"
                  placeholder="***********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("new_password1")}
                  onBlur={handleBlur("new_password1")}
                  values={values.new_password1}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                  
                />
                <FieldErrorBox>{props.touched.new_password1 && props.errors.new_password1}</FieldErrorBox>

                <MyTextInput
                  label="Confirm Password"
                  icon="key"
                  placeholder="************"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("new_password2")}
                  onBlur={handleBlur("new_password2")}
                  values={values.new_password2}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <FieldErrorBox>{props.touched.new_password2 && props.errors.new_password2}</FieldErrorBox>
              
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit} disabled={(user == undefined) ? true : false}>
                    <ButtonText>Save</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

              </StyledFormArea>
            )}
          </Formik>
          {/* <Text>{username}</Text> */}
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

export default Security;
