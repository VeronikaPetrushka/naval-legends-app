import React, { useState } from "react";
import { SafeAreaView, Image, TouchableOpacity, Text, ScrollView, Modal, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icons from "./Icons";
import battle from "../constants/battle.js";

const BattleMap = () => {
    const navigation = useNavigation();
    const [selectedBattle, setSelectedBattle] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = async () => {
        setModalVisible(false);
    };

    const handleGoBack = () => {
        navigation.navigate('HomeScreen');
    };

    const renderBattleDetails = () => {
        if (!selectedBattle) return null;

        return (
            <ScrollView style={styles.battleDetails}>
                <Text style={styles.battleTitle}>{selectedBattle.battle}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Period:</Text> {selectedBattle.period}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Admiral:</Text> {selectedBattle.admiral}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Country:</Text> {selectedBattle.country}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Location:</Text> {selectedBattle.location}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Context:</Text> {selectedBattle.context}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Description:</Text> {selectedBattle.description}</Text>
                <Text style={styles.battleText}><Text style={styles.italic}>Outcome:</Text> {selectedBattle.outcome}</Text>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.goBackIcon} onPress={handleGoBack}>
                <Icons type={'arrow'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.hintIcon} onPress={() => setModalVisible(true)}>
                <Icons type={'mode'} />
            </TouchableOpacity>
            <Image source={require('../assets/background/battle-map.png')} style={styles.mapImg} />

            {battle.map((b, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[styles[`battlePin${index + 1}`], selectedBattle === b ? styles.currentPin : {}]} 
                    onPress={() => setSelectedBattle(b)}
                >
                    <Icons type={'pin'} />
                </TouchableOpacity>
            ))}

            {renderBattleDetails()}

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Map usage</Text>
                        <Text style={styles.modalText}>
                            The map provides a detailed overview of the locations and important events of these battles to help you better understand their significance.
                            Each of these battles is represented on an interactive map in the application. You can click on the battle markers to open detailed information about each battle, learn about the admirals who participated in them, the tactics they used, and how the results of these battles affected world history.
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Icons type={'close'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = {
    container: {
        width: "100%",
        height: "110%",
        paddingVertical: 75,
        backgroundColor: '#8d7d65',
        alignItems: 'center'
    },
    goBackIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    hintIcon: {
        height: 43,
        width: 43,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#8d7d65',
        padding: 10,
        position: 'absolute',
        top: 20,
        right: 20
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 15,
        right: 10,
    },
    mapImg: {
        width: '100%',
        height: 400,
    },
    battlePin1: {
        width: 50,
        height: 50,
        padding: 10,
        position: 'absolute',
        top: 125,
        left: 50,
    },
    battlePin2: {
        width: 50,
        height: 50,
        padding: 10,
        position: 'absolute',
        top: 255,
        left: 120,
    },
    battlePin3: {
        width: 50,
        height: 50,
        padding: 10,
        position: 'absolute',
        top: 115,
        left: 210,
    },
    battlePin4: {
        width: 50,
        height: 50,
        padding: 10,
        position: 'absolute',
        top: 235,
        left: 310,
    },
    currentPin: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: 'white'
    },
    battleDetails: {
        padding: 10,
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        width: '95%'
    },
    battleTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    battleText: {
        fontSize: 18,
        marginBottom: 20,
    },
    italic: {
        fontStyle: 'italic',
        fontWeight: 600
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20
    },
    modalText: {
        fontSize: 20,
        textAlign: 'center'
    }
};

export default BattleMap;
