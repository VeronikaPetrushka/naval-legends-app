import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icons from './Icons';

const AboutModal = ({ visible, onClose }) => {

    const close = 'close';
    const admiral = 'admiral'

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
                    <View style={styles.admiral}>
                        <Icons type={admiral}/>
                    </View>
                    <Text style={styles.modalText}>
                    Welcome to <Text style={styles.bold}>Naval Legends: Admiral’s Duel!</Text>
                    </Text>
                    <Text style={styles.modalText}>
                    At <Text style={styles.bold}>Naval Legends</Text>, we are passionate about bringing the excitement of historical naval warfare to your fingertips. Our app is designed for those who revel in strategic thinking and have a fascination with epic maritime battles.
                    </Text>
                    <Text style={styles.modalText}>
                    In <Text style={styles.bold}>Naval Legends: Admiral’s Duel</Text>, we transport you to the heart of some of history's most pivotal naval conflicts. As an admiral, you'll command your fleet through intense strategic engagements and make critical decisions that will shape the outcome of battles. Our goal is to provide an immersive experience that not only challenges your tactical acumen but also deepens your understanding of naval history.
                    </Text>
                    <Text style={styles.modalText}>
                    We blend rich historical detail with engaging gameplay to create an app that is both educational and entertaining. Whether you're a history enthusiast, a strategy game lover, or someone looking to experience the thrill of naval command, <Text style={styles.bold}>Naval Legends</Text> offers something for you.
                    </Text>
                    <Text style={styles.modalText}>
                    Join us on this adventure and become a part of maritime history. Dive into the world of legendary naval duels, and let your strategic prowess shine!
                    </Text>
                    <Text style={styles.modalText}>
                    Happy sailing, The <Text style={styles.bold}>Naval Legends</Text> Team
                    </Text>
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
    ScrollView: {

    },
    modalContent: {
        width: '90%',
        height: '75%',
        padding: 20,
        paddingTop: 50,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    modalText: {
        fontSize: 19,
        marginBottom: 10,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold'
    },
    closeButton: {
        padding: 10,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    admiral: {
        width: 150,
        height: 140,
        marginBottom: 20,
        alignSelf: 'center'
    }
});

export default AboutModal;
