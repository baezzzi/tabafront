import React, { useEffect } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Modal, Button } from 'react-native';
import { useState, useContext } from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


import axios from 'axios';

import Alramcontent from './Alramcontent';
import { AlarmContext } from './Alarmcontext';
import { FCMContext } from './FCMContext';
import { FlatList } from 'react-native-gesture-handler';
import Test from './test';

const Base2 = ( { navigation } ) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const week = [ '일', '월', '화', '수', '목', '금', '토'];
    const weekday = week[currentDate.getDay()];

    const [modalVisible, setModalVisible] = useState(false);
    const [settingmodalVisible, setSettingmodalVisible] = useState(false);
    const [iconnum, setIconnum] = useState(0);
    const [iconcolor, setIconcolor] = useState(1);

    const [unreadAlarmCount, setUnreadAlarmCount] = useState(0);

    // 선택한 알람 내용으로 출력
    const [selectedAlarm, setSelectedAlarm] = useState(null);

    const [noalarm, setNoalarm] = useState('');

    const getToken = async () => {
        // token 가져오기
        const userToken = await AsyncStorage.getItem('X-User-Idx');
        console.log(userToken);
    };

    const { allalarms, alarms, clearAlarm, removeAlarm, deviceImage, devicename, modalContent, time, isRead, sttContent } = useContext(AlarmContext);

    console.log('Base2 실행 ');
    console.log(allalarms);

    // 읽지 않은 알람의 개수를 계산
    useEffect(() => {
        const unreadAlarms = alarms?.filter((alarm) => !alarm.isRead);  // isRead가 false인 알람 필터링
        setUnreadAlarmCount(unreadAlarms?.length || 0);  // 읽지 않은 알람 개수 업데이트
        if (unreadAlarmCount === 0) {
            setNoalarm('미확인 알람이 없습니다!');
        } else {
            setNoalarm('');
        }
    }, [alarms, unreadAlarmCount]);  // alarms가 업데이트될 때마다 실행

    // 아이콘 눌렀을 때 리디렉션, 색지정
    const handlebuttonPush = (iconnum) => {
        if (iconnum === 0) {
            navigation.navigate('Base2');
            setIconcolor(1);
        } else if (iconnum === 1) {
            navigation.navigate('calendar');
        }
    }

    // 알람 확인하면 checked 전송
    const readAlarms = async (id) => {
        removeAlarm(id);

        try {
            const token = await AsyncStorage.getItem('X-User-Idx');
            console.log(token);

            // axios 요청 
            const response = await axios.post(
                `http://54.180.219.236:8000/records/${id}/checked`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            console.log('서버 응답', response.data);

        } catch (error) {
            console.log('서버 요청 실패', error);
            Alert.alert('오류', '서버 통신 중 오류 발생');
        }
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

    // 읽지 않은 알람이 있는지 확인하는 함수
    const hasUnreadAlarms = alarms?.some((alarm) => !alarm.isRead);



    return (
        <View style={styles.container}>
            {/*상단 디자인 */}
            <View style={styles.topDesign}>
            <Test />
                <View style={styles.topButtons}>
                    <TouchableOpacity onPress={() => {handlebuttonPush(0)}}>
                      <Image source={require('../assets/image/home.png')}
                             style={[styles.icon, iconcolor === 1 &&  { tintColor: '#4A3E8B' }]} />
                             {unreadAlarmCount > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadCountText}>{unreadAlarmCount}</Text>
                                </View>
                             )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handlebuttonPush(1)}}>
                        <Image source={require('../assets/image/calendar.png')}
                               style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLogout()}>
                        <Image source={require('../assets/image/logout.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.today}>TODAY</Text>
                <Text style={styles.currentDate}>{`${year}년 ${month}월 ${day}일 ${weekday}요일`}</Text>
            </View>

            <Text style={styles.unreadalram}>미확인알림</Text>
            <Text style={styles.noalarm}>{noalarm}</Text>


            <View style={{ height: 460, marginHorizontal: 10 }}>
                <FlatList
                    data={alarms || []}
                    keyExtractor={(item) => item.id?.toString() || 'default-key'}
                    renderItem={({ item }) =>
                    <TouchableOpacity style={styles.unread} onPress={() => { setSelectedAlarm(item); setModalVisible(true) }}>
                        <Image source={item.deviceImage} style={styles.deviceimage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.devicename}>{item.devicename}</Text>
                            <Text style={styles.modalcontent}>{item.modalContent}</Text>
                        </View>
                        <Text style={styles.time2}>{item.time}</Text>
                        <TouchableOpacity style={styles.checkButton} onPress={() => readAlarms(item.id)}>
                            <Text style={styles.checkButtonText}>확인</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    }
                    contentContainerStyle={{ paddingBottom: 10 }}
                    style={{ flex: 1, marginTop: 10 }}
                />
            </View>


            <TouchableOpacity style={styles.checkAll} onPress={clearAlarm}>
                <Text style={styles.checkAllText}>전부 확인</Text>
            </TouchableOpacity>

            <Alramcontent
                    visible={modalVisible}
                    onClose={() => {setModalVisible(false); setSelectedAlarm(null);}}
                    content={selectedAlarm?.modalContent}
                    devicename={selectedAlarm?.devicename}
                    deviceImage={selectedAlarm?.deviceImage}
                    time={selectedAlarm?.time}
                    sttContent={selectedAlarm?.sttContent}
            />
        </View>
    
    )};

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
        marginBottom: 20,
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
    unreadalram: {
        width: 130,
        height: 26,
        backgroundColor: "#4A3E8B",
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 12,
        color: '#FFFFFF',
        justifyContent: 'center',
        position: 'absolute',
        top: 121,
        left: 130,
        fontFamily: 'cafe24ssurroundair',
        lineHeight: 28,
    },
    checkButton: {
        width: 48,
        height: 35,
        borderRadius: 10, // 버튼의 둥근 모서리
        backgroundColor: '#4A3E8B', // 배경색
        alignItems: 'center', // 텍스트 가운데 정렬
        justifyContent: 'center', // 텍스트 가운데 정렬
    },
    checkButtonText: {
        color: "#FFFFFF",
        fontFamily: 'cafe24ssurroundair',
        fontSize: 10,
    },checkAll: {
        width: 300,
        height: 45,
  
        borderRadius: 15,
        backgroundColor: '#4A3E8B', // darkpurple
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 640,
      },
      checkAllText: {
        fontFamily: 'cafe24ssurroundair',
        fontSize: 12,
        color: '#FFFFFF',
      },
      unread: {
        width: 300,
        height: 70,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4A3E8B',
        flexDirection: 'row',
        paddingHorizontal: 18,
        marginTop: 20,
      }, 
      devicename: {
        justifyContent: 'center',
        textAlign: 'left',
        fontsize: 15,
        fontFamily: 'cafe24ssurround',
        color: '#4A3E8B',
      },
    modalcontent: {
        fontFamily: 'cafe24ssurroundair',
        fontSize: 11,
        color: '#A9A9A9', // gray
        textAlign: 'left',
        marginTop: 7,
      },
    textContainer: {
        flexDirection: 'column', // 텍스트를 위아래로 배치
        marginLeft: 10, // 텍스트와 아이콘 간의 여백
        flex: 1, // 텍스트 영역을 유연하게 확장
    },
    deviceimage: {
        width : 15,
        height: 15,
        marginBottom: 18,
    },
    bottomdesign: {
        width: '100%',
        height: 100,
        backgroundColor: '#F2EFF8'
    },
    test: {
    backgroundColor: '#0000000'},
    icon2 : {
    },
    time2 : {
        color: '#4A3E8B',
        fontFamily: 'cafe24ssurroundair',
        fontSize: 10,
        position: 'absolute',
        top: 18,
        right: 90,
    },
    unreadBadge: {
          position: 'absolute',
          top: -5,
          right: -5,
          width: 15,
          height: 15,
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
    },
    unreadCountText: {
        color: '#4A3E8B',
        fontSize: 8,
        fontWeight: 'bold',
    },
    noalarm: {
        color:'#4A3E8B',
        fontSize: 14,
        fontFamily: 'cafe24ssurroundair',
        position: 'absolute',
        top: 360,
    }
})
export default Base2;