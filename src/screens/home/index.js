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
  Linking,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL, HEIGHT, WIDTH} from '../../utils/constant';
import Detail from '../../components/detail';
import Images from '../../utils/Images';
import colors from '../../utils/colors';
import {handleClick} from '../../utils/functions';
import LogoutModal from '../../components/logOutModal';
import fonts from '../../utils/fonts';
import Loader from '../../components/Loader';

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllAuctions();
 
  }, []);

  useEffect(() => {
    getAllAuctions();
  }, []);

  const getAllAuctions = async() => {
    setAuctions([]);
    setInverted(!inverted)
    let auctions = [];
    setLoading(true);
    const token = '3|HdchTL13iLiej4XJF2puUSW8hPDRW1nfFz1bFZZc';
    console.log('BASE_URL', BASE_URL);
    fetch(BASE_URL + 'auctions', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false);
        setRefreshing(false)
        if (inverted) {
          for (var i = 0; i < res?.data?.length; i++) {
            auctions.push(res?.data[i]);
          }
          setAuctions(auctions);
        } else {

          for (var i = res?.data.length - 1; i >= 0; i--) {
            auctions.push(res?.data[i]);
          }
          setAuctions(auctions);
        }
      })
      .catch(err => {
        setLoading(false);

        console.log(err);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
    key={item.id}
      onPress={() => navigation.navigate('AuctionDetail', {auctionId: item.id})}
      style={styles.itemView}>
      {/* {item.images.map(newItem => (
        <Image style={styles.item} source={{uri: newItem.path}} />
      ))} */}
        <Image style={styles.item} source={{uri: item.thumbnail}} />

      <View style={styles.details}>
        <Text numberOfLines={3} style={styles.text}>{item.title}</Text>

        <View style={{flex: 1.5, alignItems: 'center'}}>
          <Text style={styles.price}>{item.price}</Text>

          <TouchableOpacity
           // onPress={() => handleClick(item.link_one)}
            onPress={() => navigation.navigate('AuctionDetail', {auctionId: item.id})}

            style={styles.priceView}>
            <Text style={styles.link}>OPEN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8e8e8'}}>
      <StatusBar backgroundColor={colors.orange} barStyle="light-content" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.row}>
            <View style={{flex:1}}>
              <Text style={styles.title}>Sunrise</Text>
              <Text style={styles.subTitle}>Antique & Auctioneers</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center',flex:1,right:0,position:'absolute'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Schedule')}
                style={styles.scheduleCons}>
                <Image source={Images.calendar} style={styles.calendr} />
                <Text style={styles.schedule}>SCHEDULE {'\n'}CONSIGNMENT</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisibility(true)}>
                <Image source={Images.logout} style={styles.bell} />
              </TouchableOpacity>
            </View>
          </View>
          <Detail
            action="google"
            image={Images.place}
            text="79 old York Rd Chesterfield, NJ 08131"
          />
          <Detail
            action="email"
            image={Images.email}
            text="auction@suntise-antiques.com"
          />
          <Detail
            action="facebook"
            image={Images.facebook}
            text="Sunrise Antiques & Auctioneers"
          />
          <Detail
            action="website"
            image={Images.language}
            text="sunrise-antiques.com"
          />
          <Detail action="phone" image={Images.phoneCll} text="888-639-4443" />

          <TouchableOpacity
            onPress={() => getAllAuctions(!inverted)}
            style={styles.row1}>
            <Text style={styles.upcoming}>Upcoming Auctions</Text>
            <Image source={Images.sort} style={styles.calendr} />
          </TouchableOpacity>

          {/* <View style={styles.cover}>
            <ImageBackground style={styles.image} source={Images.cover}>
              <View style={styles.online}>
                <Text style={styles.onlineText}>Online</Text>
              </View>

              <View style={styles.timer}>
                <Text style={styles.timerText}>03:25:00</Text>
                <Image source={Images.clock} style={styles.clock} />
              </View>
            </ImageBackground>
          </View> */}
        </View>
        <View style={{flex: 1, marginHorizontal: 15}}>

         {isLoading ? <View style={{marginTop:50}}>
          <Loader color={colors.orange}/>
          </View>

          :
          <FlatList
          
            style={{flex: 2, marginTop: 10}}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            data={auctions}
          />}
        </View>
      </ScrollView>
      <LogoutModal
        // backToHome={navigateToBack}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.orange,
    width: '100%',
    flex: 2,
    paddingBottom:20
  },
  cover: {
    alignSelf: 'center',
    height: HEIGHT * 0.3,
    width: '90%',
    marginTop: 20,
    borderRadius: 40,
    overflow: 'hidden',
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  itemView: {
    width: WIDTH / 2.3,
    //flex: 1,
    height: HEIGHT * 0.2,
    margin: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  details: {
    backgroundColor: 'white',
    bottom: 0,
    position: 'absolute',
    height: 50,
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  priceView: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    padding: 2,
    marginTop: 2,
  },
  text: {
    flex: 2,
    fontSize: 10,
    marginLeft: 5,
    color: 'black',
    fontFamily:fonts.reg,

  },
  price: {
    fontSize: 8,
    color: 'black',
    fontFamily:fonts.reg,
    textAlign:'center'
  },
  calendr: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  bell: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'white',
    marginLeft: 5,
  },
  scheduleCons: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  schedule: {
    marginHorizontal: 5,
    color: 'white',
    fontSize: 10,
    fontFamily:fonts.med
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontFamily:fonts.bold
  },
  subTitle: {
    fontSize: 13,
    color: 'white',
    fontFamily:fonts.bold
  },
  upcoming: {
    fontSize: 18,
    color: 'white',
    fontFamily:fonts.bold
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  link: {
    color: 'white',
    fontSize: 8,
    padding: 2,
    fontFamily:fonts.bold
  },
  online: {
    backgroundColor: 'green',
    width: 60,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  onlineText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 10,
    padding: 2,
  },
  timer: {
    backgroundColor: colors.orange,
    flexDirection: 'row',
    borderTopRightRadius: 20,
    borderBottomEndRadius: 20,
    width: 150,
    marginTop: 100,
    alignItems: 'center',
  },
  clock: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
    marginHorizontal: 10,
  },
  timerText: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '800',
    padding: 10,
  },
  item: {
    width: undefined,
    height: '100%',
    resizeMode: 'cover',
  },
});
