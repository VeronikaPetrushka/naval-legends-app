import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ExpertQuiz from '../components/ExpertQuiz';

const ExpertQuizScreen = ({ route }) => {
    const { topic } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ExpertQuiz topic={topic} />
        </SafeAreaView>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    }
});

export default ExpertQuizScreen;
