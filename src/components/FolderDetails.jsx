import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const FolderDetail = ({ folder }) => {
    const navigation = useNavigation();
    const [images, setImages] = useState(folder.images || []);

    useEffect(() => {
        loadFolderImages();
    }, []);

    const loadFolderImages = async () => {
        try {
            const storedFolders = await AsyncStorage.getItem('UserFolders');
            if (storedFolders) {
                const folders = JSON.parse(storedFolders);
                const currentFolder = folders.find(f => f.id === folder.id);
                if (currentFolder && currentFolder.images) {
                    setImages(currentFolder.images);
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load folder images.');
        }
    };

    const handleAddImage = () => {
        const options = {
            mediaType: 'photo',
        };
    
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const selectedImage = response.assets[0];
                const source = { uri: selectedImage.uri };
    
                const updatedImages = [...images, source];
                setImages(updatedImages);
    
                const updatedFolder = { ...folder, images: updatedImages };
                await updateFolderData(updatedFolder);
            }
        });
    };

    const updateFolderData = async (updatedFolder) => {
        try {
            const storedFolders = await AsyncStorage.getItem('UserFolders');
            const folders = JSON.parse(storedFolders);
            const updatedFolders = folders.map(f => (f.id === folder.id ? updatedFolder : f));
            await AsyncStorage.setItem('UserFolders', JSON.stringify(updatedFolders));
        } catch (error) {
            Alert.alert('Error', 'Failed to save image.');
        }
    };

    const renderImage = ({ item }) => (
        <Image source={{ uri: item.uri }} style={styles.image} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
                <Icons type="arrow" />
            </TouchableOpacity>
            <Text style={styles.title}>{folder.name}</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
                <Icons type="add" />
            </TouchableOpacity>

            {images.length > 0 ? (
                <FlatList
                    data={images}
                    renderItem={renderImage}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    style={styles.imageList}
                />
            ) : (
                <Text style={styles.noImagesText}>No images in this folder.</Text>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#8d7d65',
        height: '110%',
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 70,
        color: 'white'
    },
    goBackButton: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    addButton: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: 70,
        height: 70,
        position: 'absolute',
        right: 15,
        top: 15
    },
    imageList: {
        padding: 10,
        width: '100%',
        marginBottom: 100
    },
    image: {
        width: '45%',
        height: 180,
        margin: 10,
        resizeMode: 'cover'
    },
    noImagesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: 'white'
    },
});

export default FolderDetail;
