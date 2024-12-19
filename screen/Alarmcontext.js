import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

// FCMContext import
import { FCMContext } from './FCMContext';

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
    const [alarms, setAlarms] = useState([]);
    const [allalarms, setAllalarms] = useState([]);

    const [devicename, setDevicename] = useState('');
    const [deviceImage, setDeviceImage] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [time, setTime] = useState('');
    const [device, setDevice] = useState('');
    // isHuman = true면 여기다가 데이터 넣는 거임
    const [sttContent, setSttContent] = useState('');
    const [idx, setIdx] = useState('');
    const [requestday, setRequestday] = useState('');
    const [isRead, setIsRead] = useState(false);

    // 알림 추가
    const addAlarm = (alarm) => {
        setAlarms((prevAlarms) => [...prevAlarms, alarm]);
        setAllalarms((prevAllalarms) => [...prevAllalarms, alarm]);
    };

    // 확인 알람 제거
    const removeAlarm = (id) => {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id));
    };

    // 모든 알람 제거
    const clearAlarm = () => {
        setAlarms([]);
    }

    // 디바이스별 설정
    const choosedevice = (result, recordIdx, text) => {

        console.log("초기값 설정완료");

        // 새로운 알람 변수 초기화
        let Newdevicename = '';
        let NewdeviceIamge = null;
        let NewmodalContent = '';
        let Newdevice = '';

        switch(result) {
            case 'doorbell' :
                    Newdevicename = '초인종';
                    NewdeviceIamge = require('../assets/image/doorbell.png');
                    NewmodalContent = '초인종이 울렸습니다!';
                    Newdevice = 'doorbell';
                    break;
            case 'lock' :
                    Newdevicename = '도어락';
                    NewdeviceIamge = require('../assets/image/lock.png');
                    NewmodalContent = '건전지 수명이 얼마 안 남았습니다!';
                    Newdevice = 'lock';
                    break;
            case 'microwave' :
                    Newdevicename = '전자레인지';
                    NewdeviceIamge = require('../assets/image/microwave.png');
                    NewmodalContent = '전자레인지가 완료 됐습니다!';
                    Newdevice = 'microwave';
                    break;
            case 'cast' :
                    Newdevicename = '안내방송';
                    NewdeviceIamge = require('../assets/image/radio.png');
                    NewmodalContent = '안내방송이 있습니다';
                    Newdevice = 'cast';
                    break;
            case 'refrigerator' :
                    Newdevicename = '냉장고';
                    NewdeviceIamge = require('../assets/image/refrigerator.png');
                    NewmodalContent = '냉장고 문이 열려있습니다';
                    Newdevice = 'refrigerator';
                    break;
            case 'cooker' :
                    Newdevicename = '밥솥';
                    NewdeviceIamge = require('../assets/image/rice.png');
                    NewmodalContent = '취사가 완료 됐습니다!';
                    Newdevice = 'cooker';
                    break;
            case 'washer' :
                    Newdevicename = '세탁기/건조기';
                    NewdeviceIamge = require('../assets/image/washing.png');
                    NewmodalContent = '세탁기/건조기가 완료 됐습니다';
                    Newdevice = 'washer';
                    break;
        }

        const currentTime = new Date().toLocaleTimeString();
        // 날짜 요청을 위한 값들
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();

//        setTime(currentTime);
        setDevicename(Newdevicename);
        setDeviceImage(NewdeviceIamge);
        setModalContent(NewmodalContent);
        setDevice(Newdevice);
        setRequestday(`${year}-${month}-${day}`)
        setIsRead(false);

        const newAlram = {
            id : recordIdx,
            devicename : Newdevicename,
            deviceImage : NewdeviceIamge,
            modalContent : NewmodalContent,
            time : currentTime,
            device : Newdevice,
            sttContent : text,
            requestday: `${year}-${month}-${day}`,
            isRead : false,
        }

        addAlarm(newAlram);
    }

    // FCM 메세지 넘어왔을 때 처리 로직
    const handleFCMmessage = (data) => {

        console.log(data);
        const { recordIdx, result, isHuman, text } = data;
        console.log(data.recordIdx);
        console.log(data.result);
        console.log(isHuman);
        console.log(text);

        if (isHuman === "true") {
            setSttContent(text);
            setIdx(recordIdx);
        } else {
            setIdx(recordIdx);

        }
        choosedevice(result, recordIdx, text);
    }

    console.log('[+]모든 알람 : ', allalarms);
    return (
        <AlarmContext.Provider value={{ isRead,handleFCMmessage, alarms, setAlarms, allalarms, setAllalarms, addAlarm, removeAlarm, clearAlarm, deviceImage, devicename, modalContent, time, sttContent,
         }}>
            {children}
        </AlarmContext.Provider>
    );
};


// useAlarmContext 훅을 사용하여 AlarmContext에 접근
export const useAlarmContext = () => {
  return useContext(AlarmContext);
};