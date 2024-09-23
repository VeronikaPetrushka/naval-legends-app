import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AboutModal from './About';
import SettingsModal from './SettingsModal';
import UserProfile from './UserProfile';
import Icons from './Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatars from '../constants/avatars.js';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [userProfileModalVisible, setUserProfileModalVisible] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0].avatarBack);
  const [userName, setUserName] = useState('');

  const loadAvatar = async () => {
    try {
      const storedAvatarId = await AsyncStorage.getItem('userAvatar');
      if (storedAvatarId) {
        const avatar = avatars.find(img => img.id === storedAvatarId);
        setCurrentAvatar(avatar ? avatar.avatarBack : avatars[0].avatarBack);
      }
    } catch (error) {
      console.error('Error loading avatar:', error);
    }
  };

  const loadName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userProfile');
      setUserName(storedName || '');
    } catch (error) {
      console.error('Error loading name:', error);
    }
  };

  useEffect(() => {
    loadAvatar();
    loadName();
  }, []);

  const closeUserProfileModal = async () => {
    setUserProfileModalVisible(false);
    await loadAvatar();
    await loadName();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeSettingsModal = () => {
    setSettingsModalVisible(false);
  };

  const battle = 'battle';
  const bonus = 'bonus';
  const settings = 'settings';
  const about = 'about';

  return (
    <ImageBackground
      source={require('../assets/background/home.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.avatar} onPress={() => setUserProfileModalVisible(true)}>
            <Image source={currentAvatar} style={styles.avatarImage} />
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{userName || "Admiral"}</Text>
          </View>
          <Text style={styles.title}>Naval Legends</Text>
          <View style={styles.btnsContainer}>

            <View style={styles.btnContainer}>
              <View style={styles.menuIcon}>
                <Icons type={battle}/>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BattleMapScreen')}>
                <Text style={styles.btnText}>Battle map</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
              <View style={styles.menuIcon}>
                <Icons type={bonus}/>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('DailyBonusScreen')}>
                <Text style={styles.btnText}>Daily bonus</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.btnContainer}>
              <View style={styles.menuIcon}>
                <Icons type={settings}/>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => setSettingsModalVisible(true)}>
                <Text style={styles.btnText}>Settings</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
              <View style={styles.menuIcon}>
                <Icons type={about}/>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(true)}>
                <Text style={styles.btnText}>About us</Text>
              </TouchableOpacity>
            </View>

          </View>

          <UserProfile visible={userProfileModalVisible} onClose={closeUserProfileModal} />
          <AboutModal visible={modalVisible} onClose={closeModal} />
          <SettingsModal visible={settingsModalVisible} onClose={closeSettingsModal} />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
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
    marginTop: '-50%',
    textAlign: 'center',
    color: 'white',
    marginTop: 0
  },
  btnsContainer: {
    width: '100%',
    marginTop: '-40%',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  menuIcon: {
    height: 53,
    width: 53,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 8
  },
  btn: {
    padding: 15,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  btnText: {
    fontSize: 20,
    color: 'white'
  },
  avatar: {
    width: 90,
    height: 130,
    position: 'absolute',
    top: 20,
    right: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 2
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  nameContainer: {
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#544b3c',
    minWidth: 150,
    width: 255,
    position: 'absolute',
    top: 20,
    right: 120,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export default Home;
