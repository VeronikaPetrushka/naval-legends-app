import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import bonus from '../constants/bonus.js';
import Icons from './Icons.jsx';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

const DailyBonus = () => {
  const navigation = useNavigation();
  const [currentBattleIndex, setCurrentBattleIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(ONE_DAY_IN_SECONDS);

  const LAST_RESET_TIME_KEY = 'lastResetTime';

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const fetchLastResetTime = async () => {
    try {
      const lastResetTime = await AsyncStorage.getItem(LAST_RESET_TIME_KEY);
      return lastResetTime ? parseInt(lastResetTime) : null;
    } catch (error) {
      console.error('Error fetching last reset time:', error);
      return null;
    }
  };

  const saveLastResetTime = async (currentTime) => {
    try {
      await AsyncStorage.setItem(LAST_RESET_TIME_KEY, currentTime.toString());
    } catch (error) {
      console.error('Error saving last reset time:', error);
    }
  };

  const calculateTimeLeft = (lastResetTime) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const timePassed = currentTime - lastResetTime;
    return Math.max(ONE_DAY_IN_SECONDS - timePassed, 0);
  };

  useEffect(() => {
    const initializeTimer = async () => {
      const lastResetTime = await fetchLastResetTime();

      if (lastResetTime) {
        const remainingTime = calculateTimeLeft(lastResetTime);
        setSecondsLeft(remainingTime);

        if (remainingTime === 0) {
          const currentTime = Math.floor(Date.now() / 1000);
          saveLastResetTime(currentTime);
          setCurrentBattleIndex((prevIndex) => (prevIndex + 1) % bonus.length);
          setSecondsLeft(ONE_DAY_IN_SECONDS);
        }
      } else {
        const currentTime = Math.floor(Date.now() / 1000);
        saveLastResetTime(currentTime);
        setSecondsLeft(ONE_DAY_IN_SECONDS);
      }
    };

    initializeTimer();

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 0) {
          const currentTime = Math.floor(Date.now() / 1000);
          saveLastResetTime(currentTime);
          setCurrentBattleIndex((prevIndex) => (prevIndex + 1) % bonus.length);
          return ONE_DAY_IN_SECONDS;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentBattle = bonus[currentBattleIndex];

  const handleGoBack = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/background/bonus.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.goBackIcon}
            onPress={handleGoBack}
          >
            <Icons type={'arrow'} />
          </TouchableOpacity>
          <Text style={styles.title}>Daily Bonus</Text>

          <View style={styles.battleContainer}>
            <Image source={currentBattle.image} style={styles.battleImage} />
            <Text style={styles.battleName}>{currentBattle.battle}</Text>
            <Text style={styles.battlePeriod}>Year: {currentBattle.period}</Text>
            <Text style={styles.battleDescription}>{currentBattle.description}</Text>
          </View>

          <Text style={styles.timerText}>
            Next daily bonus available in: {formatTime(secondsLeft)}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        width: '100%',
        height: '100%'
    },
    backgroundImage: {
        width: '100%',
        height: '110%',
        justifyContent: 'center',
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      goBackIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 15,
        left: 10
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    battleContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        width: '100%',
        height: 590
    },
    battleImage: {
        minHeight: 280,
        minWidth: 280,
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    battleName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    battlePeriod: {
        fontSize: 17,
        color: '#555',
        marginBottom: 20,
    },
    battleDescription: {
        fontSize: 19,
        color: '#777',
        textAlign: 'center',
    },
    timerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        bottom: 90
    },
});

export default DailyBonus;
