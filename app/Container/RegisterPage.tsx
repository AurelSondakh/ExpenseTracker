import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DropdownET from '../Components/DropdownET';
import TextInputET from '../Components/TextInputET';
import { registerUser } from '../Data/Auth';
import ErrorModal from '../Components/ErrorModal';
import SuccessModal from '../Components/SuccessModal';

type RootStackParamList = {
    LoginPage: undefined;
    RegisterPage: undefined;
};

type RegisterFormProps = {
    username: string,
    password: string,
    role: string,
}

const registerFormInitialState = {
    username: '',
    password: '',
    role: '',
}

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterPage'>;

const RegisterPage = () => {
    const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
    const [roleFocus, setRoleFocus] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [registerForm, setRegisterForm] = useState<RegisterFormProps>(registerFormInitialState);

    const roleDropdownData = [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
    ];

    const handleRegister = async (): Promise<void> => {
        try {
          await registerUser(registerForm);
          setShowSuccessModal(true)
        } catch (error) {
          console.error("Error during registration:", error);
          setShowErrorModal(true)
        }
    };

    useEffect(() => {
        if(registerForm?.username !== '' && registerForm?.password !== '' && registerForm?.role !== '') {
          setDisable(false)
        } else setDisable(true)
    }, [registerForm])

    const onHandleChange = (value: string, key: keyof RegisterFormProps) => {
        setRegisterForm(prevState => ({
            ...prevState,
            [key]: value,
        }));
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../Assets/Image/loginIllustration.png')}
                style={styles.image}
            />
            <View style={styles.formContainer}>
                <TextInputET 
                    title='Username'
                    placeholder='Input username'
                    focus={usernameFocus}
                    value={registerForm?.username}
                    setText={text => onHandleChange(text, 'username')}
                    setIsFocused={value => setUsernameFocus(value)}
                />
                <TextInputET 
                    title='Password'
                    placeholder='Input password'
                    focus={passwordFocus}
                    value={registerForm?.password}  
                    setText={text => onHandleChange(text, 'password')}
                    setIsFocused={value => setPasswordFocus(value)}
                    secureText={true}
                />
                <DropdownET
                    data={roleDropdownData}
                    title='Role'
                    focus={roleFocus}
                    selectedChoice={registerForm?.role}
                    setSelectedChoice={text => onHandleChange(text, 'role')}
                    setIsFocused={value => setRoleFocus(value)}
                />
                <TouchableOpacity
                    disabled={disable}
                    onPress={() => handleRegister()}
                    style={!disable ? styles.registerButton : styles.disableregisterButton}
                >
                    <Text style={styles.registerButtonText}>REGISTER</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={styles.loginInfoText}>
                        Already have an account ?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                        <Text style={styles.loginButtonText}>
                        Login Now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showErrorModal &&
              <ErrorModal 
                title='Register Failed'
                description='Username already exists or other issue occurred'
                buttonText='Close'
                showModal={showErrorModal}
                setShowModal={value => setShowErrorModal(value)}
              />
            }
            {showSuccessModal &&
              <SuccessModal
                title='Register Success'
                description='You can now login'
                buttonText='Close'
                method={() => navigation.navigate('LoginPage')}
                showModal={showSuccessModal}
                setShowModal={value => setShowSuccessModal(value)}
              />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 250,
      height: 250,
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: -80,
    },
    formContainer: {
      width: 300,
    },
    picker: {
      borderBottomWidth: 1,
      marginTop: -10,
      borderRadius: 10,
      fontFamily: 'Poppins-Regular',
      color: '#000',
    },
    placeholder: {
      borderBottomWidth: 1,
      marginTop: -10,
      borderRadius: 10,
      fontFamily: 'Poppins-Regular',
      color: '#A2A2A2',
    },
    registerButton: {
      padding: 10,
      borderWidth: 1,
      backgroundColor: '#505383',
      borderRadius: 50,
      marginTop: 30,
    },
    disableregisterButton: {
      padding: 10,
      borderWidth: 0,
      backgroundColor: '#A2A2A2',
      borderRadius: 50,
      marginTop: 30,
    },
    registerButtonText: {
      fontFamily: 'Poppins-Bold',
      color: '#FFF',
      fontSize: 14,
      textAlign: 'center',
    },
    loginContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      justifyContent: 'center'
    },
    loginInfoText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      marginRight: 3
    },
    loginButtonText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      color: '#505383'
    }
})

export default RegisterPage;
