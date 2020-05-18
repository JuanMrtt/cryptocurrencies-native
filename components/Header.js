import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo'

const Header = () => {
    let [fontsLoaded] = useFonts({
        'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <View>
                <Text style={styles.header}>Criptomonedas</Text>
            </View>
        )
    }
    // return (
    //     <Text style={styles.header}>Criptomonedas</Text>
    // )
}


export default Header

const styles = StyleSheet.create({
    header: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 30
    }
})
