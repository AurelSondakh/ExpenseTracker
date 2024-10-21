import React from "react";
import {View, Text, StyleSheet} from 'react-native'
import { Dropdown } from "react-native-element-dropdown";

type DataDropdownProps = {
    label: string;
    value: string;
}

type DropdownETProps = {
    data: DataDropdownProps[];
    title: string;
    focus?: boolean;
    selectedChoice: string;
    setSelectedChoice: (text: string) => void;
    setIsFocused: (isFocused: boolean) => void;
}

const DropdownET: React.FC<DropdownETProps> = ({
    data,
    title,
    focus,
    selectedChoice,
    setSelectedChoice,
    setIsFocused,
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
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!focus ? 'Select Role' : '...'}
                value={selectedChoice}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={item => {
                    setSelectedChoice(item?.value);
                    setIsFocused(false);
                }}
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
    dropdown: {
        marginTop: -10,
        height: 50,
        borderColor: '#000',
        borderBottomWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        color: '#000'
    },
    placeholderStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
})

export default DropdownET