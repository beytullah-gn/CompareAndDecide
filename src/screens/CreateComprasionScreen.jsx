import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { saveComparison,saveComparisonItems } from '../services/createComprasion';


const CreateComparison = ({ navigation }) => {
    const selectedTheme = useSelector((state) => state.theme.selectedTheme);
    const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
    const [comparisonTitle, setComparisonTitle] = useState('');
    const [items, setItems] = useState([{ name: '' }]);

    const handleItemChange = (text, index) => {
        const newItems = [...items];
        newItems[index].name = text;
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: '' }]);
    };

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleCreate = async () => {
        if (comparisonTitle.trim() === '') {
            Alert.alert(selectedLanguage.Error, selectedLanguage.CreateHeaderError);
            return;
        }
    
        const emptyItems = items.filter(item => item.name.trim() === '');
        if (emptyItems.length > 0) {
            Alert.alert(selectedLanguage.Error, selectedLanguage.ItemNameError);
            return;
        }
    
        try {
            const newComparisonId = await saveComparison(comparisonTitle);
            await saveComparisonItems(items, newComparisonId);
    
            Alert.alert(selectedLanguage.Success, selectedLanguage.ComparisonCreated);
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert(selectedLanguage.Error, error.message);
        }
    };
    

    return (
        <LinearGradient
            colors={[selectedTheme.MainColor, selectedTheme.LightColor]}
            style={styles.gradientContainer}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <LinearGradient
                    colors={[selectedTheme.LightColor, selectedTheme.OppositeColor]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.card,{borderWidth:0.5}]}
                >
                    <Text style={[styles.title, { color: selectedTheme.MainColor }]}>
                        {selectedLanguage.CreateComparison}
                    </Text>

                    <TextInput
                        style={[styles.input, { borderColor: selectedTheme.DarkColor, backgroundColor: selectedTheme.WhiteColor, marginBottom: 15 }]}
                        placeholder={selectedLanguage.ComprasionHeader}
                        placeholderTextColor={selectedTheme.DarkColor}
                        value={comparisonTitle}
                        onChangeText={setComparisonTitle}
                    />

                    {items.map((item, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, { borderColor: selectedTheme.DarkColor, backgroundColor: selectedTheme.WhiteColor }]}
                                placeholder={`${selectedLanguage.Item} ${index + 1}`}
                                placeholderTextColor={selectedTheme.DarkColor}
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
                </LinearGradient>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: selectedTheme.DarkColor }]} onPress={handleAddItem}>
                        <Text style={styles.buttonText}>{selectedLanguage.AddNewItem}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, { backgroundColor: selectedTheme.DarkColor }]} onPress={handleCreate}>
                        <Text style={styles.buttonText}>{selectedLanguage.CreateComparison}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        padding: 20,
    },
    card: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3, 
        shadowColor: '#000', 
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 40,
    },
    removeButton: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 10,
        elevation: 3, 
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CreateComparison;
