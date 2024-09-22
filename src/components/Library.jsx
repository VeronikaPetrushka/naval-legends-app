import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import library from '../constants/library.js';

const Library = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedBrochure, setSelectedBrochure] = useState(null);

    const onScrollEnd = (event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / styles.card.width);
        setSelectedIndex(index);
    };

    const toggleBrochure = (item) => {
        if (selectedBrochure && selectedBrochure.name === item.name) {
            setSelectedBrochure(null);
        } else {
            setSelectedBrochure(item);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => toggleBrochure(item)}>
            {selectedBrochure && selectedBrochure.name === item.name ? (
                <ScrollView contentContainerStyle={styles.factContainer} style={styles.scrollView}>
                    <Text style={styles.factTitle}>{item.admiral}</Text>
                    <Text style={styles.factDescription}>
                        {item.fact ? item.fact.description : (item.date ? item.date : '')}
                    </Text>
                    {item.description ? <Text style={styles.factDescription}>{item.description}</Text> : null}
                </ScrollView>
            ) : (
                <View style={styles.cardFront}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.admiralName}>{item.admiral}</Text>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
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
    flatList: {
        height: 600,
        marginBottom: 20,
        marginTop: 30
    },
    card: {
        minWidth: 290,
        width: 365,
        height: 600,
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
        height: 450,
        borderRadius: 10,
    },
    admiralName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        color: '#555',
    },
    factContainer: {
        padding: 15,
        alignItems: 'center',
    },
    scrollView: {
        maxHeight: 600, // Ensure ScrollView doesn't exceed card height
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
        bottom: 210,
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
});

export default Library;
