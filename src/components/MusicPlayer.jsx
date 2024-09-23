import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Sound from 'react-native-sound';

// Enable playback in iOS
Sound.setCategory('Playback');

const MusicPlayer = ({ play }) => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        // Load and prepare the sound
        const music = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load sound', error);
                return;
            }
            console.log('Sound loaded successfully');
            // Set the music to loop
            music.setNumberOfLoops(-1);
            setSound(music);
        });

        return () => {
            // Cleanup: Stop and release the sound when the component unmounts
            if (sound) {
                sound.stop(() => {
                    sound.release();
                });
            }
        };
    }, []);

    useEffect(() => {
        // Toggle play/pause based on the 'play' prop
        if (sound) {
            if (play) {
                sound.play((success) => {
                    if (!success) {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });
            } else {
                sound.stop(() => {
                    console.log('Music stopped');
                });
            }
        }
    }, [play, sound]);

    return <View />;
};

export default MusicPlayer;
