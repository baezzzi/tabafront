import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Modal } from 'react-native';
import { useState } from 'react';
import Alrammodal from './Alrammodal';
import { AlarmContext } from './Alarmcontext';
import Sttmodal from './Sttmodal';
import Test from './test';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Calendar = ( { navigation } ) => {

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = week[currentDate.getDay()];

  const [modalVisible, setModalVisible] = useState(false);
  const [sttVisible, setSttVisible] = useState(false);
  const [selectedDeviceAlarms, setSelectedDeviceAlarms] = useState([]);

  const [date, setDate] = useState(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);

  const { allalarms, time, device, sttContent, alarms, isRead } = useContext(AlarmContext);

  const [devicename, setDevicename] = useState('');
  const [deviceImage, setDeviceImage] = useState(null);

  const [devicetypealarm, setDevicetypealarm] = useState([]);

  // 날짜 버튼 상태 변경
  const [selectedButton, setSelectedButton] = useState(day);
  const [unreadAlarmCount, setUnreadAlarmCount] = useState(0);

  const [iconnum, setIconnum] = useState(0);
  const [iconcolor, setIconcolor] = useState(1);

  const [modalContent, setModalContent] = useState('');

  const handlebuttonPush = (iconnum) => {
          if (iconnum === 0) {
              navigation.navigate('Base2');
              setIconcolor(1);
          } else if (iconnum === 1) {
              navigation.navigate('calendar');
          }
      }

  const getToken = async () => {
          // token 가져오기
          const userToken = await AsyncStorage.getItem('X-User-Idx');
          console.log(userToken);
      };

  const handleLogout = async () => {
          getToken();
          try {
              await AsyncStorage.removeItem('X-User-Idx');
                  // 로그아웃 후 화면 전환이나 앱 상태 변경
               navigation.navigate('main');
          } catch (error) {
              console.log('로그아웃 실패:', error);
          }
      };

  // useEffect로 date 상태 변경 시 API 요청
  useEffect(() => {
    if (date) {
      fetchAlarmsForDate(date);
    }
  }, [date]);

    // 읽지 않은 알람의 개수를 계산
    useEffect(() => {
        const unreadAlarms = alarms?.filter((alarm) => !alarm.isRead);  // isRead가 false인 알람 필터링
        setUnreadAlarmCount(unreadAlarms?.length || 0);  // 읽지 않은 알람 개수 업데이트
    }, [alarms]);  // alarms가 업데이트될 때마다 실행

  //날짜 클릭시 해당 날짜 데이터 요청하는 함수
  const fetchAlarmsForDate = async (selectedDate) => {
    try {

      const token = await AsyncStorage.getItem('X-User-Idx');

      console.log('요청 시작');
      const response = await axios.get(`http://54.180.219.236:8000/records/device-type/date`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
            date: selectedDate,
        }
      });

      if (response.status === 200) {
        console.log("데이터", response.data);
        setSelectedDeviceAlarms(response.data); //서버에서 전달한 선택된 날짜의 데이터로 업데이트
      }
    } catch(error) {
      console.error('오류 발생', error);
      Alert.alert('오류','서버와의 통신 문제');
    }
  }

  // 날짜 버튼 눌렀을 때 해당 날짜 요청 가도록
  const handleDateButtonPress = (selectedDay) => {
    const selectedDate = `${year}-${month < 10 ? '0' + month : month}-${selectedDay < 10 ? '0' + selectedDay : selectedDay}`
    setDate(selectedDate);
    console.log(selectedDate);
    setSelectedButton(selectedDay);
  }

  // 각 device 별로 modal 열리도록 
  const openmodal = (devicename) => {
    console.log('Clicked device name:', devicename);
    if (devicename === 'cast' || devicename === 'doorbell') {
        const filteredAlarms = selectedDeviceAlarms.filter(alarm =>
            alarm.deviceType && alarm.deviceType.trim().toLowerCase() === devicename.trim().toLowerCase()
        );

    if (devicename === 'cast') {
        setModalContent('안내방송이 있습니다');
    } else if (devicename === 'doorbell') {
        setModalContent('초인종이 울렸습니다!');
    }
        console.log('Filtered Alarms:', filteredAlarms);
        setDevicetypealarm(filteredAlarms);

        setSttVisible(true); // 얘가 다름
    } else {
        const filteredAlarms = selectedDeviceAlarms.filter(alarm =>
            alarm.deviceType && alarm.deviceType.trim().toLowerCase() === devicename.trim().toLowerCase()
        );

    if (devicename === 'microwave') {
        setModalContent('전자레인지가 완료 됐습니다!');
    } else if (devicename === 'lock') {
        setModalContent('건전지 수명이 얼마 안 남았습니다!');
    } else if (devicename === 'firealarm') {
        setModalContent('화재경보가 발생했습니다!');
    } else if (devicename === 'cooker') {
        setModalContent('취사가 완료 됐습니다!');
    } else if (devicename === 'washer'){
        setModalContent('세탁기/건조기가 완료 됐습니다');
    }
        console.log('Filtered Alarms:', filteredAlarms);
        setDevicetypealarm(filteredAlarms);

        setModalVisible(true);
    }
    choosedevice(devicename);
    console.log(devicetypealarm);
    console.log(modalContent);
    console.log(devicetypealarm?.text);
    console.log(devicetypealarm[0]?.resultTime);
  }

  // 모달 열릴 때 device 데이터 선택
  const choosedevice = (device) => {

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
        case 'cast' :
                setDevicename('안내발송'); 
                setDeviceImage(require('../assets/image/radio.png'));
                break;
        case 'firealarm' :
                setDevicename('화재경보');
                setDeviceImage(require('../assets/image/fire.png'));
                break;
        case 'cooker' :
                setDevicename('밥솥'); 
                setDeviceImage(require('../assets/image/rice.png'));
                break;
        case 'washer' :
                setDevicename('세탁기/건조기'); 
                setDeviceImage(require('../assets/image/washing.png'));
                break;
    }
  }

  useEffect(() => {
    console.log("devicetypealarm updated:", devicetypealarm);
  }, [devicetypealarm]);

  useEffect(() => {
    console.log("modalContent updated:", modalContent);
  }, [modalContent]);

    
    return (
        <View style={styles.container}>
            {/*상단 디자인 */}
            <View style={styles.topDesign}>
            <Test />
                 {/* 상단 버튼들 */}
                <View style={styles.topButtons}>
                    <TouchableOpacity onPress={() => handlebuttonPush(0)}>
                      <Image source={require('../assets/image/home.png')} style={styles.icon} />
                      {unreadAlarmCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadCountText}>{unreadAlarmCount}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlebuttonPush(1)}>
                        <Image source={require('../assets/image/calendar.png')} style={[styles.icon, iconcolor === 1 && { tintColor: '#4A3E8B' }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {() => handleLogout()}>
                        <Image source={require('../assets/image/logout.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.today}>TODAY</Text>
                {/*오늘 날짜*/}
                <Text style={styles.currentDate}>{`${year}년 ${month}월 ${day}일 ${weekday}요일`}</Text>
            </View>

            <View style={styles.daycontainer}>
              {/* Day 1 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day-6 && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day-6)} >
                <Text title="day1" style={[styles.daytext, selectedButton === day-6 && styles.currentday]}>{`${day-6}`}</Text>
              </TouchableOpacity> 
              {/* Day 2 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day-5 && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day-5)} >
                <Text title="day2" style={[styles.daytext, selectedButton === day-5 && styles.currentday]}>{`${day-5}`}</Text>
              </TouchableOpacity> 
              {/* Day 3 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day-4 && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day-4)} >
                <Text title="day3" style={[styles.daytext, selectedButton === day-4 && styles.currentday]}>{`${day-4}`}</Text>
              </TouchableOpacity> 
              {/* Day 4 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day-3 && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day-3)} >
                <Text title="day4" style={[styles.daytext, selectedButton === day-3 && styles.currentday]}>{`${day-3}`}</Text>
              </TouchableOpacity> 
              {/* Day 5 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day-2 && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day-2)} >
                <Text title="day5" style={[styles.daytext, selectedButton === day-2 && styles.currentday]}>{`${day-2}`}</Text>
              </TouchableOpacity> 
              {/* Day 6 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day-1 && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day-1)} >
                <Text title="day6" style={[styles.daytext, selectedButton === day-1 && styles.currentday]}>{`${day-1}`}</Text>
              </TouchableOpacity> 
              {/* Day 7 Button */}
              <TouchableOpacity style={[styles.dayButton, selectedButton === day && styles.dayButtonPressed]} onPress={() => handleDateButtonPress(day)} >
                <Text title="day7" style={[styles.daytext, selectedButton === day && styles.currentday]} onPress={() => handleDateButtonPress(day)}>{`${day}`}</Text>
              </TouchableOpacity> 
            </View>

          {/* 화재경보*/}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('firealarm')}}>
              <Image source={require('../assets/image/fire.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>화재경보</Text>
            </TouchableOpacity>
          </View>

          {/* 초인종 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('doorbell')}}>
              <Image source={require('../assets/image/doorbell.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>초인종</Text>
            </TouchableOpacity>
          </View>

          {/* 안내방송 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('cast')}}>
              <Image source={require('../assets/image/radio.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>안내방송</Text>
            </TouchableOpacity>
          </View>

          {/* 도어락 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('lock')}}>
              <Image source={require('../assets/image/lock.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>도어락</Text>
            </TouchableOpacity>
          </View>

          {/* 세탁기건조기 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('washer')}}>
              <Image source={require('../assets/image/washing.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>세탁기 & 건조기</Text>
            </TouchableOpacity>
          </View>

          {/* 전자레인지 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('microwave')}}>
              <Image source={require('../assets/image/microwave.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>전자레인지</Text>
            </TouchableOpacity>
          </View>

          {/* 밥솥 */}
          <View style={styles.alramcontainer}>
            <TouchableOpacity style={styles.unread} onPress={() => {openmodal('cooker')}}>
              <Image source={require('../assets/image/rice.png')} style={styles.deviceImage} />
              <Text style={styles.deviceText}>밥솥</Text>
            </TouchableOpacity>
          </View>



          <Alrammodal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            allalarms={devicetypealarm}
            deviceImage={deviceImage}
            devicename={devicename}
            time={devicetypealarm?.resultTime}
            device={devicetypealarm[0]?.deviceType}
            modalContent={modalContent}
          />

          <Sttmodal
            visible={sttVisible}
            onClose={() => setSttVisible(false)}
            allalarms={devicetypealarm}
            deviceImage={deviceImage}
            devicename={devicename}
            time={devicetypealarm?.resultTime}
            device={devicetypealarm?.deviceType}
            modalContent = {modalContent}
            sttContent={devicetypealarm?.text}
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
          marginLeft: 258,
          marginTop: 25,
          width: 70
        },
        icon: {
          width: 25,
          height: 25,
          marginLeft: 10,
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
      },

      dayButtonPressed: {
          backgroundColor: '#4A3E8B', // 눌렸을 때 변경되는 스타일
      },
      unreadBadge: {
              position: 'absolute',
              top: -5,
              right: -5,
              width: 15,
              height: 15,
              backgroundColor: '#4A3E8B',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
      },
      unreadCountText: {
              color: '#fff',
              fontSize: 8,
              fontWeight: 'bold',
      },

})

export default Calendar;