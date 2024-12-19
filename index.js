import React, { useEffect, useState, useContext } from 'react';
import { AppRegistry, Button } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import main from './screen/main';
import signin from './screen/signin';
import signup from './screen/signup';
import Base2 from './screen/Base2';
import calendar from './screen/calendar';
import Alrammodal from './screen/Alrammodal';
import Sttmodal from './screen/Sttmodal';
import Alramcontent from './screen/Alramcontent';
import { AlarmProvider } from './screen/Alarmcontext';
import SttContent from './screen/SttContent';
import { FCMProvider } from './screen/FCMContext';
import { AlarmContext } from './screen/Alarmcontext';
import { FCMContext } from './screen/FCMContext';

import Test from './screen/test';

import { name as appName } from './app.json';

const Stack = createStackNavigator();

AppRegistry.registerComponent(appName, () => {
    return () => (
        <AlarmProvider>
            <FCMProvider>
                <Index />
            </FCMProvider>
        </AlarmProvider>
    )
});

const Index = () => {

    const { onMessageReceived } = useContext(FCMContext);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [initialRoute, setInitialRoute] = useState("main");

//    // 스플래시 hiding
//    useEffect(() => {
//        // 앱이 로딩된 후 스플래시 화면을 숨깁니다.
//        SplashScreen.hide();
//    }, []);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userToken = await AsyncStorage.getItem('X-User-Idx');
                console.log(userToken);
                setIsLoggedIn(!!userToken);
                console.log('isLoggedIn', isLoggedIn);
                if (userToken) {
                    setInitialRoute("Base2");  // 로그인되어 있으면 Base2 이동
                } else {
                    setInitialRoute("main");  // 로그인 안되어 있으면 main 이동
                }
            } catch (error) {
                console.error("Error checking login status: ", error);
            }
        };

        checkLoginStatus();
    }, []);

    // background message handler 등록
    useEffect(() => {

        messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('헤드리스 태스크에서 메시지 수신:', remoteMessage);
        onMessageReceived(remoteMessage.data);
        });
    }, []);

    // 로그인 상태가 확인되었을 때 화면 전환
    if (isLoggedIn === null) {
         // 아직 로그인 상태를 확인하지 않았으면 로딩 화면을 보여줍니다.
         return null;
    }

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="main" component={main} options={{ headerShown: false }} />
          <Stack.Screen name="signin" component={signin} options={{ headerShown: false }} />
          <Stack.Screen name="signup" component={signup} options={{ headerShown: false }} />
          <Stack.Screen name="calendar" component={calendar} options={{ headerShown: false }} />
          <Stack.Screen name="Base2" component={Base2} options={{ headerShown: false }} />
          <Stack.Screen name="modal" component={Alrammodal} options={{ headerShown: false }} />
          <Stack.Screen name="Arlamcontent" component={Alramcontent} options={{ headerShown: false }} />
          <Stack.Screen name="Sttmodal" component={Sttmodal} options={{ headerShown : false }} />
          <Stack.Screen name="SttContent" component={SttContent} options={{ headerShown : false }} />
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>

  );
};

//export default Index;
