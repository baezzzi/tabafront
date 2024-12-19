import React, { useContext, useState, useEffect } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import SttContent from './SttContent';
import { Alarmcontext } from './Alarmcontext';
import axios from 'axios';

const Sttmodal = ({ visible, onClose, allalarms, device, devicename, deviceImage, time, sttContent, modalContent}) => {

    const [sttVisible, setSttVisible] = useState(null);
    const [sttcontent, setSttcontent] = useState('');

    const handleModalOpen = (index) => {
      setSttVisible(index);  // 특정 모달만 열리도록 설정
    };

    const handleModalClose = () => {
      setSttVisible(null);  // 모든 모달 닫기
    };

    return (
        <Modal
                animationType="none"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
        >

                    <View style={styles.container}>
                        <View style={styles.modalview}>
                            <View style={styles.devicecontainer}>
                                <Image source={deviceImage} style={styles.deviceImage} />
                                <Text style={styles.deviceName}>{devicename}</Text>
                            </View>
                            <View style={{ height: 400, marginHorizontal: 10 }}>
                            <ScrollView style={styles.scrollContainer}>
                                {(allalarms || []).map((alarm, index) => (
                                    <TouchableOpacity key={index} style={styles.alarmContainer} onPress={() => handleModalOpen(index)}>
                                        <Text style={styles.time}>{alarm.resultTime || '시간 정보 없음'}</Text>
                                        <Text style={styles.content}>{modalContent}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            </View>
                        </View>
                    </View>

                    {(allalarms || []).map((alarm, index) => (
                        <SttContent
                            key={index}
                            visible={sttVisible === index}
                            onClose={handleModalClose}
                            sttContent={alarm.text}
                        />
                    ))}


                </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalview: {
        width: 300,
        height: 450,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        marginTop: 100,
    },
    scrollContainer: {
        padding: 10,
    },
    closebutton: {
        width: 30,
        height: 30,
        backgroundColor: '#4A3E8B',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center', // 텍스트를 중앙 정렬
        position: 'absolute',
        top: 15,
        right: 18,
    },
    closebuttontext: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'cafe24ssurround',
        textAlign: 'center',
    },
    alarmContainer: {
        width: 250,
        height: 65,
        marginTop: 10,
        marginLeft: 14,
        backgroundColor: '#F2EFF8',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        marginLeft:0,
    },
    deviceImage: {
        width: 20,
        height: 20,
        marginBottom: 10,
    },
    deviceName: {
        fontSize: 16,
        color: '#4A3E8B',
        fontFamily: 'cafe24ssurround',
        marginLeft: 5,
        marginTop: 1,
    },
    content: {
        fontSize: 13,
        color: '#4A3E8B',
        marginTop: 5,
        marginLeft: 10,
        fontFamily: 'cafe24ssurroundair'
    },
    time: {
        fontSize: 13,
        color: '#4A3E8B',
        marginLeft: 10,
        marginTop: 4,
        marginBottom: 2,
        fontFamily: 'cafe24ssurroundair'
    },
    textcontainer: {
        flexDirection: 'column',
    },
    devicecontainer: {
        flexDirection: 'row',
        marginTop: 20,
    }
});

export default Sttmodal;
