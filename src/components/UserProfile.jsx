import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, Modal, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatars from '../constants/avatars.js';
import Icons from './Icons.jsx';

const UserProfile = ({ visible, onClose }) => {
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].avatar);
  const [showAvatars, setShowAvatars] = useState(false);
  const [buttonText, setButtonText] = useState("Create account");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userProfile');
        const storedAvatarId = await AsyncStorage.getItem('userAvatar');

        if (storedName) {
          setName(storedName);
          setButtonText("Save changes");
        } else {
          setName("");
          setButtonText("Create account");
        }

        if (storedAvatarId) {
          const avatar = avatars.find(img => img.id === storedAvatarId);
          setSelectedAvatar(avatar ? avatar.avatar : avatars[0].avatar);
        } else {
          setSelectedAvatar(avatars[0].avatar);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    if (visible) {
      loadProfile();
    }
  }, [visible]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleSubmit = async () => {
    try {
      const selectedAvatarId = avatars.find(img => img.avatar === selectedAvatar)?.id;
      await AsyncStorage.setItem('userProfile', name);
      await AsyncStorage.setItem('userAvatar', selectedAvatarId || '1');
      console.log('User profile saved successfully!');
      setButtonText("Save changes");
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const toggleAvatarSelection = () => {
    setShowAvatars(!showAvatars);
  };

  const handleAvatarSelect = (avatarUri) => {
    setSelectedAvatar(avatarUri);
    setShowAvatars(false);
  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAvatarSelect(item.avatar)} style={styles.avatarOption}>
      <Image source={item.avatar} style={styles.avatarImage} />
    </TouchableOpacity>
  );

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ImageBackground
          source={require('../assets/background/profile.jpg')}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Icons type={'close'}/>
                </TouchableOpacity>
                <View style={styles.upperContainer}>
                  <Text style={styles.title}>Account</Text>
                  <TouchableOpacity onPress={toggleAvatarSelection} style={styles.avatarPlaceholder}>
                    <Image source={selectedAvatar} style={styles.avatarImage} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnChangeAvatar} onPress={toggleAvatarSelection}>
                    <Text style={styles.btnText}>Change avatar</Text>
                  </TouchableOpacity>
                  {showAvatars ? (
                    <FlatList
                      data={avatars}
                      renderItem={renderAvatarItem}
                      keyExtractor={item => item.id}
                      numColumns={3}
                      style={styles.avatarList}
                    />
                  ) : (
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={name}
                        placeholder="Enter your name"
                        placeholderTextColor="#ccc"
                        onChangeText={handleNameChange}
                        style={styles.input}
                      />
                      <TouchableOpacity style={styles.btnCreate} onPress={handleSubmit}>
                        <Text style={styles.btnText}>{buttonText}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </SafeAreaView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </Modal>
  );
};


const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    flexDirection: "column", 
    justifyContent: "flex-start",
    alignItems: "center",
    width: '100%',
    height: '100%',
    borderRadius: 15
  },
  closeButton: {
    padding: 10,
    width: 40,
    height: 40,
    position: 'absolute',
    top: 80,
    right: 0,
    zIndex: 10
  },
  upperContainer: {
    marginTop: 50,
    width: "100%",
    padding: 20,
    alignItems: "center"
  }, 

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'white'
  },

  avatarPlaceholder: {
    width: "100%",
    height: 470,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputContainer: {
    width: "100%",
    height: "60%",
    justifyContent: "space-between"
  },

  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    fontSize: 17,
    color: 'white'
  },

  btnCreate: {
    width: "100%",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    position: 'absolute',
    top: 90,
    backgroundColor: '#8d7d65',
  },

  btnText: {
    fontSize: 18,
    color: 'white'
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },

  avatarList: {
    marginTop: 20,
    height: "15%"
  },

  avatarOption: {
    margin: 5,
    width: 100,
    height: 100,
    borderRadius: 40,
    overflow: 'hidden',
  },

  btnChangeAvatar: {
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8d7d65',
    borderRadius: 10,
    marginTop: 10,
  }
};

export default UserProfile;
