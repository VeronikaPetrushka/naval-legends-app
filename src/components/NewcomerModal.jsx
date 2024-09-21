import React, {useState} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from './Icons';

const NewcomerModal = ({ visible, onClose }) => {

    const close = 'close';

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.modalTitle}>Newcomer Rules</Text>
                    <Text style={styles.modalText}>
                    The quiz has 7 levels of completion, each level corresponds to a certain topic. You can choose the topic yourself.
                    </Text>
                    <Text style={styles.modalText}>
                    The quiz has a time limit of 60 seconds.
                   </Text>
                   <Text style={styles.modalTextItalic}>
                    True / False passing style.
                   </Text>
                   <Text style={styles.modalText}>
                   You receives 100 coins for the correct answer. Coins can be used to buy additional hints to make it easier to pass the level. After successfully passing the level, you receives an original sticker.                   </Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icons type={close}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        height: '54%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30
    },
    modalText: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTextItalic: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
    }
});

export default NewcomerModal;
