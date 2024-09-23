import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AboutModal from './About';
import SettingsModal from './SettingsModal';
import Icons from './Icons';

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const closeModal = async () => {
    setModalVisible(false);
  };

  const closeSettingsModal = async () => {
    setSettingsModalVisible(false);
  };

    battle = 'battle';
    bonus = 'bonus';
    settings = 'settings';
    about = 'about';

  return (
    <ImageBackground
      source={require('../assets/background/home.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.name}>Naval Legends</Text>
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
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: '-50%',
    textAlign: 'center',
    color: 'white'
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
});

export default Home;
