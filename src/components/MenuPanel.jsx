import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import Icons from './Icons';

const MenuPanel = () => {
    const navigation = useNavigation();

    const quiz = 'quiz';
    const fight = 'fight';
    const stories = 'stories';
    const shop = 'shop';
    const leaderBoard = 'leader-board';

    const handleNavigateToQuizMode = () => {
        navigation.navigate('QuizModeScreen');
    };

    const handleNavigateToFight = () => {
        navigation.navigate('FightScreen');
    };

    const handleNavigateToStories = () => {
        navigation.navigate('LibraryScreen');
    };

    const handleNavigateToStickers = () => {
        navigation.navigate('StickersScreen');
    };

    const handleNavigateToLeaders = () => {
        navigation.navigate('LeaderboardScreen');
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToQuizMode}> 
                <Icons type={quiz} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Quiz</Text>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToFight}>
                <Icons type={fight} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Fight</Text>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToStories}>
                <Icons type={stories} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Stories</Text>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToStickers}>
                <Icons type={shop} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Stickers</Text>
            </View>
        
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={handleNavigateToLeaders}> 
                <Icons type={leaderBoard} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Leaders</Text>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#8d7d65',
        alignSelf: "center",
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        borderRadius: 10,
        borderWidth:1,
        borderColor: 'white',
        overflow: 'hidden',
        width: 53,
        height: 53
    },
    activeButton: {
        backgroundColor: '#c7d3b8',
    },
    btnTxt: {
        color: 'white',
        fontSize: 13,
        marginTop: 3
    }
});

export default MenuPanel;
