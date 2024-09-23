import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import library from '../constants/library.js';
import Icons from './Icons.jsx';

const Library = () => {
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedCard, setSelectedCard] = useState(null);

    const close = 'close';
    const arrow = 'arrow'

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
                    <TouchableOpacity style={styles.closeButton} onPress={() => {
                        setSelectedCard(null);
                    }}>
                        <Icons type={close} />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={styles.factContainer} style={styles.scrollView}>
                        <Text style={styles.factTitle}>{item.admiral}</Text>
                        {item.description ? <Text style={styles.factDescription}>{item.description}</Text> : null}
                    </ScrollView>
                </View>
            ) : (
                <TouchableOpacity style={styles.cardFront} onPress={() => toggleCard(item)}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.admiralName}>{item.admiral}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.goBackIcon}
                onPress={handleGoBack}
                >
                    <Icons type={arrow}/>
            </TouchableOpacity>
            <FlatList
                data={library}
                renderItem={renderItem}
                keyExtractor={(item) => item.admiral}
                horizontal
                pagingEnabled
                onScroll={onScrollEnd}
                showsHorizontalScrollIndicator={false}
                style={styles.flatList}
            />
            <View style={styles.dotsContainer}>
                {library.map((_, index) => (
                    <View 
                        key={index} 
                        style={[styles.dot, selectedIndex === index ? styles.activeDot : null]} 
                    />
                ))}
            </View>
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
        height: 600,
        marginTop: 60
    },
    card: {
        minWidth: 290,
        width: 345,
        height: 530,
        marginHorizontal: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        elevation: 2,
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
        marginTop: 10
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
    }
});

export default Library;
