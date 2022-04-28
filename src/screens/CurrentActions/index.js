import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StatusBar,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Images from '../../utils/Images';
import { BASE_URL, HEIGHT } from '../../utils/constant';
import colors from '../../utils/colors';
import { handleClick } from '../../utils/functions';

const CurrentAuctions = () => {
  const [isLoading, setLoading] = useState(true);
  const [auctions,setAuctions]=useState([]);

  useEffect(() => {
    getAllAuctions()
  }, [])
  

  const getAllAuctions = async () => {
    setLoading(true);
    const token = '3|HdchTL13iLiej4XJF2puUSW8hPDRW1nfFz1bFZZc';
    fetch(BASE_URL + 'auctions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false);

        console.log('responseJson===>', res);
        setAuctions(res.data);
      })
      .catch(err => {
        setLoading(false);

        console.log(err);
      });
  };


    const renderItem = ({item,index}) => (
        <View key={index} style={styles.itemView}>
          <Image style={styles.item} source={{uri:item?.images[0]?.path}} />
    
          <View style={styles.details}>
            <Text style={styles.text}>{item.title}</Text>
    
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={styles.price}>{item.price}</Text>
    
              <TouchableOpacity onPress={()=>handleClick(item.link_one)} style={styles.priceView}>
                <Text style={styles.link}>Visit Link</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Header title='Current Auctions'/>
            <FlatList
            style={{flex:1}}
            renderItem={renderItem}
            keyExtractor={index => index.toString()}
            data={auctions}
          />
        </SafeAreaView>
    )
}

export default CurrentAuctions

const styles = StyleSheet.create({
    itemView: {
        width: '90%',
        flex: 1,
        height: HEIGHT * 0.3,
        margin: 5,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        alignSelf:'center',
        marginVertical:10,

      },
      details: {
        backgroundColor: 'white',
        bottom: 0,
        position: 'absolute',
        height: 70,
        width: '100%',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderBottomEndRadius:10,
        borderBottomLeftRadius:10,
      },
      priceView: {
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        padding: 2,
        marginTop: 2,
      },
      text: {
        flex: 2,
        fontSize: 14,
        marginHorizontal: 5,
        color: 'black',
        lineHeight:20
      },
      price: {
        fontSize: 10,
        color: 'black',
      },
      item: {
        resizeMode: 'stretch',
       // overflow:'hidden',
        width:'100%',
        borderRadius:10,
        height:'100%'
      },
})
