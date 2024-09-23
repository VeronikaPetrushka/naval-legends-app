import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Share, Alert, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons';

const SettingsModal = ({ visible, onClose }) => {
    const [toggleLoudness, setToggleLoudness] = useState(true);
    const [totalBalance, setTotalBalance] = useState(0);
    const [showResetConfirmation, setShowResetConfirmation] = useState(false);
    const [vibrationEnabled, setVibrationEnabled] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const storedLoudness = await AsyncStorage.getItem('toggleLoudness');
                const storedVibration = await AsyncStorage.getItem('vibrationEnabled');

                // Add console logs to check retrieved values
                console.log('Stored Loudness:', storedLoudness);
                console.log('Stored Vibration:', storedVibration);

                if (storedLoudness !== null) {
                    setToggleLoudness(JSON.parse(storedLoudness)); // Parse the string value to boolean
                }
                if (storedVibration !== null) {
                    setVibrationEnabled(JSON.parse(storedVibration));
                }
            } catch (error) {
                console.log('Error loading settings:', error);
            }
        };

        loadSettings();
        if (visible) {
            retrieveBalance();
        }
    }, [visible]);

    const retrieveBalance = async () => {
        try {
            const balance = await AsyncStorage.getItem('totalBalance');
            if (balance !== null) {
                setTotalBalance(parseInt(balance, 10));
            }
        } catch (error) {
            console.log('Error retrieving balance:', error);
        }
    };

    const handleToggleLoudness = async () => {
        const newLoudnessState = !toggleLoudness;
        setToggleLoudness(newLoudnessState);

        try {
            // Save the new loudness state as a string
            await AsyncStorage.setItem('toggleLoudness', JSON.stringify(newLoudnessState));
            console.log('New Loudness State Stored:', newLoudnessState); // Log the state being stored
        } catch (error) {
            console.log('Error saving loudness setting:', error);
        }
    };

    const handleToggleVibration = async () => {
        const newVibrationState = !vibrationEnabled;
        setVibrationEnabled(newVibrationState);

        try {
            await AsyncStorage.setItem('vibrationEnabled', JSON.stringify(newVibrationState));
            console.log('New Vibration State Stored:', newVibrationState); // Log the state being stored
        } catch (error) {
            console.log('Error saving vibration setting:', error);
        }

        if (newVibrationState) {
            Vibration.vibrate();
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Look! I have reached ${totalBalance} score in Naval Legends!`,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    const resetDailyBonus = async () => {
        try {
            const currentTime = Math.floor(Date.now() / 1000);
            await AsyncStorage.setItem('lastResetTime', currentTime.toString());
        } catch (error) {
            console.error('Error resetting daily bonus:', error);
        }
    };

    const handleReset = async () => {
        try {
            await AsyncStorage.removeItem('totalBalance');
            await AsyncStorage.removeItem('stickers');
            await resetDailyBonus();
            setTotalBalance(0);
            setShowResetConfirmation(false);
            onClose();

            Alert.alert('Progress Reset', 'Your progress has been reset successfully!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ]);

            if (vibrationEnabled) {
                Vibration.vibrate();
            }
        } catch (error) {
            console.error('Error resetting progress:', error);
            Alert.alert('Error', 'There was a problem resetting your progress. Please try again later.');
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {showResetConfirmation ? (
                        <>
                            <Text style={styles.confirmationText}>
                                Are you sure you want to reset your progress? It will reset your balance, account, and stickers!
                            </Text>
                            <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelReset} onPress={() => setShowResetConfirmation(false)}>
                                <Text style={styles.btnText}>Close</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Icons type="close" />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Settings</Text>

                            <View style={styles.regulatorContainer}>
                                <Text style={styles.regulatorText}>Loudness</Text>
                                <Text style={[styles.toggleText, toggleLoudness ? styles.toggleTextOn : styles.toggleTextOff]}>
                                    {toggleLoudness ? 'On' : 'Off'}
                                </Text>
                                <TouchableOpacity style={styles.toggleContainer} onPress={handleToggleLoudness}>
                                    <View style={[styles.toggle, toggleLoudness ? styles.toggleOn : styles.toggleOff]}></View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.regulatorContainer}>
                                <Text style={styles.regulatorText}>Vibration</Text>
                                <Text style={[styles.toggleText, vibrationEnabled ? styles.toggleTextOn : styles.toggleTextOff]}>
                                    {vibrationEnabled ? 'On' : 'Off'}
                                </Text>
                                <TouchableOpacity style={styles.toggleContainer} onPress={handleToggleVibration}>
                                    <View style={[styles.toggle, vibrationEnabled ? styles.toggleOn : styles.toggleOff]}></View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                                <Text style={styles.btnText}>Share</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.resetBtn} onPress={() => setShowResetConfirmation(true)}>
                                <Text style={styles.btnText}>Reset</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        height: '50%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 30,
    },
    regulatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    regulatorText: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    toggleContainer: {
        padding: 7,
        width: 100,
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#8d7d65',
    },
    toggleText: {
        fontSize: 16,
    },
    toggleTextOn: {
        color: '#8d7d65',
    },
    toggleTextOff: {
        color: '#ccc',
    },
    toggle: {
        borderRadius: 30,
        width: '45%',
        height: '100%',
    },
    toggleOn: {
        backgroundColor: '#8d7d65',
        alignSelf: 'flex-end',
    },
    toggleOff: {
        backgroundColor: '#ccc',
        alignSelf: 'flex-start',
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    shareBtn: {
        width: '100%',
        backgroundColor: '#8d7d65',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        marginTop: 60,
    },
    btnText: {
        fontSize: 19,
        fontWeight: '500',
        color: 'white',
    },
    resetBtn: {
        width: '100%',
        backgroundColor: '#544b3c',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmationText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 100,
    },
    cancelReset: {
        width: '100%',
        backgroundColor: '#8d7d65',
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});

export default SettingsModal;
