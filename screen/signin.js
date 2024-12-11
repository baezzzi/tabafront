import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const Signin = ( { navigation }) => {

  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');

  const handleSignin = async () =>{
    try {
      const response = await fetch('https://url/members/sign-in', {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
          id : id,
          passwd : passwd
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('로그인 성공', [
          {text : '확인', onPress: () => navigation.navigate('Base2') },
        ]);
        console.log(id, passwd);
      } else {
        Alert.alert('로그인 실패', result.message);
      }
    } catch (error) {
      console.log('로그인 오류', error);
      Alert.alert('로그인 실패 햇삼~');
    }
  };

  return (
    <View style={styles.container}>
      {/* 아이디 입력 */}
      <TextInput
        value={id}
        onChangeText={setId}
        style={styles.input}
        placeholder="아이디 입력"
        placeholderTextColor="#878787"
        secureTextEntry={false} 
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
