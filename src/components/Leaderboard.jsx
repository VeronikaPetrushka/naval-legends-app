import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import stickers from '../constants/stickers.js';
import Icons from './Icons';

const generateRandomUsers = () => {
  const admiralNames = [
    'Admiral Nelson', 'Admiral Nimitz', 'Admiral Yamamoto', 'Admiral De Ruyter', 'Admiral Spruance', 
    'Admiral Togo', 'Admiral Cunningham', 'Admiral Halsey', 'Admiral Beatty', 'Admiral Jellicoe'
  ];

  return admiralNames.map((name, index) => ({
    name,
    score: Math.floor(Math.random() * (10000 - 500 + 1)) + 500,
    image: stickers[index % stickers.length].sticker,
  }));
};

const Leaderboard = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const balance = 'balance';
  const arrow = 'arrow';

  useEffect(() => {
    setUsers(generateRandomUsers());

    const fetchBalance = async () => {
      try {
        const storedBalance = await AsyncStorage.getItem('totalBalance');
        if (storedBalance !== null) {
          setTotalBalance(Number(storedBalance));
        }
      } catch (error) {
        console.log('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleGoBack = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground
      source={require('../assets/background/home.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.goBackIcon}
            onPress={handleGoBack}
          >
            <Icons type={arrow}/>
          </TouchableOpacity>
          <View style={styles.balanceContainer}>
            <View style={styles.balanceIcon}>
              <Icons type={balance}/>
            </View>
            <Text style={styles.balanceText}>
              {totalBalance}
            </Text>
          </View>
          <Text style={styles.title}>Leaderboard</Text>
          <FlatList
            style={styles.usersList}
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.userContainer}>
                <Image source={item.image} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <View style={styles.userScoreContainer}>
                    <View style={styles.scoreIcon}>
                      <Icons type={balance} />
                    </View>
                    <Text style={styles.userScore}>{item.score}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white'
  },
  usersList: {
    width: '100%',
    marginBottom: 160
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#625746',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'white'
  },
  userInfo: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userScore: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#8d7d65',
    marginBottom: 30,
  },
  balanceIcon: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  balanceText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold'
  },
  userScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreIcon: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  goBackIcon: {
    width: 60,
    height: 60,
    padding: 10,
    position: 'absolute',
    top: 15,
    left: 10
  }
});

export default Leaderboard;
