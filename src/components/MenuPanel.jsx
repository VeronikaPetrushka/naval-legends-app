import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
// import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons';

const MenuPanel = () => {
    // const navigation = useNavigation();
    // const route = useRoute();
    // const [isQuizVisited, setIsQuizVisited] = useState(false);

    const quiz = 'quiz';
    const fight = 'fight';
    const stories = 'stories';
    const shop = 'shop';
    const leaderBoard = 'leader-board';

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const checkQuizVisited = async () => {
    //             try {
    //                 const visited = await AsyncStorage.getItem('quizVisited');
    //                 setIsQuizVisited(!!visited); 
    //             } catch (error) {
    //                 console.error('Failed to retrieve quizVisited:', error);
    //             }
    //         };

    //         checkQuizVisited();
    //     }, [])
    // );

    // const handleNavigateToHome = () => {
    //     navigation.navigate('MainMenuScreen');
    // };

    // const handleNavigateToGallery = () => {
    //     navigation.navigate('AlbumScreen');
    // };

    // const handleNavigateToStore = () => {
    //     if (isQuizVisited) {
    //         navigation.navigate('StoreScreen');
    //     } else {
    //         Alert.alert(
    //             "Store Unavailable",
    //             "You need to complete at least one quiz before shopping!",
    //             [
    //                 {
    //                     text: "Close",
    //                     onPress: () => console.log("Alert closed"),
    //                     style: "cancel"
    //                 },
    //                 {
    //                     text: "Go to Quiz",
    //                     onPress: () => navigation.navigate('NewGameScreen')
    //                 }
    //             ]
    //         );
    //     }
    // };

    // const handleNavigateToResults = () => {
    //     navigation.navigate('ResultsScreen');
    // };

    // const handleNavigateToSettings = () => {
    //     navigation.navigate('SettingsScreen');
    // };

    // const isCurrent = (screen) => route.name === screen;

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                {/* // onPress={handleNavigateToStore} 
                // style={[styles.button, isCurrent('StoreScreen') && styles.activeButton]} */}
                <Icons type={quiz} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Quiz</Text>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                {/* // onPress={handleNavigateToGallery} 
                // style={[styles.button, isCurrent('AlbumScreen') && styles.activeButton]} */}
                <Icons type={fight} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Fight</Text>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                {/* // onPress={handleNavigateToHome} 
                // style={[styles.button, isCurrent('MainMenuScreen') && styles.activeButton]} */}
                <Icons type={stories} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Stories</Text>
            </View>

            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                {/* // onPress={handleNavigateToResults} 
                // style={[styles.button, isCurrent('ResultsScreen') && styles.activeButton]} */}
                <Icons type={shop} />
            </TouchableOpacity>
            <Text style={styles.btnTxt}>Shop</Text>
            </View>
        
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button}>
                {/* // onPress={handleNavigateToSettings} 
                // style={[styles.button, isCurrent('SettingsScreen') && styles.activeButton]} */}
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
        // borderRadius: 40,
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
