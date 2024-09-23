// styles for battle description

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
                <Text style={styles.battleText}>Period: {selectedBattle.period}</Text>
                <Text style={styles.battleText}>Admiral: {selectedBattle.admiral}</Text>
                <Text style={styles.battleText}>Country: {selectedBattle.country}</Text>
                <Text style={styles.battleText}>Location: {selectedBattle.location}</Text>
                <Text style={styles.battleText}>Context: {selectedBattle.context}</Text>
                <Text style={styles.battleText}>Description: {selectedBattle.description}</Text>
                <Text style={styles.battleText}>Outcome: {selectedBattle.outcome}</Text>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.goBackIcon} onPress={handleGoBack}>
                <Icons type={'arrow'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.hintIcon} onPress={() => setModalVisible(true)}>
                <Icons type={'mode'}/>
            </TouchableOpacity>
            <Image source={require('../assets/background/battle-map.png')} style={styles.mapImg} />
            
            <TouchableOpacity style={styles.battlePin1} onPress={() => setSelectedBattle(battle[0])}>
                <Icons type={'pin'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.battlePin2} onPress={() => setSelectedBattle(battle[1])}>
                <Icons type={'pin'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.battlePin3} onPress={() => setSelectedBattle(battle[2])}>
                <Icons type={'pin'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.battlePin4} onPress={() => setSelectedBattle(battle[3])}>
                <Icons type={'pin'} />
            </TouchableOpacity>

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
                    <Text style={styles.modalText}>The map provides a detailed overview of the locations and important events of these battles to help you better understand their significance.
                    Each of these battles is represented on an interactive map in the application. You can click on the battle markers to open detailed information about each battle, learn about the admirals who participated in them, the tactics they used, and how the results of these battles affected world history.</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Icons type={'close'}/>
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
        height: 53,
        width: 53,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#8d7d65',
        padding: 10,
        position: 'absolute',
        top: 10,
        right: 10
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
