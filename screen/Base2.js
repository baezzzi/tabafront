import React, { useEffect } from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Modal } from 'react-native';
import { useState, useContext } from 'react';

import Alramcontent from './Alramcontent';
import { AlarmContext } from './Alarmcontext';
import { FlatList } from 'react-native-gesture-handler';

const Base2 = ( { navigation } ) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const week = [ '일', '월', '화', '수', '목', '금', '토'];
    const weekday = week[currentDate.getDay()];

    const [modalVisible, setModalVisible] = useState(false);
    const [devicename, setDevicename] = useState('');
    const [deviceImage, setDeviceImage] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [time, setTime] = useState('');

    const { alarms, addAlarm, removeAlarm, clearAlarm} = useContext(AlarmContext);

    useEffect(() => {

        choosedevice('rice');
        setTime('21시');
        const socket = new WebSocket('ws://url');

        socket.onopen = () => {
            console.log("소켓 연결됨");
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            choosedevice(message.device, message.sendtime);
        };

        socket.onclose = () => {
            console.log("소켓 종료");
        };

        return () => {
            socket.close();
        };

    }, []);

    const readAlarms = (id) => {
        removeAlarm(id);
    }

    const choosedevice = (device, sendtime) => {

        const currentTime = new Date().getTime();
        
        let devicename = 'rice';
        let deviceImage = require('../assets/image/rice.png');
        let modalContent = '도어락 건전지 교체 요망.';
        console.log("초기값 설정완료");

        switch(device) {
            case 'doorbell' : 
                    setDevicename('초인종')  ; 
                    setDeviceImage(require('../assets/image/doorbell.png'));
                    setModalContent('초인종이 울렸습니다!');
                    break;
            case 'lock' : 
                    setDevicename('도어락'); 
                    setDeviceImage(require('../assets/image/lock.png'));
                    setModalContent('건전지 수명이 얼마 안 남았습니다!');
                    break;
            case 'microwave' : 
                    setDevicename('전자레인지'); 
                    setDeviceImage(require('../assets/image/microwave.png'));
                    setModalContent('전자레인지가 완료 됐습니다!');
                    break;
            case 'radio' : 
                    setDevicename('안내발송'); 
                    setDeviceImage(require('../assets/image/radio.png'));
                    setModalContent('안내방송이 있습니다');
                    break;
            case 'refrigerator' : 
                    setDevicename('냉장고'); 
                    setDeviceImage(require('../assets/image/refrigerator.png'));
                    setModalContent('냉장고 문이 열려있습니다');
                    break;
            case 'rice' : 
                    setDevicename('밥솥'); 
                    setDeviceImage(require('../assets/image/rice.png'));
                    setModalContent('취사가 완료 됐습니다');
                    break;
            case 'washing' : 
                    setDevicename('세탁기/건조기'); 
                    setDeviceImage(require('../assets/image/washing.png'));
                    setModalContent('세탁기/건조기가 완료 됐습니다'); 
                    break;
        }

        const newAlram = {
            id : `${devicename}_${currentTime}`,
            devicename,
            deviceImage,
            modalContent,
            time : sendtime,
        }

        addAlarm(newAlram);
    }

    return (
        <View style={styles.container}>
            {/*상단 디자인 */}
            <View style={styles.topDesign}>
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
                <Text style={styles.currentDate}>{`${year}년 ${month}월 ${day}일 ${weekday}요일`}</Text>
            </View>

            <Text style={styles.unreadalram}>미확인알림</Text>

            <View style={{ height: 460, marginHorizontal: 10 }}> {/* 높이를 300으로 제한 */}
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                <TouchableOpacity
                    style={styles.unread}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Image source={item.deviceImage} style={styles.deviceimage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.devicename}>{item.devicename}</Text>
                        <Text style={styles.modalcontent}>{item.modalContent}</Text>
                    </View>
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
                onClose={() => setModalVisible(false)}
                content={modalContent}
                devicename={devicename}
                deviceImage={deviceImage}
                time={'11시'}
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
          marginLeft: 290,
          marginTop: 25,
          width: 65
    },
    icon: {
        width: 25,
        height: 25,
    },
    unreadalram: {
        width: 100,
        height: 24,
        backgroundColor: "#4A3E8B",
        borderRadius: 20,
        textAlign: 'center',
        fontsize: 10,
        color: '#FFFFFF',
        justifyContent: 'center',
        position: 'absolute',
        top: 125,
        left: 150,
        fontFamily: 'cafe24ssurroundair',
        lineHeight: 25,
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
    }
})
export default Base2;