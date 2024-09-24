import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert, SafeAreaView, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const FolderDetail = ({ folder }) => {
    const navigation = useNavigation();
    const [images, setImages] = useState(folder.images || []);
    const [selectedImage, setSelectedImage] = useState(null); // State to handle selected image

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

    const handleImagePress = (item) => {
        setSelectedImage(item === selectedImage ? null : item); // Select or deselect image
    };

    const handleDeleteImage = async () => {
        if (selectedImage) {
            const updatedImages = images.filter(image => image.uri !== selectedImage.uri);
            setImages(updatedImages);
            const updatedFolder = { ...folder, images: updatedImages };
            await updateFolderData(updatedFolder);
            setSelectedImage(null); // Reset selected image after deletion
        }
    };

    const renderImage = ({ item }) => (
        <TouchableOpacity onPress={() => handleImagePress(item)} style={styles.imageWrapper}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            {selectedImage && selectedImage.uri === item.uri && (
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteImage}>
                        <Icons type={'delete'}/>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
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
        color: 'white',
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
        top: 15,
    },
    imageList: {
        padding: 10,
        width: '100%',
        marginBottom: 100,
    },
    imageWrapper: {
        position: 'relative',
        width: '45%',
        height: 180,
        margin: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        padding: 10,
        width: 80,
        height: 80
    },
    noImagesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: 'white',
    },
});

export default FolderDetail;
