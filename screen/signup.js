import React from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';

const Signup = ({ navigation }) => {

    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');
    const [check_pw, setCheck_pw] = useState('');
    const [newaccount, setNewaccount] = useState();
    const [pwerror, setPwerror] = useState('');

    // 플레이스홀더 상태 추가
    const [idPlaceholder, setIdPlaceholder] = useState('아이디 입력');
    const [pwPlaceholder, setPwPlaceholder] = useState('비밀번호 입력');


    const handleSignup = async () => {
        CheckId(id);
        pwpolicy(passwd);
        try {
            //백엔드랑 dto 확인
            const response = await axios.post("http://54.180.219.236:8000/members/sign-up", {
                    username: id,
                    password: passwd,
            });

            if (response.status === 200) {
                Alert.alert('회원가입 성공~', response.data.message, [
                    {text : '확인', onPress: () => navigation.navigate('signin') },
                ]);
            }
        } catch (error) {
            console.error("회원가입 오류", error.response?.data || error.message);
            Alert.alert('오류', error.response?.data || '서버와의 통신에 실패했습니다.');
        }
    }
    //비밀번호 확인
    const CheckPassword = (value) => {
        setCheck_pw(value);
        if (passwd === value) {
            setPwerror('');
            setNewaccount(true);
        } else {
            setPwerror("비밀번호가 일치하지 않습니다.");
            setNewaccount(false);
        }
    };

    const CheckId = (value) => {
        // 아이디가 6글자 이상이고 영어+숫자 조합인지 확인하는 정규식
        const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;

        if (idRegex.test(value)) {
            return true;
        } else {
            Alert.alert("아이디는 6글자 이상, 영어+숫자 조합이어야 합니다.");
            return false;
        }
    };

    const pwpolicy = (value) => {
        const pwRegex= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;

        if(pwRegex.test(value)) {
            return true;
        } else {
            Alert.alert("비밀번호는 9글자 이상 15글자 이하, 영어+숫자 조합이어야 합니다.");
            return false;
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={idPlaceholder}
                placeholderTextColor="#878787"
                secureTextEntry={false} 
                textAlign='center'
                value={id}
                onChangeText={setId}
                onFocus={() => setIdPlaceholder('영어+숫자 4글자 이상')}
                onBlur={() => setIdPlaceholder('아이디 입력')}
            />
            <TextInput
                style={styles.input}
                placeholder={pwPlaceholder}
                placeholderTextColor="#878787"
                secureTextEntry={true} 
                textAlign='center'
                value={passwd}
                onChangeText={setPasswd}
                onFocus={() => setPwPlaceholder('영어+숫자 9글자 이상')}
                onBlur={() => setPwPlaceholder('비밀번호 입력')}
            />
            <TextInput
                style={styles.input}
                placeholder='비밀번호 확인'
                placeholderTextColor="#878787"
                secureTextEntry={true} 
                textAlign='center'
                value={check_pw}
                onChangeText={CheckPassword}
            />
            <TouchableOpacity 
                style={[styles.button, newaccount ? styles.buttonEnable : styles.buttonDisabled]} 
                disabled={!newaccount}
                onPress={handleSignup}
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