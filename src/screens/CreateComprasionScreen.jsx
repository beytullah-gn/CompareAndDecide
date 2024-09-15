import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateComparison = ({ navigation }) => {
    const selectedTheme = useSelector((state) => state.theme.selectedTheme);
    const [comparisonTitle, setComparisonTitle] = useState('');
    const [items, setItems] = useState([{ name: '' }]); // Başlangıçta tek bir öğe

    const handleItemChange = (text, index) => {
        const newItems = [...items];
        newItems[index].name = text;
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: '' }]); // Yeni boş öğe ekler
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleCreate = () => {
        if (comparisonTitle.trim() === '') {
            Alert.alert('Hata', 'Kıyaslama başlığını girmelisiniz.');
            return;
        }

        const emptyItems = items.filter(item => item.name.trim() === '');
        if (emptyItems.length > 0) {
            Alert.alert('Hata', 'Tüm öğe isimlerini girmelisiniz.');
            return;
        }

        // Kıyaslama oluşturma işlemi burada yapılabilir
        console.log('Kıyaslama Başlığı:', comparisonTitle);
        console.log('Öğeler:', items);

        // İşlemler bittikten sonra ana sayfaya dön
        navigation.navigate('Home');
    };

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: selectedTheme.BackgroundColor }]}>
            <Text style={[styles.title, { color: selectedTheme.TextColor }]}>
                Yeni Kıyaslama Oluştur
            </Text>
            <TextInput
                style={[styles.input, { borderColor: selectedTheme.DarkColor, color: selectedTheme.TextColor }]}
                placeholder="Kıyaslama Başlığı"
                placeholderTextColor={selectedTheme.LightColor}
                value={comparisonTitle}
                onChangeText={setComparisonTitle}
            />
            
            {items.map((item, index) => (
                <View key={index} style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, { borderColor: selectedTheme.DarkColor, color: selectedTheme.TextColor }]}
                        placeholder={`Öğe ${index + 1}`}
                        placeholderTextColor={selectedTheme.LightColor}
                        value={item.name}
                        onChangeText={(text) => handleItemChange(text, index)}
                    />
                    {items.length > 1 && (
                        <TouchableOpacity onPress={() => handleRemoveItem(index)} style={styles.removeButton}>
                            <Icon name="close" size={24} color={selectedTheme.DarkColor} />
                        </TouchableOpacity>
                    )}
                </View>
            ))}

            <Button title="Yeni Öğe Ekle" color={selectedTheme.DarkColor} onPress={handleAddItem} />
            <Button title="Kıyaslama Oluştur" color={selectedTheme.DarkColor} onPress={handleCreate} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        position: 'relative',  // Relative positioning for absolute button placement
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 40,  // Space for the delete button
    },
    removeButton: {
        position: 'absolute',
        right: 10,  // Position button inside input on the right
        top: 8,     // Align button vertically in the middle
    },
});

export default CreateComparison;
