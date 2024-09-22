// stickers download
// share results button

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import newcomer from '../constants/newcomer.js';
import Icons from './Icons.jsx';

const NewcomerQuiz = ({ topic }) => {
    const selectedTopic = newcomer.find(item => item.topic === topic);
    const navigation = useNavigation();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [highlightedOptions, setHighlightedOptions] = useState({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [timer, setTimer] = useState(null);
    const [showHintModal, setShowHintModal] = useState(false);
    const [isHintUsed, setIsHintUsed] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    const quizScore = 'score';
    const mode = 'mode';
    const balance = 'balance';

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
        const newTimer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(newTimer);
                    finishQuiz();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        setTimer(newTimer);
        return () => clearInterval(newTimer);
    }, []);

    const finishQuiz = async () => {
        setQuizFinished(true);
        clearInterval(timer);

        try {
            const newBalance = totalBalance + score;
            await AsyncStorage.setItem('totalBalance', newBalance.toString());
            setTotalBalance(newBalance);
        } catch (error) {
            console.log('Error updating balance', error);
        }
    };

    const handleAnswer = (option) => {
        const isCorrect = option === selectedTopic.questions[currentQuestionIndex].correctAnswer;

        setSelectedOption(option);
        setHighlightedOptions({
            ...highlightedOptions,
            [option]: isCorrect ? 'correct' : 'incorrect',
            [selectedTopic.questions[currentQuestionIndex].correctAnswer]: 'correct',
        });

        if (isCorrect) {
            setScore(prevScore => prevScore + 100);
            setCorrectAnswersCount(prevCount => prevCount + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < selectedTopic.questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedOption(null);
                setHighlightedOptions({});
                setIsHintUsed(false);
            } else {
                finishQuiz();
            }
        }, 1500);
    };

    const currentQuestion = selectedTopic.questions[currentQuestionIndex];

    const handleGoBack = () => {
        clearInterval(timer);
        navigation.navigate('NewcomerTopicsScreen');
    };

    const handleHint = () => {
        if (score >= 10 && !isHintUsed && selectedOption === null) {
            setShowHintModal(true);
        }
    };

    const useHint = () => {
        setScore(prevScore => prevScore - 10);
        setHighlightedOptions({
            ...highlightedOptions,
            [selectedTopic.questions[currentQuestionIndex].correctAnswer]: 'correct',
        });
        setIsHintUsed(true);
        setShowHintModal(false);
        
        setTimeout(() => {
            if (currentQuestionIndex < selectedTopic.questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setSelectedOption(null);
                setHighlightedOptions({});
                setIsHintUsed(false);
            } else {
                finishQuiz();
            }
        }, 1500);
    };

    const canUseHint = score >= 10 && !isHintUsed && selectedOption === null;

    return (
        <View style={styles.quizContainer}>
            {quizFinished ? (
                <View style={styles.summaryContainer}>
                    <View style={styles.balanceContainer}>
                        <View style={styles.balanceIcon}>
                            <Icons type={balance}/>
                        </View>
                        <Text style={styles.balanceText}>
                            {totalBalance}
                        </Text>
                    </View>
                    {timeRemaining === 0 && <Text style={styles.oopsText}>Oops, you ran out of time!</Text>}
                    <Text style={styles.finish}>Quiz Finished!</Text>
                    <Text style={styles.quizTopicFinish}>{selectedTopic.topic}</Text>
                    <View style={styles.resultsContainer}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreIcon}>
                            <Icons type={quizScore}/>
                        </View>
                        <Text style={styles.scoreText}>{score}</Text>
                    </View>
                    <Text style={styles.timeTaken}>{60 - timeRemaining} seconds</Text>

                    </View>
                    <Text style={styles.summaryText}>
                        Congratulations, you passed the level by answering {correctAnswersCount} out of {selectedTopic.questions.length} questions.
                    </Text>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                        <Text style={styles.goBackText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.quizContainer}>
                    <Text style={styles.quizTopic}>{selectedTopic.topic}</Text>
                    <View style={styles.quizStata}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.scoreIcon}>
                            <Icons type={quizScore}/>
                        </View>
                        <Text style={styles.scoreText}>{score}</Text>
                    </View>
                    <Text style={styles.timerText}>{timeRemaining} s</Text>
                    <TouchableOpacity 
                        style={[styles.hintButton, { opacity: canUseHint ? 1 : 0.5 }]} 
                        onPress={handleHint} 
                        disabled={!canUseHint}
                    >
                        <Icons type={mode}/>
                    </TouchableOpacity>
                    </View>
                    <Text style={styles.questionText}>{currentQuestion.question}</Text>
                    {currentQuestion.options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionButton,
                                highlightedOptions[option] === 'correct' ? styles.correctOption : {},
                                highlightedOptions[option] === 'incorrect' ? styles.incorrectOption : {},
                            ]}
                            onPress={() => handleAnswer(option)}
                            disabled={selectedOption !== null}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}

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
        </View>
    );
};

const styles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    questionText: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 600,
        height: 200,
        marginBottom: 100
    },
    timerText: {
        fontSize: 18,
        marginBottom: 10,
    },
    optionButton: {
        padding: 15,
        backgroundColor: '#8d7d65',
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    optionText: {
        color: '#fff',
        fontSize: 19,
    },
    scoreText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    correctOption: {
        backgroundColor: '#5b9740',
    },
    incorrectOption: {
        backgroundColor: '#de2f2f',
    },
    summaryContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 10
    },
    summaryText: {
        fontSize: 22,
        marginBottom: 100,
        textAlign: 'center'
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
        color: '#fff',
        fontSize: 20,
    },
    oopsText: {
        color: 'red',
        fontSize: 24,
        marginBottom: 30,
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
    },
    hintText: {
        fontSize: 18,
        color: '#fff',
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
    scoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    scoreIcon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
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
    resultsContainer: {
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
    quizContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 40,
        paddingHorizontal: 10
    },
    quizTopic: {
        fontWeight: 800,
        fontSize: 28,
        marginBottom: 30,
        textAlign: 'center'
    },
    quizStata: {
        width: 500,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: '#625746',
        marginBottom: 50
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
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
        marginTop: -30
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
    }
});

export default NewcomerQuiz;
