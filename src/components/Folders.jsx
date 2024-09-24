import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';

const Folders = () => {
    const navigation = useNavigation();
    const [folders, setFolders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const loadFolders = useCallback(async () => {
        try {
            const storedFolders = await AsyncStorage.getItem('UserFolders');
            if (storedFolders) {
                setFolders(JSON.parse(storedFolders));
            } else {
                setFolders([]);
            }
        } catch (error) {
            console.error('Failed to load folders:', error);
            Alert.alert("Error", "Failed to load folders.");
        }
    }, []);

    const handleCreateOrEditFolder = async () => {
        if (newFolderName.trim().length === 0) {
            Alert.alert('Error', 'Folder name cannot be empty.');
            return;
        }

        if (isEditing) {
            const updatedFolders = folders.map(folder =>
                folder.id === currentFolderId
                    ? { ...folder, name: newFolderName.trim() }
                    : folder
            );
            setFolders(updatedFolders);
            await AsyncStorage.setItem('UserFolders', JSON.stringify(updatedFolders));
        } else {
            const newFolder = { id: Date.now().toString(), name: newFolderName.trim() };
            const updatedFolders = [...folders, newFolder];
            setFolders(updatedFolders);
            await AsyncStorage.setItem('UserFolders', JSON.stringify(updatedFolders));
        }

        setNewFolderName('');
        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentFolderId(null);
    };

    const deleteFolder = async (id) => {
        Alert.alert(
            "Delete Folder",
            "Are you sure you want to delete this folder?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", 
                    onPress: async () => {
                        const updatedFolders = folders.filter(folder => folder.id !== id);
                        setFolders(updatedFolders);
                        await AsyncStorage.setItem('UserFolders', JSON.stringify(updatedFolders));
                        Alert.alert("Deleted", "Folder has been removed.");
                    }
                }
            ]
        );
    };

    const editFolder = (folder) => {
        setNewFolderName(folder.name);
        setCurrentFolderId(folder.id);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    useEffect(() => {
        loadFolders();
    }, [loadFolders]);

    const handleGoBack = () => {
        navigation.navigate('HomeScreen');
    };

    const navigateToFolder = (folder) => {
        navigation.navigate('FolderDetailsScreen', { folder });
    };

    const renderFolder = ({ item }) => (
        <TouchableOpacity style={styles.folder} onPress={() => navigateToFolder(item)}>
            <View style={styles.folderIcon}>
                <Icons type={'folder'}/>
            </View>
            <Text style={styles.folderName}>{item.name}</Text>
            <View style={styles.folderActions}>
                <TouchableOpacity onPress={() => editFolder(item)} style={styles.editButton}>
                    <Icons type={'edit'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteFolder(item.id)} style={styles.deleteButton}>
                    <Icons type={'delete'} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
        source={require('../assets/background/home.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackIcon} onPress={handleGoBack}>
                <Icons type={'arrow'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
                <Icons type={'add'}/>
            </TouchableOpacity>

            <Text style={styles.title}>Folders</Text>

            <FlatList
                data={folders}
                renderItem={renderFolder}
                keyExtractor={(item) => item.id}
                style={styles.folderList}
            />

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{isEditing ? 'Edit Folder' : 'Create Folder'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter folder name"
                            value={newFolderName}
                            onChangeText={setNewFolderName}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleCreateOrEditFolder}>
                                <Text style={styles.modalButtonText}>{isEditing ? 'Save' : 'Create'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        width: '100%',
        height: '100%'
    },
    backgroundImage: {
        width: '100%',
        height: '110%',
        justifyContent: 'center',
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: 'white'
    },
    folderList: {
        marginTop: 20,
        marginBottom: 100
    },
    folder: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 150
    },
    folderName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    folderActions: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    deleteButton: {
        padding: 10,
        width: 55,
        height: 55
    },
    editButton: {
        padding: 10,
        width: 55,
        height: 55
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#8d7d65',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '48%',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    folderIcon: {
        width: 120,
        height: 120
    },
    goBackIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 20,
        left: 20,
    },
});

export default Folders;
