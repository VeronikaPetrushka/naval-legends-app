import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Share } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import expert from '../constants/expert.js';
import Icons from './Icons.jsx';

const ExpertQuiz = ({ topic }) => {
    const navigation = useNavigation();

    const [selectedOption, setSelectedOption] = useState(null);
    const [placedOptions, setPlacedOptions] = useState(Array(10).fill(null));
    const [score, setScore] = useState(0);
    const [modalVisible, setModalVisible] = useState(true);
    const [timer, setTimer] = useState(60);
    const [isFinished, setIsFinished] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);

    const topicData = expert.find((item) => item.topic === topic);

    const balance = 'balance';
    const quizScore = 'score';

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balance = await AsyncStorage.getItem('totalBalance');
                if (balance !== null) {
                    setTotalBalance(parseInt(balance));
                }
            } catch (error) {
                console.log('Error fetching balance', error);
            }
        };

        fetchBalance();
    }, []);

    useEffect(() => {
        let interval;
        if (timer > 0 && !isFinished) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            finishQuiz();
        }
        return () => clearInterval(interval);
    }, [timer, isFinished]);

    const finishQuiz = async () => {
        setIsFinished(true);
        clearInterval(timer);

        try {
            const newBalance = totalBalance + score;
            await AsyncStorage.setItem('totalBalance', newBalance.toString());
            setTotalBalance(newBalance);
        } catch (error) {
            console.log('Error updating balance', error);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimer(60);
    };

    const handleDrop = (option, index) => {
        const updatedPlacedOptions = [...placedOptions];
        updatedPlacedOptions[index] = option;
    
        if (isCorrect(option, index)) {
            setScore((prevScore) => prevScore + 100);
        }
    
        setPlacedOptions(updatedPlacedOptions);
        setSelectedOption(null);
    
        if (!updatedPlacedOptions.includes(null)) {
            finishQuiz();
        }
    
        if (score >= 10) {
            const correctOptions = topicData.correctOrder.map((item) => item.title);
            const nextAvailableOption = topicData.options.find(option => correctOptions.includes(option.title));
            if (nextAvailableOption) {
            }
        }
    };

    const isCorrect = (option, index) => {
        return option && option.title === topicData.correctOrder[index].title;
    };

    const renderOption = ({ item }) => {
        const isPlaced = placedOptions.includes(item);
        const isCorrectlyPlaced = isPlaced && isCorrect(item, placedOptions.indexOf(item));

        return (
            <TouchableOpacity
                onPress={() => !isPlaced && setSelectedOption(item)}
                style={[
                    styles.optionButton,
                    selectedOption === item && styles.selectedOption,
                    isPlaced && styles.placedOption,
                ]}
                disabled={isCorrectlyPlaced}
            >
                <Text style={styles.optionText}>{item.title}</Text>
                {item.subTitle && <Text style={styles.subTitle}>{item.subTitle}</Text>}
            </TouchableOpacity>
        );
    };

    const handleGoBack = () => {
        navigation.navigate('ExpertTopicsScreen');
    };

    const useHint = () => {
        if (score >= 10) {
            const correctOptions = topicData.correctOrder.map((item) => item.title);
            const remainingOptions = topicData.options.filter(option => !placedOptions.includes(option));
    
            const optionToPlace = remainingOptions.find((option) => correctOptions.includes(option.title));
    
            if (optionToPlace) {
                const index = topicData.correctOrder.findIndex((item) => item.title === optionToPlace.title);
                const updatedPlacedOptions = [...placedOptions];
                updatedPlacedOptions[index] = optionToPlace;
    
                setPlacedOptions(updatedPlacedOptions);
                setScore((prevScore) => prevScore - 10 + 100);
    
                if (!updatedPlacedOptions.includes(null)) {
                    finishQuiz();
                }
    
                const newOptions = topicData.options.filter((option) => option.title !== optionToPlace.title);
                topicData.options = newOptions;
            }
        }
        setShowHintModal(false);
    };

    const handleShare = async () => {
        try {
            const message = `I just completed the quiz on "${topicData.topic}"! I scored ${score} points with ${placedOptions.filter((option) => option !== null).length} / ${placedOptions.length} correct order!`;
            await Share.share({ message });
        } catch (error) {
            console.log('Error sharing score', error);
        }
    };
    

    return (
        <View style={styles.container}>
            {isFinished ? (
                <View style={styles.finishContainer}>
                    <View style={styles.balanceContainer}>
                        <View style={styles.balanceIcon}>
                            <Icons type={balance}/>
                        </View>
                        <Text style={styles.balanceText}>
                            {totalBalance}
                        </Text>
                    </View>
                    <Text style={styles.finish}>Quiz Finished!</Text>
                    <Text style={styles.quizTopicFinish}>{topicData.topic}</Text>
                    <View style={styles.resultsContainerFinish}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreIcon}>
                            <Icons type={quizScore}/>
                        </View>
                        <Text style={styles.scoreTextFinish}>{score}</Text>
                    </View>
                    <Text style={styles.timeTaken}>{60 - timer} seconds</Text>
                    </View>
                    <Text style={styles.summaryText}>
                        Congratulations, you passed the level by answering {placedOptions.filter((option) => option !== null).length} out of {placedOptions.length} questions.
                    </Text>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleShare}>
                        <Text style={styles.goBackText}>Share Your Score</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <Text style={styles.title}>{topicData.topic}</Text>
                    <View style={styles.quizStata}>
                        <View style={styles.scoreContainer}>
                            <View style={styles.scoreIcon}>
                                <Icons type={quizScore} />
                            </View>
                            <Text style={styles.scoreTxt}>{score}</Text>
                        </View>
                        <Text style={styles.timerText}>{timer} s</Text>
                    </View>

                    {/* Modal for displaying the task */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTask}>Task</Text>
                                <Text style={styles.modalTaskDesc}>{topicData.task}</Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closeModal}
                                >
                                    <Icons type="close" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        style={[styles.hintButton, { opacity: score > 10 ? 1 : 0.5 }]} 
                        onPress={() => setShowHintModal(true)}
                        disabled={score < 10}
                    >
                            <Icons type={'mode'}/>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showHintModal}
                        onRequestClose={() => setShowHintModal(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Do you want to use a hint? It will cost you 10 points.</Text>
                                <TouchableOpacity style={styles.modalButton} onPress={useHint}>
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={() => setShowHintModal(false)}>
                                    <Text style={styles.modalButtonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.quizContainer}>
                        {/* First Column: Draggable Options */}
                        <View style={styles.optionsContainer}>
                            <DraggableFlatList
                                data={topicData.options.filter(option => !placedOptions.includes(option))}
                                renderItem={renderOption}
                                keyExtractor={(item, index) => `draggable-item-${index}`}
                                onDragEnd={({ data }) => setPlacedOptions(data)}
                                scrollEnabled={true}
                            />
                        </View>

                        {/* Second Column: Correct Order Indices */}
                        <View style={styles.indexContainer}>
                            <ScrollView style={styles.indexScroll}>
                                {topicData.correctOrder.map((_, index) => {
                                    const placedOption = placedOptions[index];
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.indexBox,
                                                placedOption && isCorrect(placedOption, index) && styles.correctIndexBox,
                                                placedOption && !isCorrect(placedOption, index) && styles.incorrectIndexBox
                                            ]}
                                            onPress={() => {
                                                if (selectedOption) {
                                                    handleDrop(selectedOption, index);
                                                } else if (placedOption) {
                                                    setSelectedOption(placedOption);
                                                    const updatedPlacedOptions = [...placedOptions];
                                                    updatedPlacedOptions[index] = null;
                                                    setPlacedOptions(updatedPlacedOptions);
                                                }
                                            }}
                                            disabled={placedOption !== null && isCorrect(placedOption, index)}
                                        >
                                            {placedOption && isCorrect(placedOption, index) ? (
                                                <>
                                                    <Text style={styles.optionText}>{topicData.correctOrder[index].title}</Text>
                                                    <Text style={styles.subTitle}>{topicData.correctOrder[index].period}</Text>
                                                </>
                                            ) : (
                                                placedOption ? (
                                                    <>
                                                        <Text style={styles.optionText}>{placedOption.title}</Text>
                                                        {placedOption.subTitle ?
                                                        <Text style={styles.subTitle}>{placedOption.subTitle}</Text> 
                                                        : ''
                                                        }
                                                    </>
                                                ) : (
                                                    <Text style={styles.indexText}>{index + 1}</Text>
                                                )
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 150,
        paddingBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTask: {
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    modalTaskDesc: {
        fontSize: 21,
        textAlign: 'center',
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    quizContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        paddingBottom: 50
    },
    optionsContainer: {
        width: '47%',
        height: '100%'
    },
    optionButton: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#8d7d65',
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    selectedOption: {
        backgroundColor: '#554d40',
    },
    placedOption: {
        backgroundColor: '#ccc',
    },
    optionText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 14,
        color: '#d3d3d3',
        textAlign: 'center'
    },
    indexContainer: {
        width: '47%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    },
    indexScroll: {
        width: '100%',
    },
    indexBox: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#8d7d65',
    },
    correctIndexBox: {
        backgroundColor: '#3d85c6',
    },
    indexText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center'
    },
    scoreTxt: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    scoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    scoreIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    finishContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    finishText: {
        fontSize: 20,
        marginBottom: 10,
    },
    goBackButton: {
        padding: 15,
        backgroundColor: '#8d7d65',
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goBackText: {
        fontSize: 19,
        color: '#fff',
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    quizStata: {
        width: 500,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: '#625746',
        marginBottom: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#8d7d65',
        borderRadius: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 10,
        width: 150,
        backgroundColor: '#8d7d65',
        marginBottom: 20,
        marginTop: -140
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

    finish: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50
    },
    quizTopicFinish: {
        fontWeight: 800,
        fontSize: 28,
        marginBottom: 70,
        textAlign: 'center'
    },
    resultsContainerFinish: {
        width: 500,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#8d7d65',
        marginBottom: 30
    },
    timeTaken: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    scoreContainerFinish: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    summaryText: {
        fontSize: 22,
        marginBottom: 100,
        textAlign: 'center'
    },
    scoreTextFinish: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    hintButton: {
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
        marginBottom: 10
    },
});

export default ExpertQuiz;
