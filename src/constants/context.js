import React, { createContext, useContext, useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';

Sound.setCategory('Playback');

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const music = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                return;
            }
            console.log('Sound loaded successfully');
            music.setNumberOfLoops(-1);
            setSound(music);
        });

        return () => {
            if (sound) {
                sound.stop(() => {
                    sound.release();
                });
            }
        };
    }, []);

    useEffect(() => {
        if (sound) {
            if (isPlaying) {
                sound.play((success) => {
                    if (!success) {
                        console.log('Playback failed due to audio decoding errors');
                        sound.stop();
                    }
                });
            } else {
                sound.pause();
            }
        }
    }, [isPlaying, sound]);

    const togglePlay = async () => {
        const newState = !isPlaying;
        setIsPlaying(newState);
        await AsyncStorage.setItem('toggleLoudness', JSON.stringify(newState));
    };

    return (
        <MusicContext.Provider value={{ isPlaying, togglePlay }}>
            {children}
        </MusicContext.Provider>
    );
};
