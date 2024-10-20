import React, { useState } from "react";
import { View, Text, Modal, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Image } from 'react-native';

const width = Dimensions.get('screen').width;

type ConfirmationModalProps = {
    title: string,
    desc: string,
    approveButton: string,
    rejectButton: string,
    setShowConfirmationModal: (value: boolean) => void,
    showConfirmationModal: boolean,
    method: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title,
    desc,
    approveButton,
    rejectButton,
    setShowConfirmationModal,
    showConfirmationModal,
    method
}) => {

    return (
        <View style={{flex: 1}}>
            <Modal animationType='fade' visible={showConfirmationModal} transparent={true} statusBarTranslucent>
                <SafeAreaView style={styles.modalDim}>
                    <View style={styles.modalBG}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginHorizontal: 15 }}>
                            <Image source={require('../Assets/Image/AddContactIllust.png')} />
                            <Text style={styles.titleText}>{title}</Text>
                            <Text style={styles.descText}>{desc}</Text>
                            <View style={{ justifyContent: 'center', marginTop: 17 }}>
                                <TouchableOpacity onPress={() => {setShowConfirmationModal(false); method(); }} style={styles.approveButton}>
                                    <Text style={styles.buttonText}>
                                        {approveButton}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: 'center', marginTop: 8 }}>
                                <TouchableOpacity onPress={() => {setShowConfirmationModal(false)}} style={styles.rejectButton}>
                                    <Text style={styles.rejectButtonText}>
                                        {rejectButton}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default ConfirmationModal;

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
    approveButton: {
        backgroundColor: '#505383',
        borderRadius: 10,
        paddingVertical: 12,
        width: width / 1.5,
        marginLeft: 10
    },
    buttonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#FFF',
        alignSelf: 'center'
    },
    rejectButton: {
        borderColor: '#A52A2A',
        borderWidth: 1,
        borderRadius: 10,
        width: width / 1.5,
        paddingVertical: 12,
        marginLeft: 10
    },
    rejectButtonText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        color: '#FF1212',
        alignSelf: 'center'
    }
});
