import React from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

const Signup = ({ navigation }) => {

    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const [check_pw, setCheck_pw] = useState('');
    const [newaccount, setNewaccount] = useState();
    const [pwerror, setPwerror] = useState('');


    const handleSignup = async () => {
        try {
            const response = await fetch("https://apiaddress/members/sign-up", {
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    passwd: passwd,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                Alert.alert("회원가입 성공", "계정 생성 성공~!", [
                    { text : '확인', onPress: () => navigation.navigate('signiin') },
                ]);
            } else {
                Alert.alert("회원가입 실패", result.message || '문제 발생');
            }
        } catch (error) {
            console.error("회원가입 오류", error);
            Alert.alert('오류', '서버와의 통신에 실패했습니다.');
        }
    }
    //비밀번호 확인
    const CheckPassword = (value) => {
        setCheck_pw(value);
        if (passwd === value) {
            setPwerror();
            setNewaccount(true);
        } else {
            setPwerror("비밀번호가 일치하지 않습니다.");
            setNewaccount(false);
        }
    };
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='아이디 입력'
                placeholderTextColor="#878787"
                secureTextEntry={false} 
                textAlign='center'
                value={id}
                onChangeText={setId}
            />
            <TextInput
                style={styles.input}
                placeholder='비밀번호 입력'
                placeholderTextColor="#878787"
                secureTextEntry={false} 
                textAlign='center'
                value={passwd}
                onChangeText={setPasswd}
            />
            <TextInput
                style={styles.input}
                placeholder='비밀번호 확인'
                placeholderTextColor="#878787"
                secureTextEntry={false} 
                textAlign='center'
                value={check_pw}
                onChangeText={CheckPassword}
            />
            <TouchableOpacity 
                style={[styles.button, newaccount ? styles.buttonEnable : styles.buttonDisabled]} 
                disabled={!newaccount}
                onPress={() => handleSignup}
            >
                <Text style={[styles.buttonText, !newaccount && styles.buttonTextDisabled]}>회원가입</Text>
            </TouchableOpacity>
            {/* 비밀번호 에러가 있을 때 표시 */}
            {pwerror !== '' && (
                <Text style={styles.pwerror_text}>{pwerror}</Text>
            )}
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
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 6,
      },
      buttonEnable: {
        backgroundColor: '#FFFFFF', // 버튼 배경 색
      },
      buttonDisabled: {
        backgroundColor: '#FFFFFF'
      },
      buttonText: {
        color: '#8470D5', // 버튼 텍스트 색상 (purple)
        fontSize: 14,
        fontWeight: '600',
      },
      buttonTextDisabled: {
        color: "#F2EFF8"
      },

      pwerror_text: {
        fontSize: 15,
        color: "#8470D5"
      }
})

export default Signup;