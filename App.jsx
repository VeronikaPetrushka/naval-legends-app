import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen.jsx';
import QuizModeScreen from './src/screens/QuizModeScreen.jsx';
import NewcomerTopicsScreen from './src/screens/NewcomerTopicsScreen.jsx';
import ExpertTopicsScreen from './src/screens/ExpertTopicsScreen.jsx';
import NewcomerQuizScreen from './src/screens/NewcomerQuizScreen.jsx';
import ExpertQuizScreen from './src/screens/ExpertQuizScreen.jsx';
import LeaderboardScreen from './src/screens/LeaderboardScreen.jsx';
import FightScreen from './src/screens/FightScreen.jsx'
import AnalysisScreen from './src/screens/AnalysisScreen.jsx'
import LibraryScreen from './src/screens/LibraryScreen.jsx'

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;