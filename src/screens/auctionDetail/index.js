import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BASE_URL, HEIGHT, WIDTH} from '../../utils/constant';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActiveDot, DeActiveDot} from '../../components/dots';
import Images from '../../utils/Images';
import colors from '../../utils/colors';
import Detail from '../../components/detail';
import moment from 'moment';
import fonts from '../../utils/fonts';
import Loader from '../../components/Loader';


const AuctionDetail = ({navigation,route}) => {
  const [isLoading, setLoading] = useState(true);
  const [res, setRes] = useState({});
  const flatRef = useRef();
  const [id, selectId] = useState(1);
  const[auctionId]=useState(route?.params?.auctionId);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    setLoading(true);
    const token = '3|HdchTL13iLiej4XJF2puUSW8hPDRW1nfFz1bFZZc';
    console.log('BASE_URL', BASE_URL);
    fetch(BASE_URL + `auctions/${auctionId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false);

        // console.log('responseJson===>', res?.data);
        setRes(res?.data);
      })
      .catch(err => {
        setLoading(false);

        console.log(err);
      });
  };

  const onViewRef = React.useRef(viewableItems => {
    if (viewableItems != null && viewableItems?.changed.length > 0) {
      const item = viewableItems?.changed[0].item;
      selectId(item.id);
    }
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 100});

   return (
     isLoading ? <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
       <Loader color={colors.orange}/>
     </View> : 
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <FlatList
        ref={flatRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        keyExtractor={(key, index) => index.toString()}
        data={res?.images}
        renderItem={({item}) => (
          <View>
            <Image style={styles.image} source={{uri: item?.path}} />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backView}>
        <Image style={styles.back} source={Images.back} />
      </TouchableOpacity>

      {res?.images?.length > 0 && (
        <View style={styles.dotView}>
          {res?.images?.map((item, index) => {
            if (item.id == id) {
              return <ActiveDot color={true} />;
            } else {
              return <DeActiveDot color={true} />;
            }
          })}
        </View>
      )}

      <View style={styles.titleView}>
        <Text style={styles.title}>{res?.title}</Text>
      </View>

      <Text style={styles.price}>Price: {res?.price}</Text>
          <Detail
             location={true}
             color={'black'}
            image={Images.visitLink}
            text={'Visit Link'}
            actionUrl={res?.link_one}
            action={'url'}
          />

      <Detail
      location={true}
             color={'black'}
            image={Images.location}
            text={res?.location}
            actionUrl={res?.location}
            action={'url'}
          />

<Detail
      color={'black'}
            image={Images.clock}
            text={ 'From '  + moment(res?.begins_date).format('dddd, MMM Do YYYY')}
          />
<Detail
      color={'black'}
            image={Images.clock}
            text={ 'To ' +moment(res?.ends_date).format('dddd, MMM Do YYYY')}
          />
<Detail
      color={'black'}
            image={Images.calendar}
            text={res?.preview}
          />

<Detail
             location={true}
             color={'black'}
            image={Images.visitLink}
            text={'Visit Link'}
            actionUrl={res?.link_two}
            action={'url'}
          />
          


      <Text style={styles.desc}>{res?.description}</Text>

    


    </SafeAreaView>
  );
};

export default AuctionDetail;

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'transparent',
    width: WIDTH,
    borderRadius: 10,
    height: HEIGHT * 0.27,
    resizeMode: 'stretch',
  },
  dotView: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom:10
  },
  backView: {
    backgroundColor: 'white',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: Platform.OS == 'android'? 10 : 50,
    marginHorizontal: 20,
    opacity: 0.8,
  },
  back: {
    width: 20,
    height: 20,
    tintColor: colors.orange,
  },
  title: {
    fontSize: 20,
    flex: 2,
    lineHeight: 25,
    fontFamily:fonts.bold,
    color:'black'
  },
  desc: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 14,
    color: 'grey',
    lineHeight:22,
    fontFamily:fonts.light
  },
  beginDate: {},
  endDate: {},
  linkOne: {},
  linkTwo: {},
  location: {},
  previewDate: {},
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  price: {
    fontSize: 10,
    marginHorizontal: 20,
    color: colors.orange,
    marginBottom:10,
    fontFamily:fonts.bold
  },
});
