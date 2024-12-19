import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet, Modal, ScrollView } from 'react-native';

const Alramcontent = ({ visible, onClose, content, deviceImage, devicename, time, sttContent }) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>

            <View style={styles.container}>
                <View style={styles.modalview}>
                    <View style={styles.contents}>
                        <Image source={deviceImage} style={styles.deviceimage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.devicename}>{devicename}</Text>
                            <Text style={styles.time}>{time}</Text>
                            <Text style={styles.modalcontent}>{content}</Text>
                            {sttContent && sttContent !== 'null' ? ( <ScrollView style={styles.scrollContainer}>
                                <Text style={styles.sttcontennt}>{sttContent}</Text>
                            </ScrollView> ) : null }
                        </View>

                        <TouchableOpacity style={styles.closebutton} onPress={onClose}>
                            <Text style={styles.closebuttontext}>X</Text>
                        </TouchableOpacity>
                    </View>
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
        height: 140,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4A3E8B',
        padding: 10,
    },
    contents: {
        flexDirection: 'row', // 아이콘, 텍스트, 닫기 버튼을 가로로 배치
        alignItems: 'center',
        justifyContent: 'space-between', // 각 요소 간 여백
        width: 265,
    },
    textContainer: {
        flexDirection: 'column', // 텍스트를 위아래로 배치
        marginLeft: 30, // 이미지와 텍스트 간 여백
        flex: 1, // 텍스트 영역을 유연하게 확장
    },
    deviceimage: {
        width: 15,
        height: 15,
        position: 'absolute',
        top: 8,
        left: 4,
    },
    devicename: {
        fontSize: 13,
        fontFamily: 'cafe24ssurround',
        color: '#4A3E8B',
        textAlign: 'left',
        marginTop: 9,
        marginBottom: 5, // `content`와의 간격
    },
    closebutton: {
        width: 20,
        height: 20,
        backgroundColor: '#4A3E8B',
        borderRadius: 5, // 완전한 원형
        alignItems: 'center',
        justifyContent: 'center', // 텍스트를 중앙 정렬
        position :'absolute',
        top : 5,
        right: 4,
    },
    closebuttontext: {
        color: '#FFFFFF',
        fontSize: 12,
        fontFamily: 'cafe24ssurround',
        textAlign: 'center',
    },
    modalcontent: {
        fontFamily: 'cafe24ssurroundair',
        fontSize: 12,
        color: '000000', // 회색 텍스트
        textAlign: 'left',
        marginTop: 2,
    },
    time: {
        color: '#4A3E8B',
        fontSize: 12,
        fontFamily: 'cafe24ssurroundair',
        textAlign: 'left',
        marginTop: 7,
    },
    scrollContainer: {
            width: 250,
            height: 50,
            padding: 1,
            position: 'absolute',
            left: -17,
            top: 70,
    },
    sttcontennt: {
        fontSize: 10,

    }
});

export default Alramcontent;
