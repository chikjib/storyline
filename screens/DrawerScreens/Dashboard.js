import React, { useContext, useEffect, useState,useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../../components/CredentialsContext";
import Moment from 'react-moment';
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  RefreshControl
} from "react-native";
import axios from "axios";

import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  PostContainer,
  WelcomeImage,
  Avatar,
  Colors
} from "../../components/styles";
//API client
import Card from "../../components/Card";
import Loader from "../../components/Loader";

const { primary, tertiary, brand } = Colors;
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Dashboard = ({navigation}) => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { user } = storedCredentials;
  
  const [posts, setPosts] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);


  // const AuthKey = "Token " + key;
  const url = "http://api.swiftcourier.org/posts/";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        //console.log(response.data.results);
        const { status, data, message = "SUCCESS" } = response;
        if (status == 200) {
          setPosts(response.data.results);
          setLoading(false)
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
            handleError(api_errors[key][0])
          );
        } else {
          handleError(
            "Loading failed!, Please check your network and try again."
          );
          
        }

      });
  }, []);

  const handleError = (message, type = 404) => {
    setError(message);
  };
  
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer >
      <Loader loading={loading} />
        <PostContainer>
          {(posts) ? (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Details',item)}>
                <Card>
                  <Text style={styles.PostTitle}>{item.title}</Text>
                <Image
                  source={{ uri: item.featured_image }}
                  style={styles.PostImage}
                />
                <View style={styles.datePosted}>
                <Ionicons name="time" size={15} />
                <Moment element={Text} fromNow style={{ color:tertiary, fontWeight:'bold' }}>
                    { item.created_at }
                </Moment> 
                </View>
                <Line/>
                <Text numberOfLines={4} style={styles.PostBody}>{item.body}</Text>
                </Card>
               
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
          />
          ):(
            <>
            <Text style={{ color:tertiary, fontWeight:'bold',textAlign:'center' }}>{error}</Text>
            <StyledButton refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}><ButtonText>retry</ButtonText>
            </StyledButton>
            </>
          )
        }
        </PostContainer>
      </InnerContainer>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  PostImage: {
    width: '100%',
    height: 200,
    marginBottom:5,
  },

  PostTitle: {
    fontSize: 17,
    fontWeight:'bold',
    color:brand,
    textAlign:'center',
    marginBottom:10
    
  },
  PostBody: {
    flex:1,
    fontSize:15,
    textAlign:'justify',
    marginTop:0,
    margin:5,
    flexDirection:'row'
  },
  datePosted: {
    flex:1,
    flexDirection:'row',
    marginLeft:5
  }
});
