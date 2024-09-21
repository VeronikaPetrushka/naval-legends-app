import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import expert from '../constants/expert.js';

const ExpertQuiz = ({ topic }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const topicData = expert.find((item) => item.topic === topic);

    const handleOptionPress = (option) => {
        setSelectedOption(option.title);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{topicData.topic}</Text>
            <Text style={styles.task}>{topicData.task}</Text>

            {topicData.options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.optionButton,
                        selectedOption === option.title && styles.selectedOption
                    ]}
                    onPress={() => handleOptionPress(option)}
                >
                    <Text style={styles.optionText}>{option.title}</Text>
                    {option.subTitle && <Text style={styles.subTitle}>{option.subTitle}</Text>}
                </TouchableOpacity>
            ))}

            {selectedOption && (
                <Text style={styles.selectedText}>
                    Selected: {selectedOption}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    task: {
        fontSize: 18,
        marginBottom: 20,
    },
    optionButton: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#8d7d65',
        borderRadius: 5,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#4d4d4d',
    },
    optionText: {
        fontSize: 18,
        color: '#fff',
    },
    subTitle: {
        fontSize: 14,
        color: '#d3d3d3',
    },
    selectedText: {
        marginTop: 20,
        fontSize: 16,
        color: '#fff',
    },
});

export default ExpertQuiz;
