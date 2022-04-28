import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import Header from '../../components/header';
import colors from '../../utils/colors';
import { HEIGHT, WIDTH } from '../../utils/constant';
import Images from '../../utils/Images';
import { vs } from 'react-native-size-matters';
import fonts from '../../utils/fonts';

const Calendar = ({navigation,route}) => {
  const [selected, setSelected] = useState(0);
  const [selectedDate,setDate]=useState('');
  const [time,setTime] = useState('');

  const timeArray = [
    '12:00 pm',
    '1:00 pm',
    '2:00 pm',
    '3:00 pm',
    '4:00 pm',
    '5:00 pm',
    '6:00 pm',
    '7:00 pm',
    '8:00 pm',
    '9:00 pm',
    '10:00 pm',
    '11:00 pm',
    '12:00 am',
    '1:00 am',
    '2:00 am',
    '3:00 am',
  ]

  const text = route?.params?.text;

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>{
          setSelected(item)
          setTime(item)
        } }
        style={[
          styles.item,
          {
            backgroundColor: item == selected ? colors.orange : 'white',
          },
        ]}>
        <Text
          style={[
            styles.itemText,
            {color: item == selected ? 'white' : colors.orange},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const ArrowNext = () => {
    return (
      <View
        style={{
       
          marginRight:80
        }}>
        <Image style={styles.arrow} source={Images.rightArrow}/>
      </View>
    );
  };
  const Previous = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        
          marginLeft:80
        }}>
        <Image style={styles.arrow} source={Images.leftArrow}/>
      </View>
    );
  };

  const checkIfSelected = ()=>{
    if(selectedDate == ''){
      alert('Select Date To Schedule Auction')
    }
    else if(time == ''){
      alert('Select Time')
    }
    else{
      navigation.navigate('EnterDetails',{
          hide:true,
          date:selectedDate,
          time
        })
      }
    
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header title={text} />
      <ScrollView>
        <View style={styles.calendar}>
          <CalendarPicker
          nextComponent={<ArrowNext />}
          previousComponent={<Previous />}
          dayLabelsWrapper={{borderColor: 'transparent'}}
            weekdays={['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']}
            textStyle={{
              color: 'grey',
              fontFamily:fonts.med
            }}
            monthTitleStyle={{
              color: colors.orange,
              fontFamily:fonts.bold
            }}
            yearTitleStyle={{
              color: colors.orange,
              fontFamily:fonts.bold
            }}
            selectedDayStyle={{
              backgroundColor: colors.orange,
              borderRadius: 5,
            }}
            selectedDayTextStyle={{
              color: 'white',
              fontFamily:fonts.med
            }}
            selectedDayTextColor="white"
            selectedDayColor={colors.orange}
            onDateChange={(date)=>setDate(date)}
          />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 50,
            }}>
   
          </View>
        </View>
         
        <FlatList
          contentContainerStyle={{justifyContent: 'center'}}
          style={styles.flatList}
          numColumns={4}
          data={timeArray}
          renderItem={renderItem}
          keyExtractor={index => index.toString()}
        />

        <View style={styles.details}>
          <TouchableOpacity
          onPress={()=>checkIfSelected()}
          // onPress={()=>navigation.navigate('EnterDetails',{
          //   hide:true
          // })}
           style={styles.detailsBtn}>
            <Text style={styles.btnText}>ENTER DETAILS</Text>
          </TouchableOpacity>

          <Text style={styles.detailText}>
            Reserve your spot in the 5:00 PM Monday night indoor auction. You
            may also call us to reserve or cancel at 888-539-4433.Setup starts
            at 12 PM, Preview at 3PM , Auction at 5:00.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    flex: 1,
  },
  calendar: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 10,
    flex: 1.5,
    zIndex: 1,
  },
  item: {
    borderColor: colors.orange,
    borderWidth: 1,
    height: 30,
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    zIndex: 0,
  },
  details: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom:50
  },
  detailsBtn: {
    backgroundColor: colors.orange,
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  detailText: {
    fontSize: vs(13),
    lineHeight: 20,
    color:'black',
    fontFamily:fonts.reg
  },
  itemText: {
    color: colors.orange,
    fontFamily:fonts.med
  },
  line: {
    height: 40,
    width: 2,
    backgroundColor: 'black',
    zIndex: 1,
    position:'absolute',
    marginTop:HEIGHT * 0.34,
    marginHorizontal:WIDTH * 0.2
  },
  line1: {
    height: 40,
    width: 2,
    backgroundColor: 'black',
    zIndex: 1,
    position:'absolute',
    marginTop:HEIGHT * 0.34,
    marginHorizontal:WIDTH * 0.8
  },
  btnText: {
    color: 'white',
    fontFamily:fonts.bold
  },
  arrow:{
    tintColor:colors.orange,
    width:20,
    height:15,
  }
});
