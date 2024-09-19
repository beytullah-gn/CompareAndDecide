import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient'; 
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native'; 

const CreateButton = () => {
    const selectedTheme = useSelector((state) => state.theme.selectedTheme);
    const navigation = useNavigation(); 

    const handlePress = () => {
        navigation.navigate('createComparison'); 
    };

    return (
        <TouchableOpacity 
            style={styles.buttonContainer} 
            activeOpacity={0.7}
            onPress={handlePress} 
        >
            <LinearGradient
                colors={[selectedTheme.DarkColor, selectedTheme.LightColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.buttonCard,{borderColor:selectedTheme.DarkColor}]}
            >
                <Icon name={"add"} size={40} color={selectedTheme.OppositeColor} />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,  
        right: 20,   
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 30,
        borderWidth: 1,
        padding: 5,
        elevation: 5,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    }
});

export default CreateButton;
