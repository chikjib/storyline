import React,{useState,useContext,useEffect} from "react";
import { View, Text,ActivityIndicator,Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import KeyBoardAvoidingWrapper from "../../components/KeyBoardAvoidingWrapper";
import { CredentialsContext } from "../../components/CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  MsgBox
} from "../../components/styles";
import { Formik } from "formik";
import axios from "axios";
const { primary, tertiary, darkLight, brand } = Colors;

const Profile = () => { 
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const {key,user,givenName,familyName,name, email} = storedCredentials
  //const {username,email,first_name,last_name} = user

  //console.log(storedCredentials)
  const [firstname,setFirstname] = useState({})
  const [lastname,setLastname] = useState({})


  useEffect(() => {
    if(storedCredentials != null && storedCredentials.user != undefined){
      setFirstname(user.first_name)
      setLastname(user.last_name)
    }
  }, [])


  const url = 'http://api.swiftcourier.org/auth/user/'
  const AuthKey = "Token " + key;

  const handleSave = (credentials,setSubmitting) => {
      axios.put(url, credentials, { headers: { Authorization: AuthKey } }).then((response) => {
          console.log(response.data)
          const {data,status,message = "Profile Updated Successfully"} = response;
          if(status == 200){
            const credUpdate = {
              key: key,
              user: {
                email:data.email,
                first_name:data.first_name,
                last_name:data.last_name,
                username:data.username,
                
              }
            }
            persistUpdate(credUpdate,message,status)
            handleMessage(message,status)
          setSubmitting(false)
          }
      }).catch((error) => { 
        console.log(error)
        setSubmitting(false)
      })  
  }
  const persistUpdate = (credentials,message,status) => {
    AsyncStorage.mergeItem('storyLineCredentials',JSON.stringify(credentials))
    .then(() => {
      handleMessage(message,status)
      setNewStoredCredentials()
      //console.log(storedCredentials)
    }).catch(error => {
      console.log(error)
      if(error.message !== "Network Error"){
        const api_errors = error.response.data;
        const errors = Object.keys(api_errors)
        errors.map((key,index) => (
          //console.log(api_errors[key][0])
          handleMessage(api_errors[key][0])
        ))
        }else{
            handleMessage("Updating Failed!,Check your network and try again")
        }
    })
  }

  const setNewStoredCredentials = () => {
    AsyncStorage.getItem("storyLineCredentials")
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };

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
              first_name: firstname,
              last_name: lastname,
            }}
            onSubmit={(values, { setSubmitting }) => {
              Alert.alert('Save Profile','Are you sure you want to save?',[
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
                  label="First Name"
                  icon="user"
                  placeholder="First Name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("first_name")}
                  onBlur={handleBlur("first_name")}
                  values={values.first_name}
                  defaultValue={(user != undefined) ? user.first_name : givenName || null}
                  editable={(user != undefined) ? true : false} 
                />
                <MyTextInput
                  label="Last Name"
                  icon="user"
                  placeholder="Last Name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("last_name")}
                  onBlur={handleBlur("last_name")}
                  values={values.last_name}
                  defaultValue={(user != undefined) ? user.last_name : familyName || null}
                  editable={(user != undefined) ? true : false} 
                />
                <MyTextInput
                  label="Username"
                  icon="user"
                  placeholder="Username"
                  placeholderTextColor={darkLight}
                  editable={false}
                  defaultValue={(user != undefined) ? user.username : givenName || null}
                />
                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Email Address"
                  placeholderTextColor={darkLight}
                  defaultValue={(user != undefined) ? user.email : email || null}
                  editable={false}
                  keyBoardType="email-address"
                />

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit} disabled={(user == undefined) ? true: false }>
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

export default Profile;
