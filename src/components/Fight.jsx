import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Fight = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);
    const [modalRulesVisible, setModalRulesVisible] = useState(false);
    const [outcomeVisible, setOutcomeVisible] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [outcomeText, setOutcomeText] = useState('');
    const [finishVisible, setFinishVisible] = useState(false);

    const close = 'close';
    const mode = 'mode';
    const book = 'book';

    const handleChoice = (choice) => {
        let outcome;

        if (currentStage === 1) {
            outcome = choice === 'A'
                ? "This formation will allow you to effectively use artillery and maintain communication between ships, but it is a predictable move and the enemy might prepare for it."
                : "This risky maneuver may give you an advantage if you can manage to split the enemy fleet and disrupt their ranks. However, ships in a frontal attack will be vulnerable to flanking fire.";
        } else if (currentStage === 2) {
            outcome = choice === 'A'
                ? "If you manage to close the distance, your ships can take advantage of close combat. However, you may suffer significant losses during the approach due to enemy fire."
                : "Long-range combat will allow you to inflict damage on the enemy while keeping control of the situation. However, prolonged bombardment may be less effective against large enemy ships.";
        } else if (currentStage === 3) {
            outcome = choice === 'A'
                ? "If you manage to destroy or capture the enemy flagship, it may lead to disorganization and panic among the enemy ships. However, such an attack may leave other parts of your fleet vulnerable."
                : "This option will allow you to gradually reduce the enemy's strength but may also lead to dispersal of your own forces and reduced coordination.";
        } else if (currentStage === 4) {
            outcome = choice === 'A'
                ? "Pursuing the enemy may lead to the complete destruction of their fleet, but it is risky as your ships may become scattered, making them vulnerable to counterattacks or adverse conditions."
                : "This will allow you to take enemy sailors as prisoners and capture their ships, which can strengthen your fleet. However, this takes more time and may allow some enemy ships to escape.";
        }
        
        setOutcomeText(outcome);
        setOutcomeVisible(true);
    };

    const handleOutcomeClose = () => {
        setOutcomeVisible(false);

        if (currentStage < 4) {
            setCurrentStage(currentStage + 1);
        } else {
            setFinishVisible(true); 
        }
    };

    const handleGoBack = () => {
        navigation.navigate('HomeScreen');
    };

    const handleAnalysis = () => {
        setFinishVisible(false); 
        navigation.navigate('AnalysisScreen');
    };


    return (
        <ImageBackground
        source={require('../assets/background/fight.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            {/* Modal for Battle of Trafalgar */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>The Battle of Trafalgar (1805)</Text>
                        <Text style={styles.modalText}>
                        The Battle of Trafalgar is one of the most famous naval battles in history, in which the British fleet, commanded by Admiral Horatio Nelson, achieved a decisive victory over the combined Franco-Spanish fleet. This battle took place during the Napoleonic Wars and had a decisive impact on control over the seas. You can take on the role of Admiral Nelson and make strategic decisions that affect the course of the battle.
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Icons type={close}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal for Rules */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalRulesVisible}
                onRequestClose={() => setModalRulesVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Rules</Text>
                        <Text style={styles.modalText}>
                        In this mode, you become a strategist who makes key decisions during the battle. Your choices affect the outcome of the battle, allowing you to feel like an admiral, planning maneuvers and tactics to achieve victory. This is a battle story where you will receive an answer for your choice with an explanation.
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalRulesVisible(false)}>
                            <Icons type={close}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Outcome Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={outcomeVisible}
                onRequestClose={handleOutcomeClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Outcome</Text>
                        <Text style={styles.modalText}>{outcomeText}</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleOutcomeClose}>
                            <Icons type={close}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Finish Screen Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={finishVisible}
                onRequestClose={handleGoBack}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Congratulations!</Text>
                        <Text style={styles.modalText}>
                            You passed the mission of this battle, becoming an admiral for a moment.
                        </Text>
                        <Text style={styles.bookButtonText}>Click on the book to learn more about this event</Text>
                        <TouchableOpacity style={styles.bookButton} onPress={handleAnalysis}>
                            <Icons type={book}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
                            <Icons type={close}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Situation and Choices */}
            <View style={styles.situationContainer}>
                <TouchableOpacity style={styles.rulesButton} onPress={() => setModalRulesVisible(true)}>
                    <Icons type={mode}/>
                </TouchableOpacity>

                <View style={styles.descContainer}>
                <View style={styles.situationTextContainer}>
                <Text style={styles.situationText}>
                    <Text style={styles.situationTextBold}>Situation</Text>
                    {'\n'}
                {currentStage === 1 ? "You, Admiral Nelson, are aboard HMS Victory and preparing your fleet for a clash with numerically superior enemy forces." : 
                    currentStage === 2 ? "The battle has begun, and your ships are approaching the enemy. Your fleet is under intense artillery bombardment from the Franco-Spanish fleet." : 
                    currentStage === 3 ? "Your ships have broken through the enemy line. Now you need to decide how to proceed to consolidate success and achieve victory." : 
                    "The enemy fleet is beginning to suffer significant losses. However, the battle is not yet over, and you have the opportunity to either finish off the remaining enemy fleet or give them a chance to retreat."}
                </Text>

                </View>

                <View style={styles.situationTextContainer}>
                <Text style={styles.stageText}>
                {currentStage === 1 ? "Stage 1: Preparation for Battle" : 
                    currentStage === 2 ? "Stage 2: Beginning of the Attack" : 
                    currentStage === 3 ? "Stage 3: Climax of the Battle" : 
                    "Stage 4: Conclusion of the Battle"}
                </Text>
                </View>

                </View>

                {currentStage === 1 && (
                    <>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('A')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice A:</Text> Form the fleet into a single line for a classic naval battle.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('B')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice B:</Text> Divide the fleet into two columns and attack the enemy from both sides, breaking their line.</Text>
                        </TouchableOpacity>
                    </>
                )}
                {currentStage === 2 && (
                    <>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('A')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice A:</Text> Accelerate your movement to enter close combat as quickly as possible and avoid prolonged bombardment.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('B')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice B:</Text> Maintain distance and gradually close in on the enemy to maximize artillery fire.</Text>
                        </TouchableOpacity>
                    </>
                )}
                {currentStage === 3 && (
                    <>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('A')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice A:</Text> Concentrate all forces on the enemy flagship to break their morale.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('B')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice B:</Text> Divide the fleet into smaller groups to attack multiple enemy ships simultaneously and gradually destroy enemy forces.</Text>
                        </TouchableOpacity>
                    </>
                )}
                {currentStage === 4 && (
                    <>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('A')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice A:</Text> Order all ships to pursue and destroy the remaining enemy forces.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.choiceButton} onPress={() => handleChoice('B')}>
                            <Text style={styles.choiceText}><Text style={styles.choiceTextBold}>Choice B:</Text> Focus on capturing enemy ships and taking prisoners.</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
        </View>
        </ImageBackground>
    );
};



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
        height: '100%',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '85%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    descContainer: {
        width :'100%',
        height: 340,
        marginTop: 50
    },
    situationContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    situationTextContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 20,
        width: '100%'
    },
    situationText: {
        fontSize: 19,
        textAlign: 'center',
    },
    situationTextBold: {
        fontWeight: 'bold',
        fontSize: 22,
    },
    stageText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    choiceButton: {
        padding: 15,
        backgroundColor: '#8d7d65',
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    choiceText: {
        color: '#fff',
        fontSize: 19,
        textAlign: 'center',
    },
    choiceTextBold: {
        fontWeight: 'bold',
    },
    rulesButton: {
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
    },
    bookButton: {
        marginTop: 30,
        width: 100,
        height: 100
    },
    bookButtonText: {
        textAlign: 'center',
        fontSize: 18
    },
});

export default Fight;
