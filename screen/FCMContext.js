import React, { createContext, useState, useEffect, useContext} from 'react';
import messaging from '@react-native-firebase/messaging';
import { Modal, View, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform, Vibration } from 'react-native';

// Alarmcontext 호출 (handleFCMmessage 사용 위해서)
import { AlarmContext } from './Alarmcontext';

export const FCMContext = createContext();

export const FCMProvider = ({ children }) => {
  const [fcmToken, setFcmToken] = useState("");
  const { handleFCMmessage } = useContext(AlarmContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getFcmToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Context [+] FCM Token:', token);
      setFcmToken(token);
    };

    getFcmToken();

    initializeFCM();

    requestNotificationPermission();

    // foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        try {
          console.log('완료');
          console.log(remoteMessage);
          await onMessageReceived(remoteMessage);

//          toastalarm(remoteMessage);
        } catch (error) {
          console.error("[-] 메시지 처리 중 오류:", error);
        }
    });


    // background
    const back = messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("[+] 배경 상태에서 메시지 수신:", remoteMessage);
    });

    // quit
    const quit = messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log("[+] 앱이 종료된 상태에서 푸시 알림을 받았습니다:", remoteMessage);
          }
    });

  }, []);

  // FCM 초기화, 리스너 등록
  const initializeFCM = () => {
    // 토근 가져왕, 토큰 가져오면 리스너 등록하는겨
    console.log("[+] FCM 메시지 리스너가 등록되었습니다!");

    // background | quit 알람 클릭 할 때
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log("[+] 앱이 백그라운드에서 열렸습니다:", remoteMessage);
        await onMessageReceived(remoteMessage);
    });

    return () => {
        console.log("[-] FCM 메시지 리스너가 해제되었습니다!");
        unsubscribe();
    };
  };

  const onMessageReceived = async (remoteMessage) => {
    console.log("[+] onMessageReceived 동작");

    // 진동 발생

    if (remoteMessage.notification?.body === 'firealarm에 대한 알림이 도착했습니다!') {
        firealarmVibration();
    }
    triggerVibration();

    if (handleFCMmessage) {
        handleFCMmessage(remoteMessage.data);
    }
  }

  const firealarmVibration = () => {
    const vibrationPattern = [0, 1000, 100, 1000];
    Vibration.vibrate(vibrationPattern, true); // 진ㄴ동 무한반복
  }
  const triggerVibration = () => {
      const vibrationPattern = [0, 500, 500, 500];// 대기, 진동, 대기, 진동 (밀리초 단위)
//      Vibration.cancel(); // 현재 실행 중인 진동을 멈춤
    };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: '알림 권한 요청',
            message: '앱에서 알림을 보내기 위해 권한이 필요합니다.',
            buttonPositive: '허용',
            buttonNegative: '거부',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('알림 권한 허용됨');
        } else {
          console.log('알림 권한 거부됨');
        }
      } catch (err) {
        console.warn('알림 권한 요청 오류:', err);
      }
    }
  };

  return (
    <FCMContext.Provider value={{ fcmToken, onMessageReceived }}>
      {children}
    </FCMContext.Provider>
  );
};
