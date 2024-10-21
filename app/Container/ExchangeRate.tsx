import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCurrency } from "../Redux/Actions";
import DropdownET from "../Components/DropdownET";
import TextInputET from "../Components/TextInputET";

const ExchangeRatePage = () => {
    const { currencyList, conversionRate, conversionResult } = useSelector((state) => state.currency);
    const [fromCurFocus, setFromCurFocus] = useState<boolean>(false);
    const [selectedFromCurrency, setSelectedFromCurrency] = useState<string>('');
    const [toCurFocus, setToCurFocus] = useState<boolean>(false);
    const [selectedToCurrency, setSelectedToCurrency] = useState<string>('');
    const [amountFocus, setAmountFocus] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const resetState = selectedFromCurrency === '' && selectedToCurrency === '' && amount === ''
    const dispatch = useDispatch();
    const getAllCurrency = async () => {
        try {
            await dispatch(
                ActionCurrency.GetAllCurrency()
            );
        } catch (error) {
            console.log('Error Get All Contact: ', error);
        }
    }
    useEffect(() => {
        getAllCurrency()
        currencyList.map(item => item[0])
    }, [])
    const currencyDropdownData = currencyList.map(([code, name]) => ({
        label: `${code} (${name})`,
        value: code,
    }));
    
    const handleConversion = async () => {
        console.log(selectedFromCurrency, selectedToCurrency, amount)
        await dispatch(
            ActionCurrency.GetPair(selectedFromCurrency, selectedToCurrency, amount)
        );
    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Currency Converter</Text>
    
          <DropdownET
            data={currencyDropdownData}
            title='From Currency'
            focus={fromCurFocus}
            selectedChoice={selectedFromCurrency}
            setSelectedChoice={text => setSelectedFromCurrency(text)}
            setIsFocused={value => setFromCurFocus(value)}
          />
    
          <DropdownET
            data={currencyDropdownData}
            title='To Currency'
            focus={toCurFocus}
            selectedChoice={selectedToCurrency}
            setSelectedChoice={text => setSelectedToCurrency(text)}
            setIsFocused={value => setToCurFocus(value)}
          />
    
          <TextInputET 
            title='Exchange Amount'
            placeholder='Amount'
            focus={amountFocus}
            value={amount}
            setText={text => setAmount(text)}
            setIsFocused={value => setAmountFocus(value)}
          />
          <View style={{ marginBottom: 24 }} />
          <Button title="Convert" onPress={handleConversion} />
          {console.log(conversionRate, resetState)}
          {(conversionRate > 0 && !resetState) ? (
            <Text style={styles.result}>
              Conversion Rate: {conversionRate} {selectedToCurrency} per {selectedFromCurrency}
            </Text>
          ) : null}
          {(conversionResult > 0 && !resetState) ? (
            <Text style={styles.result}>
              Total: {selectedFromCurrency} {amount} = {selectedToCurrency} {conversionResult}
            </Text>
          ) : null}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
      },
      result: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
      },
    });

export default ExchangeRatePage