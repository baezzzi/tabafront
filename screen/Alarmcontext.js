import React, { createContext, useState } from 'react';

// AlarmContext 생성
export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
    const [alarms, setAlarms] = useState([]);  // 알림 상태
    const [allalarms, setAllalarms] = useState([]);  // 모든 알림 상태

    // 알림을 추가하는 함수
    const addAlarm = (alarm) => {
        setAlarms((prevAlarms) => [...prevAlarms, alarm]);
        setAllalarms((prevAllalarms) => [...prevAllalarms, alarm]);
    };

    // 알림을 읽은 후 제거하는 함수
    const removeAlarm = (id) => {
        setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== id));
    };

    const clearAlarm = () => {
        setAlarms([]);
    }

    console.log(alarms);
    console.log(allalarms);
    return (
        <AlarmContext.Provider value={{ alarms, setAlarms, allalarms, setAllalarms, addAlarm, removeAlarm, clearAlarm }}>
            {children}
        </AlarmContext.Provider>
    );
};
