import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";

export default CreateButton = () => {
    const selectedTheme = useSelector((state) => state.theme.selectedTheme);

    return (
        <TouchableOpacity 
            style={[styles.buttonCard, { backgroundColor: selectedTheme.DarkColor }]} 
            activeOpacity={0.7}
        >
            <Icon name={"add"} size={40} color={selectedTheme.SecondaryColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonCard: {
        position: 'absolute',
        bottom: 20,  // Ekranın altına yakın
        right: 20,   // Ekranın sağına yakın
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        padding: 5,
        elevation: 5,  // Android gölge
        shadowColor: '#000',  // iOS gölge
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    }
});
