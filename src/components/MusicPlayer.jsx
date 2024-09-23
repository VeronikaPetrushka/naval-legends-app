import React from 'react';
import { View } from 'react-native';
import { useMusic } from '../constants/context.js';

const MusicPlayer = () => {
    const { isPlaying } = useMusic();

    return <View />;
};

export default MusicPlayer;
