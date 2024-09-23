import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Sound from 'react-native-sound';

// Enable playback in iOS
Sound.setCategory('Playback');

const MusicPlayer = ({ play }) => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        // Load and prepare the sound only once
        const music = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                return;
            }
            console.log('Sound loaded successfully');
            music.setNumberOfLoops(-1); // Set the music to loop indefinitely
            setSound(music);
        });

        return () => {
            // Cleanup: stop and release the sound when the component unmounts
            if (music) {
                music.stop(() => {
                    music.release();
                });
            }
        };
    }, []);

    useEffect(() => {
        // Toggle play/pause based on the 'play' prop
        if (sound) {
            if (play) {
                console.log('Music playing');
                sound.play((success) => {
                    if (!success) {
                        console.log('Playback failed due to audio decoding errors');
                        sound.stop(); // Stop if there was a playback issue
                    }
                });
            } else {
                sound.pause(); // Pause instead of stop to avoid loading again
                console.log('Music paused');
            }
        }
    }, [play, sound]);

    return <View />;
};

export default MusicPlayer;
