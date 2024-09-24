import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen.jsx';
import QuizModeScreen from './src/screens/QuizModeScreen.jsx';
import NewcomerTopicsScreen from './src/screens/NewcomerTopicsScreen.jsx';
import ExpertTopicsScreen from './src/screens/ExpertTopicsScreen.jsx';
import NewcomerQuizScreen from './src/screens/NewcomerQuizScreen.jsx';
import ExpertQuizScreen from './src/screens/ExpertQuizScreen.jsx';
import LeaderboardScreen from './src/screens/LeaderboardScreen.jsx';
import FightScreen from './src/screens/FightScreen.jsx';
import AnalysisScreen from './src/screens/AnalysisScreen.jsx';
import LibraryScreen from './src/screens/LibraryScreen.jsx';
import BattleMapScreen from './src/screens/BattleMapScreen.jsx';
import DailyBonusScreen from './src/screens/DailyBonusScreen.jsx';
import StickersScreen from './src/screens/StickersScreen.jsx';
import { MusicProvider } from './src/constants/context.js';
import MusicPlayer from './src/components/MusicPlayer';
import FoldersScreen from './src/screens/FoldersScreen.jsx';
import FolderDetailsScreen from './src/screens/FolderDetailsScreen.jsx'

enableScreens();

const Stack = createStackNavigator();

const App = () => {
    return (
        <MusicProvider>
            <NavigationContainer>
                <View style={{ width: '100%', height: "100%" }}>
                    <MusicPlayer />
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen 
                            name="HomeScreen" 
                            component={HomeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="QuizModeScreen" 
                            component={QuizModeScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="NewcomerTopicsScreen" 
                            component={NewcomerTopicsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="ExpertTopicsScreen" 
                            component={ExpertTopicsScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="NewcomerQuizScreen" 
                            component={NewcomerQuizScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="ExpertQuizScreen" 
                            component={ExpertQuizScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="LeaderboardScreen" 
                            component={LeaderboardScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="FightScreen" 
                            component={FightScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="AnalysisScreen" 
                            component={AnalysisScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="LibraryScreen" 
                            component={LibraryScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="BattleMapScreen" 
                            component={BattleMapScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="DailyBonusScreen" 
                            component={DailyBonusScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="StickersScreen" 
                            component={StickersScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="FoldersScreen" 
                            component={FoldersScreen} 
                            options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                            name="FolderDetailsScreen" 
                            component={FolderDetailsScreen} 
                            options={{ headerShown: false }} 
                        />
                    </Stack.Navigator>
                </View>
            </NavigationContainer>
        </MusicProvider>
    );
};

export default App;
