// src/components/MusicPlayer.js
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Sound from 'react-native-sound';

// Enable playback in iOS
Sound.setCategory('Playback');

const MusicPlayer = ({ play }) => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        console.log('Loading sound...');
        const music = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                return;
            }
            console.log('Sound loaded successfully');
            // Loop the music
            music.setNumberOfLoops(-1);
            setSound(music);
        });
    
        return () => {
            if (sound) {
                sound.stop();
                sound.release();
            }
        };
    }, []);
    

    useEffect(() => {
        if (play && sound) {
            sound.play((success) => {
                if (success) {
                    console.log('Successfully finished playing');
                } else {
                    console.log('Playback failed due to audio decoding errors');
                }
            });
        } else if (sound) {
            sound.pause();
        }
    }, [play, sound]);

    return <View />;
};

export default MusicPlayer;
