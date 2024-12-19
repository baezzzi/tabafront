import React, { useContext } from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { AlarmContext } from './Alarmcontext';  // AlarmContext import

const SttContent = ({ visible, onClose, sttContent }) => {

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalview}>
                    <ScrollView style={styles.scrollContainer} style={{ maxHeight: 300 }}>
                        <Text style={styles.text}>{sttContent}
                        </Text>
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
        width: 250,
        height: 300,
        backgroundColor: '#F2EFF8',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 20,
        borderWidth: .3,
        borderColor: '#4A3E8B',
        marginTop: 100,
    },
    scrollContainer: {
        width: '100%',
        padding: 10,
    },
    text: {
        color: '#4A3E8B',
        alignText: 'center',
        JustifyContent: 'center',
        fontFamily: 'cafe24ssurroundair',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 7.5,
        width: 230,
    }
});

export default SttContent;
