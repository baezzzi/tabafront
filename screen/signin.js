import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { FCMContext } from './FCMContext';

const Signin = ( { navigation }) => {

  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');

  // fcmToken 가져오는 거얌 얘는 푸시알람을 위한 토큰
  const { fcmToken } = useContext(FCMContext);

  const handleSignin = async () => {
    try {
      console.log('로그인 요청');
      const response = await axios.post('http://54.180.219.236:8000/members/sign-in', {
        username : id,
        password : passwd,
        fcmtoken : fcmToken
      })

      if (response.status === 200) {
        // 얘는 인증을 위한 토큰
        const token = response.data.token;
        await AsyncStorage.setItem('X-User-Idx', token); // 토큰 저장ㅇ
        console.log('X-User-Idx: ', token);
        
        Alert.alert('로그인 성공', response.data.message, [
          {text : '확인', onPress: () => navigation.navigate('Base2') },
        ]);
      }
    } catch (error) {
      console.error('로그인 오류', error.response?.data || error.message);
      Alert.alert('오류', error.response?.data || '서버와의 문제');
    } finally {
      navigation.navigate('Base2');
    }
  }

  return (
    <View style={styles.container}>
      {/* 아이디 입력 */}
      <TextInput
        value={id}
        onChangeText={setId}
        style={styles.input}
        placeholder="아이디 입력"
        placeholderTextColor="#878787"
        textAlign='center'
      />

      {/* 비밀번호 입력 */}
      <TextInput
        value={passwd}
        onChangeText={setPasswd}
        style={styles.input}
        placeholder="비밀번호 입력"
        placeholderTextColor="#878787"
        secureTextEntry={true}
        textAlign='center'
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.rowContainer}>
        {/* 아이디 찾기 */}
        <TouchableOpacity>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>

        {/* 비밀번호 찾기 */}
        <TouchableOpacity>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EFF8', // lightpurple 색상
    padding: 20,
  },
  input: {
    width: 270,
    height: 50,
    backgroundColor: '#9D90DF50', // 입력창 배경 색
    borderRadius: 20,
    paddingLeft: 15,
    marginVertical: 10,
    fontSize: 13,
    marginVertical: 6,
    paddingHorizontal: 20,
  },
  button: {
    width: 270,
    height: 50,
    backgroundColor: '#FFFFFF', // 버튼 배경 색
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 6,
  },
  buttonText: {
    color: '#8470D5', // 버튼 텍스트 색상 (purple)
    fontSize: 14,
    fontWeight: '600',
  },
  rowContainer: {
    flexDirection: 'row', // 내부 요소를 가로로 정렬
    justifyContent: 'space-between', // 요소 간 간격 조정
    alignItems: 'center', // 세로 가운데 정렬
    marginTop: 3,
    width: 155, // 원하는 너비 설정
  },
  linkText: {
    color: '#878787', // 링크 텍스트 색상 (gray)
    fontSize: 13,
    marginTop: 5,
    textDecorationLine: 'underline'
  },
});

export default Signin;
