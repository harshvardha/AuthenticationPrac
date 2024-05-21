import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
    const { authToken } = useContext(AuthContext);
    const [fetchedMessage, setFetchedMessage] = useState('');

    useEffect(() => {
        axios.get(
            `https://expensetracker-acd41-default-rtdb.firebaseio.com/message.json?auth=${authToken}`
        ).then(response => {
            setFetchedMessage(response.data);
        });
    }, [])
    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            <Text>{fetchedMessage}</Text>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});