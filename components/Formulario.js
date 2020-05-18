import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios'

const Formulario = ({ currency, cryptocurrency, setCurrency, setCryptocurrency, setGetAPI }) => {

    const [cryptocurrencies, setCryptocurrencies] = useState([])

    useEffect(() => {
        const getAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const result = await axios.get(url)
            setCryptocurrencies(result.data.Data)
        }
        getAPI()
    }, [])

    const getCurrency = currency => {
        setCurrency(currency)
    }
    const getCryptocurrency = crypto => {
        setCryptocurrency(crypto)
    }

    const quotePrice = () => {
        if (currency.trim() === '' || cryptocurrency.trim() === '') {
            showAlert()
            return
        }

        setGetAPI(true)

    }

    const showAlert = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                { text: 'OK' }
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                selectedValue={currency}
                onValueChange={currency => getCurrency(currency)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="--Seleccione --" value="" />
                <Picker.Item label="Dolar de Estados Unidos" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                selectedValue={cryptocurrency}
                onValueChange={crypto => getCryptocurrency(crypto)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="--Seleccione --" value="" />
                {cryptocurrencies.map(elm => (
                    <Picker.Item key={elm.CoinInfo.Id} label={elm.ConInfo.FullName} value={elm.CoinInfo.Name} />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnQuote}
                onPress={() => quotePrice()}
            >
                <Text style={styles.textQuote}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

export default Formulario

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        textTransform: 'uppercase',
        marginVertical: 20
    },
    btnQuote: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
    },
    textQuote: {
        color: '#FFF',
        fontSize: 18,
        textFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'

    }

})
