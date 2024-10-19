import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextInputET from '../Components/TextInputET';

type RootStackParamList = {
  LoginPage: undefined;
  RegisterPage: undefined;
};

type LoginFormProps = {
  username: string,
  password: string,
}

const LoginFormInitialState = {
  username: '',
  password: '',
}

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginPage'>;

const LoginPage = () => {
  const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const [loginForm, setLoginForm] = useState<LoginFormProps>(LoginFormInitialState);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const validateLoginCredential = () => {
    console.log(loginForm, 'LOGIN FORM');
  };

  useEffect(() => {
    if(loginForm?.username !== '' && loginForm?.password !== '') {
      setDisable(false)
    } else setDisable(true)
  }, [loginForm])

  const onHandleChange = (value: string, key: keyof LoginFormProps) => {
    setLoginForm(prevState => ({
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
          value={loginForm?.username}
          setText={text => onHandleChange(text, 'username')}
          setIsFocused={value => setUsernameFocus(value)}
        />
        <TextInputET 
          title='Password'
          placeholder='Input password'
          focus={passwordFocus}
          value={loginForm?.password}
          setText={text => onHandleChange(text, 'password')}
          setIsFocused={value => setPasswordFocus(value)}
          secureText={true}
        />
        <TouchableOpacity
          disabled={disable}
          onPress={() => validateLoginCredential()}
          style={!disable ? styles.loginButton : styles.disableLoginButton}
        >
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text style={styles.registerInfoText}>
            Doesn't have any account ?  
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.registerButtonText}>
              Register Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  loginButton: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#505383',
    borderRadius: 50,
    marginTop: 30,
  },
  disableLoginButton: {
    padding: 10,
    borderWidth: 0,
    backgroundColor: '#A2A2A2',
    borderRadius: 50,
    marginTop: 30,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center'
  },
  registerInfoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginRight: 3
  },
  registerButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#505383'
  }
});

export default LoginPage;
