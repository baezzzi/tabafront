import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

  const Main = ( { navigation } ) => {
    return (
      <View style={styles.container}>
        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signin') }>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

        {/* 회원가입 버튼 */}
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('signup') }}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2EFF8', // lightpurple 색상
    },
    button: {
      width: 150,
      height: 43,
      backgroundColor: '#FFFFFF', // 버튼 배경색 (배경색을 흰색으로 설정)
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5, // 버튼 간격 조정
      borderRadius: 20, // 모서리를 둥글게
    },
    buttonText: {
      color: '#8470D5', // 버튼 텍스트 색상 (purple)
      fontSize: 14,
      fontWeight: '600',
    },
  });

  export default Main;
