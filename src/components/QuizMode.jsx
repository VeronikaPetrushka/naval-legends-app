import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';
import NewcomerModal from './NewcomerModal';
import ExpertModal from './ExpertModal';

const QuizMode = () => {
  const navigation = useNavigation();
  const [newcomerModalVisible, setNewcomerModalVisible] = useState(false);
  const [expertModalVisible, setExpertModalVisible] = useState(false);

  const arrow = 'arrow'
  const mode = 'mode'

  const handleGoBack = () => {
    navigation.navigate('HomeScreen');
};

  const closeNewComerModal = async () => {
    setNewcomerModalVisible(false);
  };

  const closeExpertModal = async () => {
    setExpertModalVisible(false);
  };

  return (
    <ImageBackground
      source={require('../assets/background/home.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
        <TouchableOpacity
                style={styles.goBackIcon}
                onPress={handleGoBack}
                >
                    <Icons type={arrow}/>
            </TouchableOpacity>
          <Text style={styles.name}>Choose your level</Text>
          <View style={styles.btnsContainer}>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.menuIcon} onPress={() => setNewcomerModalVisible(true)}>
                <Icons type={mode}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('NewcomerTopicsScreen')}>
              <Text style={styles.btnText}>Newcomer</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.menuIcon} onPress={() => setExpertModalVisible(true)}>
                <Icons type={mode}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ExpertTopicsScreen')}> 
              <Text style={styles.btnText}>Expert</Text>
            </TouchableOpacity>
            </View>

          </View>

          <NewcomerModal visible={newcomerModalVisible} onClose={closeNewComerModal}/>

          <ExpertModal visible={expertModalVisible} onClose={closeExpertModal}/>

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
    marginBottom: 8,
    backgroundColor: '#8d7d65',
    padding: 10,
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
  goBackIcon: {
    width: 60,
    height: 60,
    padding: 10,
    position: 'absolute',
    top: 15,
    left: 10
}
});

export default QuizMode;
