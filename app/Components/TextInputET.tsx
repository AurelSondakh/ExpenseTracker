import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

type TextInputETProps = {
    title: string
    placeholder?: string;
    focus?: boolean;
    value: string;
    setText: (text: string) => void;
    setIsFocused: (isFocused: boolean) => void;
    secureText?: boolean;
}

const TextInputET: React.FC<TextInputETProps> = ({
    placeholder,
    title,
    focus,
    value,
    setText,
    setIsFocused,
    secureText = false,
}) => {
    return (
        <View style={styles.inputContainer}>
            <Text
                style={[
                styles.label,
                { color: !focus ? '#000' : '#505383', fontSize: !focus ? 12 : 14 }
                ]}
            >
                {title}
            </Text>
            <TextInput
                placeholder={placeholder}
                secureTextEntry={secureText}
                style={[
                styles.input,
                { borderBottomColor: !focus ? '#000' : '#505383', color: '#000' }
                ]}
                onChangeText={text => {
                setText(text);
                }}
                onEndEditing={() => {
                setIsFocused(false);
                }}
                onFocus={() => {
                setIsFocused(true);
                }}
                value={value}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
    },
    label: {
        fontFamily: 'Poppins-Medium',
    },
    input: {
        marginTop: -10,
        borderBottomWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontFamily: 'Poppins-Regular',
    },
})

export default TextInputET