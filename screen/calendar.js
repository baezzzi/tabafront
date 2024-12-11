import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal } from 'react-native';
import { useState } from 'react';
import Alrammodal from './Alrammodal';
import { AlarmContext } from './Alarmcontext';

const Calendar = ( { navigation } ) => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = week[currentDate.getDay()];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDeviceAlarms, setSelectedDeviceAlarms] = useState([]);

  const { allalarms } = useContext(AlarmContext); 

  const [devicename, setDevicename] = useState('');
  const [deviceImage, setDeviceImage] = useState(null);
  const [time, setTime] = useState('');

  const openmodal = (devicename) => {
    console.log('Clicked device name:', devicename);  
    const filteredAlarms = allalarms.filter(alarm => 
      alarm.devicename && alarm.devicename.trim().toLowerCase() === devicename.trim().toLowerCase()
    );
    console.log('Filtered Alarms:', filteredAlarms);  
    setSelectedDeviceAlarms(filteredAlarms);
    setModalVisible(true);
    choosedevice(devicename);
    setTime('11시');
  }
  const choosedevice = (device) => {
    
    let devicename = 'rice';
    let deviceImage = require('../assets/image/rice.png');
    let modalContent = '도어락 건전지 교체 요망.';

    switch(device) {
        case 'doorbell' : 
                setDevicename('초인종')  ; 
                setDeviceImage(require('../assets/image/doorbell.png'));
                break;
        case 'lock' : 
                setDevicename('도어락'); 
                setDeviceImage(require('../assets/image/lock.png'));
                break;
        case 'microwave' : 
                setDevicename('전자레인지'); 
                setDeviceImage(require('../assets/image/microwave.png'));
                break;
        case 'radio' : 
                setDevicename('안내발송'); 
                setDeviceImage(require('../assets/image/radio.png'));
                break;
        case 'refrigerator' : 
                setDevicename('냉장고'); 
                setDeviceImage(require('../assets/image/refrigerator.png'));
                break;
        case 'rice' : 
                setDevicename('밥솥'); 
                setDeviceImage(require('../assets/image/rice.png'));
                break;
        case 'washing' : 
                setDevicename('세탁기/건조기'); 
                setDeviceImage(require('../assets/image/washing.png'));
                break;
    }
  }

    
    return (
        <View style={styles.container}>
            {/*상단 디자인 */}
            <View style={styles.topDesign}>
                 {/* 상단 버튼들 */}
                <View style={styles.topButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Base2')}>
                      <Image source={require('../assets/image/home.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('calendar')}>
                        <Image source={require('../assets/image/calendar.png')} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../assets/image/setting.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.today}>오늘</Text>
                {/*오늘 날짜*/}
                <Text style={styles.currentDate}>{`${year}년 ${month}월 ${day}일 ${weekday}요일`}</Text>
            </View>

            <View style={styles.daycontainer}>
              {/* Day 1 Button */}
              <TouchableOpacity style={styles.dayButton} onPress={() => {} } >
                <Text title="day1" style={styles.daytext}>{`${day-3}`}</Text>
              </TouchableOpacity> 
              {/* Day 2 Button */}
              <TouchableOpacity style={styles.dayButton} onPress={() => {}} >
                <Text title="day2" style={styles.daytext}>{`${day-2}`}</Text>
              </TouchableOpacity> 
              {/* Day 3 Button */}
              <TouchableOpacity style={styles.dayButton} onPress={() => {}} >
                <Text title="day3" style={styles.daytext}>{`${day-1}`}</Text>
              </TouchableOpacity> 
              {/* Day 4 Button */}
              <TouchableOpacity style={styles.dayButton2} onPress={() => {}} >
                <Text title="day4" style={styles.currentday}>{`${day}`}</Text>
              </TouchableOpacity> 
              {/* Day 5 Button */}
              <TouchableOpacity style={styles.dayButton} onPress={() => {}} >
                <Text title="day5" style={styles.daytext}>{`${day+1}`}</Text>
              </TouchableOpacity> 
              {/* Day 6 Button */}
              <TouchableOpacity style={styles.dayButton} onPress={() => {}} >
                <Text title="day6" style={styles.daytext}>{`${day+2}`}</Text>
              </TouchableOpacity> 
              {/* Day 7 Button */}
              <TouchableOpacity style={styles.dayButton} onPress={() => {}} >
                <Text title="day7" style={styles.daytext}>{`${day+3}`}</Text>
              </TouchableOpacity> 
            </View>
        
          {/* 초인종 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('doorbell')}}>
              <Image source={require('../assets/image/doorbell.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>초인종</Text>
            </TouchableOpacity>
          </View>

          {/* 도어락 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('lock')}}>
              <Image source={require('../assets/image/lock.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>도어락</Text>
            </TouchableOpacity>
          </View>

          {/* 전자레인지 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('microwave')}}>
              <Image source={require('../assets/image/microwave.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>전자레인지</Text>
            </TouchableOpacity>
          </View>
        
          {/* 안내방송 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('radio')}}>
              <Image source={require('../assets/image/radio.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>안내방송</Text>
            </TouchableOpacity>
          </View>

          {/* 냉장고 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('refrigerator')}}>
              <Image source={require('../assets/image/refrigerator.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>냉장고</Text>
            </TouchableOpacity>
          </View>

          {/* 밥솥 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('rice')}}>
              <Image source={require('../assets/image/rice.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>밥솥</Text>
            </TouchableOpacity>
          </View>

          {/* 세탁기건조기 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('washing')}}>
              <Image source={require('../assets/image/washing.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>세탁기 & 건조기</Text>
            </TouchableOpacity>
          </View>

          <Alrammodal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            allalarms={selectedDeviceAlarms}
            deviceImage={deviceImage}
            devicename={devicename}
            time={time}
          />
        </View>
    
        
    );
};

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F2EFF8', // lightpurple
        alignItems: 'center',
      },
      topDesign: {
        width: '100%',
        height: 135,
        backgroundColor: '#9D90DF50', // middlepurple
        marginBottom: 65,
      },
      today: {
        width: 100,
        height: 30,
        color: '#4A3E8B', // darkpurple
        fontFamily: 'cafe24ssurround',
        fontSize: 25,
        textAlign: 'left',
        marginLeft: 25,
        marginTop: 10,
      },
      currentDate: {
        width: 200,
        height: 30,
        fontSize: 12,
        fontFamily: 'cafe24ssurround',
        marginLeft: 25,
        color: '#4A3E8B',
        marginTop: 2
      },
      topButtons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 290,
          marginTop: 25,
          width: 65
        },
        icon: {
          width: 25,
          height: 25,
          marginRight: 2,
        },
      alramcontainer: {
          justifyContent: 'space-between', // 요소 간 간격 조정
          paddingHorizontal: 20,
        },
      unread: {
        width: 300,
        height: 52,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.3,
        borderColor: '#4A3E8B',
        justifyContent: 'left',
        alignItems: 'center',
        marginTop: 11,
        flexDirection: 'row',
        paddingHorizontal: 10,
      },
      deviceImage: {
        width: 20,
        height: 20,
        marginLeft: 16,
        marginRight: 10,
        marginBottom: 1
      },
      deviceText: {
        fontFamily: 'cafe24ssurround',
        fontSize: 15,
        color: '#4A3E8B', // darkpurple
        textAlign: 'left',
      },
      daycontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        top: 120,
      },
      dayButton: {
        width: 31,
        height: 31,
        backgroundColor: '#F2EFF8',
        borderWidth: 1,
        borderColor: '#4A3E8B',
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 8,
      },
      dayButton2: {
        width: 31,
        height: 31,
        backgroundColor: '#4A3E8B',
        borderWidth: 1,
        borderColor: '#4A3E8B',
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 8,
      },
      daytext: {
        color: '#4A3E8B',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 9,
        fontFamily: 'cafe24ssurround'
      },
      currentday: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 9,
        fontFamily: 'cafe24ssurround',
        fontSize: 12,
      }

})

export default Calendar;