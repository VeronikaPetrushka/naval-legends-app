import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import library from '../constants/library.js';
import Icons from './Icons.jsx';
import CreateBrochure from './CreateBrochure.jsx';

const Library = () => {
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userBrochures, setUserBrochures] = useState([]);
    const [brochureToEdit, setBrochureToEdit] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    const close = 'close';
    const arrow = 'arrow';

    const loadUserBrochures = useCallback(async () => {
        setLoading(true); // Start loading
        try {
            const storedUserBrochures = await AsyncStorage.getItem('UserBrochures');
            if (storedUserBrochures) {
                setUserBrochures(JSON.parse(storedUserBrochures));
            } else {
                setUserBrochures([]);
            }
        } catch (error) {
            console.error('Failed to load user brochures:', error);
            Alert.alert("Error", "Failed to load brochures.");
        } finally {
            setLoading(false); // End loading
        }
    }, []);

    const handleBrochureSubmit = async (newBrochure) => {
        let updatedBrochures;
        if (brochureToEdit) {
            updatedBrochures = userBrochures.map(brochure => 
                brochure.name === brochureToEdit.name ? newBrochure : brochure
            );
        } else {
            updatedBrochures = [...userBrochures, newBrochure];
        }
        setUserBrochures(updatedBrochures);
        await AsyncStorage.setItem('UserBrochures', JSON.stringify(updatedBrochures));
        setBrochureToEdit(null);
    };


    useEffect(() => {
        loadUserBrochures();
    }, [loadUserBrochures])

    const combinedBrochures = [...library, ...userBrochures];

    const deleteUserBrochure = async (item) => {
        Alert.alert(
            "Delete Brochure",
            "Are you sure you want to delete this brochure?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete", 
                    onPress: async () => {
                        const updatedBrochures = userBrochures.filter(brochure => brochure.name !== item.name);
                        setUserBrochures(updatedBrochures);
                        await AsyncStorage.setItem('UserBrochures', JSON.stringify(updatedBrochures));
                        Alert.alert("Deleted", "Brochure has been removed from your album.");
                    }
                }
            ]
        );
    };

    const handleEditBrochure = (item) => {
        setBrochureToEdit(item);
        setIsModalVisible(true);
    };

    const onScrollEnd = (event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / styles.card.width);
        setSelectedIndex(index);
    };

    const toggleCard = (item) => {
        if (selectedCard && selectedCard.name === item.name) {
            setSelectedCard(null); 
        } else {
            setSelectedCard(item);
        }
    };

    const handleGoBack = () => {
        navigation.navigate('HomeScreen');
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {selectedCard && selectedCard.name === item.name ? (
                <View style={styles.descSideContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedCard(null)}>
                        <Icons type={close} />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={styles.factContainer} style={styles.scrollView}>
                        <Text style={styles.factTitle}>{item.admiral || item.name}</Text>
                        {item.description ? <Text style={styles.factDescription}>{item.description}</Text> : null}
                    </ScrollView>
                </View>
            ) : (
                <TouchableOpacity style={styles.cardFront} onPress={() => toggleCard(item)}>
                    <Image 
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        style={styles.image} 
                    />
                    <Text style={styles.admiralName}>{item.admiral || item.name}</Text>
                    <Text style={styles.title}>{item.title ? item.title : ''}</Text>
                </TouchableOpacity>
            )}
    
            {userBrochures.some(brochure => brochure.name === item.name) && (
                <View style={styles.actionButtons}>
                    <TouchableOpacity onPress={() => deleteUserBrochure(item)} style={styles.deleteButton}>
                        <Icons type={'delete'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleEditBrochure(item)} style={styles.editButton}>
                        <Icons type={'edit'} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
    
    const handleAddBrochure = () => {
        setBrochureToEdit(null);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#fff" />
            ) : (
                <>
                    <TouchableOpacity style={styles.goBackIcon} onPress={handleGoBack}>
                        <Icons type={arrow}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.plusIcon} onPress={handleAddBrochure}>
                        <Icons type={'plus'}/>
                    </TouchableOpacity>
                    <FlatList
                        data={combinedBrochures}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.admiral || item.name}
                        horizontal
                        pagingEnabled
                        onScroll={onScrollEnd}
                        showsHorizontalScrollIndicator={false}
                        style={styles.flatList}
                    />
                    <View style={styles.dotsContainer}>
                        {combinedBrochures.map((_, index) => (
                            <View 
                                key={index} 
                                style={[styles.dot, selectedIndex === index ? styles.activeDot : null]} 
                            />
                        ))}
                    </View>

                    <CreateBrochure 
                        visible={isModalVisible} 
                        onClose={closeModal}
                        onSubmit={handleBrochureSubmit}
                        brochureToEdit={brochureToEdit}
                    />
                </>
            )}
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: '#625746',
        height: '110%',
        width: '100%',
    },
    descSideContainer: {
        width: '100%',
        height: '100%',
        padding: 10
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    flatList: {
        // height: 600,
        marginTop: 60
    },
    card: {
        width: 365,
        // width: 345,
        height: 530,
        marginHorizontal: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        elevation: 4,
    },
    cardFront: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },
    admiralName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 10,
    },
    factContainer: {
        padding: 15,
        alignItems: 'center',
    },
    scrollView: {
        maxHeight: 600,
    },
    factTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    factDescription: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
        position: 'absolute',
        bottom: 195,
        left: '5%'
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 3,
        backgroundColor: '#cfccc7',
    },
    activeDot: {
        backgroundColor: '#27221c',
    },
    goBackIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 10,
        left: 10
    },
    plusIcon: {
        width: 60,
        height: 60,
        padding: 10,
        position: 'absolute',
        top: 10,
        right: 10
    },
    actionButtons: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 70
    },
    deleteButton: {
        padding: 10,
        width: 55,
        height: 55,
    },
    editButton: {
        padding: 10,
        width: 55,
        height: 55,
    },
});

export default Library;
