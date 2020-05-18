import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Cotizador from './components/Cotizador'
import axios from 'axios'

export default function App() {
  const [currency, setCurrency] = useState('')
  const [cryptocurrency, setCryptocurrency] = useState('')
  const [getAPI, setGetAPI] = useState(false)
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const quoteCryptocurency = async () => {
      if (getAPI) {
        // Consultar la API para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const result = await axios.get(url)

        setLoading(true)

        setTimeout(() => {
          setResult(result.data.DISPLAY[cryptocurrency][currency])
          setGetAPI(false)
          setLoading(false)

        }, 3000);
      }
    }
    quoteCryptocurency()
  }, [getAPI])

  // Spinner
  const component = loading ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizador result={result} />

  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.image}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View
          style={styles.contain}>
          <Formulario
            currency={currency}
            cryptocurrency={cryptocurrency}
            setCurrency={setCurrency}
            setCryptocurrency={setCryptocurrency}
            setGetAPI={setGetAPI}
          />
        </View>
        <View style={{ marginTop: 40 }}>
          {component}
        </View>

      </ScrollView>

    </>

  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contain: {
    marginHorizontal: '2.5%'
  }
});
