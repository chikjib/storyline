import React,{useState,useCallback} from 'react'
import {Text,Image,StyleSheet,ScrollView,SafeAreaView,View,RefreshControl} from 'react-native'
import Moment from 'react-moment';


import { InnerContainer, PostContainer,Line } from '../../components/styles'
import { Colors } from '../../components/styles'
const {primary,tertiary,brand} = Colors;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const Details = ({route}) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, []);

    const {title,body,featured_image,created_at} = route.params
    return (
        <InnerContainer>
            <SafeAreaView>
            <ScrollView refreshControl={<RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
            <PostContainer>
            
                <Text style={styles.PostTitle}>{title}</Text>
                <Image source={{ uri: featured_image }} style={styles.PostImage} />
                <View style={styles.PostDate}>
                <Text>Posted: </Text>
                <Moment element={Text} fromNow style={{ color:tertiary, fontWeight:'bold' }}>
                    { created_at }
                </Moment>
                </View>
               
                <Line/>
                <Text style={styles.PostBody}>{body}</Text>
            </PostContainer>
            </ScrollView>
            </SafeAreaView>
        </InnerContainer>
    )
}

export default Details

const styles = StyleSheet.create({
    PostTitle: {
        fontSize:20,
        fontWeight:'bold',
        color:brand,
        marginBottom:10,
        textAlign:'center'
    },  
    PostImage: {
        width:'100%',
        height:200,
        marginBottom:10
    },
    PostBody: {
        fontSize:18,
        textAlign:'justify',
    },
    PostDate: {
        flex:1,
        flexDirection:'row',
    }
})