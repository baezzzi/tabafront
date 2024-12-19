import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur';

const Test = () => {
  // 애니메이션 각각 독립적으로 설정 (3개의 Animated.Value)
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  const animatedValue3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 애니메이션 루프 시작 (각각의 Animated.Value에 대해)
    Animated.loop(
      Animated.timing(animatedValue1, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(animatedValue3, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // 첫 번째 원의 애니메이션
  const translate1 = {
    translateX: animatedValue1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-80, -48, -80], // X축 이동 범위
    }),
    translateY: animatedValue1.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-80, -120, -80], // Y축 이동 범위
    }),
  };

  // 두 번째 원의 애니메이션
  const translate2 = {
    translateX: animatedValue2.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [150, 155, 150], // X축 이동 범위 (다르게 설정)
    }),
    translateY: animatedValue2.interpolate({
      inputRange: [0, 0.1, 1],
      outputRange: [-100, -40, -100], // Y축 이동 범위 (다르게 설정)
    }),
  };

  // 세 번째 원의 애니메이션
  const translate3 = {
    translateX: animatedValue3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-30, -50, -30], // X축 이동 범위 (다르게 설정)
    }),
    translateY: animatedValue3.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [15, 60, 15], // Y축 이동 범위 (다르게 설정)
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.topDesign}>

        {/* 첫 번째 원 */}
        <Animated.View
          style={[
            styles.circleContainer,
            {
              transform: [
                { translateX: translate1.translateX },
                { translateY: translate1.translateY },
              ],
            },
          ]}
        >

          <Animated.Image
            source={require('../assets/image/blob3.png')}
            style={styles.circle}
          />

        </Animated.View>


        {/* 두 번째 원 */}
        <Animated.View
          style={[
            styles.circleContainer,
            {
              transform: [
                { translateX: translate2.translateX },
                { translateY: translate2.translateY },
              ],
            },
          ]}
        >
          <Animated.Image
            source={require('../assets/image/blob2.png')}
            style={styles.circle}
          />
        </Animated.View>

        {/* 세 번째 원 */}
        <Animated.View
          style={[
            styles.circleContainer,
            {
              transform: [
                { translateX: translate3.translateX },
                { translateY: translate3.translateY },
              ],
            },
          ]}
        >
          <Animated.Image
            source={require('../assets/image/blob3.png')}
            style={styles.circle}
          />
        </Animated.View>
        <BlurView
         style={styles.absolute}
         blurType="light"
         blurAmount={10} // 블러 정도
         />
        <View style={styles.box2}/>

      </View>
      <View style={styles.box}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top:0,
  },
  topDesign: {
    width: '100%',
    height: 135,
    backgroundColor: '#9D90DF50',
    marginBottom: 20,
    overflow: 'hidden',
  },
  circleContainer: {
    position: 'absolute',
  },
  circle: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  box: {
    width: 400,
    height: 136,
    backgroundColor: '#9D90DF30',
    position:'absolute',
    top:0,

  },
  box2:{
  width: 400,
  height: 200,
  backgroundColor: '#FFFFFF60'}
  ,
  absolute: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 150,
    },
});

export default Test;
