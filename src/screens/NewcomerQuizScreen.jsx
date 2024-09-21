import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import NewcomerQuiz from '../components/NewcomerQuiz';

const NewcomerQuizScreen = ({ route }) => {
    const { topic } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <NewcomerQuiz topic={topic} />
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

export default NewcomerQuizScreen;
