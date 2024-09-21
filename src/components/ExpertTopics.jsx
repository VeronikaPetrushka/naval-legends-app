import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import expert from '../constants/expert.js';
import Icons from './Icons';

const ExpertTopics = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');

    const close = 'close'
    const arrow = 'arrow'

    const handleTopicPress = (topic) => {
        setSelectedTopic(topic);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleGoBack = () => {
        navigation.navigate('QuizModeScreen');
    };

    const handleNavigateToQuiz = () => {
        navigation.navigate('ExpertQuiz', { topic: selectedTopic });
        handleCloseModal();
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
            <Text style={styles.selectedMode}>Expert</Text>
            {expert.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handleTopicPress(item.topic)}
                >
                    <Text style={styles.buttonText}>{item.topic}</Text>
                </TouchableOpacity>
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTopic}>{selectedTopic}</Text>
                        <TouchableOpacity
                            style={styles.quizButton}
                            onPress={handleNavigateToQuiz}
                        >
                            <Text style={styles.quizButtonText}>Start</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleCloseModal}
                        >
                            <Icons type={close}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
      </View>
    </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
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
      selectedMode: {
        fontWeight: 'bold',
        marginBottom: 60,
        marginTop: -30,
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
      },
    button: {
        padding: 10,
        backgroundColor: '#8d7d65',
        borderRadius: 10,
        marginBottom: 10,
        height: 73,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 19,
        textAlign: 'center',        
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTopic: {
        fontSize: 22,
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    quizButton: {
        padding: 10,
        backgroundColor: '#8d7d65',
        borderRadius: 10,
        marginBottom: 10,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    quizButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
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

export default ExpertTopics;
