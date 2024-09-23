import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Stickers = () => {
    const navigation = useNavigation();
    const [downloadedStickers, setDownloadedStickers] = useState([]);

    const fetchDownloadedStickers = async () => {
        try {
            const stickers = await AsyncStorage.getItem('stickers');
            if (stickers) {
                setDownloadedStickers(JSON.parse(stickers));
            } else {
                setDownloadedStickers([]);
            }
        } catch (error) {
            console.log('Error fetching stickers', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchDownloadedStickers();
        }, [])
    );

    const handleGoBack = () => {
        navigation.navigate('HomeScreen');
      };

    return (
        <ImageBackground
        source={require('../assets/background/bonus.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity
              style={styles.goBackIcon}
              onPress={handleGoBack}
            >
              <Icons type={'arrow'}/>
            </TouchableOpacity>
                <Text style={styles.title}>
                    Stickers
                </Text>
            {downloadedStickers.length === 0 ? (
                <Text style={styles.message}>
                    You do not have stickers yet. Earn it by completing Newcomer quizzes!
                </Text>
            ) : (
                <ScrollView contentContainerStyle={styles.stickerContainer}>
                    {downloadedStickers.map((sticker, index) => (
                        <Image key={index} source={sticker} style={styles.stickerImage} />
                    ))}
                </ScrollView>
            )}
        </View>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
        paddingTop: 30
    },
    backgroundImage: {
        width: '100%',
        height: '110%',
        justifyContent: 'center',
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      },
      goBackIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 15,
        left: 10
      },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 30
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: '50%',
        color: 'white',
        fontWeight: 900
    },
    stickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    stickerImage: {
        width: '44%',
        height: 160,
        margin: 10,
        resizeMode: 'cover',
    },
});

export default Stickers;
