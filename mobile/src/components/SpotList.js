import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import api from '../services/api'

export default function SpotList({tech}) {
    const [spots, setSpots] = useState([])

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: {tech}
            })
            setSpots(response.data)
        }

        loadSpots()
    }, [])

    return (
        <View container={styles.container}>
            <Text styles={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList 
                styles={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail_url} source={{ uri: item.thumbnail_url }}/>
                        <Text style={styles.company}>{item.company}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold: {
        fontWeight: "bold",
    }
})