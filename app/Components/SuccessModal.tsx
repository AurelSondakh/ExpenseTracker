import React, { useState } from "react";
import { View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';

const width = Dimensions.get('screen').width;

type SuccessModalProps = {
    title: string,
    description: string,
    buttonText: string,
    method: () => void,
    showModal: boolean,
    setShowModal: (value: boolean) => void,
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    title,
    description,
    buttonText,
    method,
    showModal,
    setShowModal
}) => {

    return (
        <View style={{flex: 1}}>
            <Modal animationType='fade' visible={showModal} transparent={true} statusBarTranslucent>
                <SafeAreaView style={styles.modalDim}>
                    <View style={styles.modalBG}>
                        <View style={styles.modalContent}>
                            <Image source={require('../Assets/Image/SuccessIllust.png')} />
                            <Text style={styles.titleText}>{title}</Text>
                            <Text style={styles.descText}>{description}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => {setShowModal(false); method();}} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        {buttonText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

export default SuccessModal;

const styles = StyleSheet.create({
    modalDim: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalBG: {
        borderRadius: 15,
        backgroundColor: '#FFF',
        overflow: 'hidden',
        width: width * 0.8,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15
    },
    titleText: {
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        marginBottom: 4,
        marginTop: 16,
        color: '#3B3B3B'
    },
    descText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        paddingHorizontal: 10,
        textAlign: 'center',
        color: '#898A8D'
    },
    button: {
        backgroundColor: '#E97802',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 96,
        marginLeft: 10
    },
    buttonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#FFF',
        alignSelf: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        marginTop: 17
    }
});
