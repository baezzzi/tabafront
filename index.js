import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import main from './screen/main'; 
import signin from './screen/signin'; 
import signup from './screen/signup';
import Base2 from './screen/Base2';
import { name as appName } from './app.json'; 
import calendar from './screen/calendar';
import Alrammodal from './screen/Alrammodal';
import Alramcontent from './screen/Alramcontent';
import { AlarmContext } from './screen/Alarmcontext';
import { AlarmProvider } from './screen/Alarmcontext';

const Stack = createStackNavigator();

const Index = () => {

  
  return (
    <AlarmProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="main">
          <Stack.Screen name="main" component={main} options={{ headerShown: false }} />
          <Stack.Screen name="signin" component={signin} options={{ headerShown: false }} />
          <Stack.Screen name="signup" component={signup} options={{ headerShown: false}} />
          <Stack.Screen name="calendar" component={calendar} options={{ headerShown: false}} />
          <Stack.Screen name="Base2" component={Base2} options={{ headerShown : false}} />
          <Stack.Screen name="modal" component={Alrammodal} options={{ headerShown : false}} />
          <Stack.Screen name="Arlamcontent" component={Alramcontent} options={{ headerShown : false}} />
          <Stack.Screen name="Alramcontext" component={AlarmContext} options={{ headerShown : false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlarmProvider>
  ); 
};

// AppRegistry 등록
AppRegistry.registerComponent(appName, () => Index);

export default Index;

import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import main from './screen/main'; 
import signin from './screen/signin'; 
import signup from './screen/signup';
import Base2 from './screen/Base2';
import { name as appName } from './app.json'; 
import calendar from './screen/calendar';
import Alrammodal from './screen/Alrammodal';
import Alramcontent from './screen/Alramcontent';
import { AlarmContext } from './screen/Alarmcontext';
import { AlarmProvider } from './screen/Alarmcontext';

import messaging, { getToken } from '@react-native-firebase/app';

const Stack = createStackNavigator();

const Index = () => {

  messaging().setBackgroundMessageHandler(async msg => {
    console.log(msg);
  })

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if(enabled) {
      return getToken();
    }
  };

  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('디바이스 토큰값');
    console.log(fcmToken);
    dispatch(set_deviceToken(fcmToken));
  };

  return (
    <AlarmProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="main">
          <Stack.Screen name="main" component={main} options={{ headerShown: false }} />
          <Stack.Screen name="signin" component={signin} options={{ headerShown: false }} />
          <Stack.Screen name="signup" component={signup} options={{ headerShown: false}} />
          <Stack.Screen name="calendar" component={calendar} options={{ headerShown: false}} />
          <Stack.Screen name="Base2" component={Base2} options={{ headerShown : false}} />
          <Stack.Screen name="modal" component={Alrammodal} options={{ headerShown : false}} />
          <Stack.Screen name="Arlamcontent" component={Alramcontent} options={{ headerShown : false}} />
          <Stack.Screen name="Alramcontext" component={AlarmContext} options={{ headerShown : false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AlarmProvider>
  ); 
};

// AppRegistry 등록
AppRegistry.registerComponent(appName, () => Index);

export default Index;
