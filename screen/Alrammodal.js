import React, { useContext } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { AlarmContext } from './Alarmcontext';  // AlarmContext import

const Alrammodal = ({ visible, onClose, allalarms, devicename, deviceImage, time }) => {

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
                    <ScrollView style={styles.scrollContainer}>
                        {(allalarms || []).map((alarm, index) => (
                            <View key={index} style={styles.alarmContainer}>
                                <Text style={styles.time}>{time}</Text>
                                <Text style={styles.content}>{alarm.modalContent}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
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
        width: '100%',
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

export default Alrammodal;
