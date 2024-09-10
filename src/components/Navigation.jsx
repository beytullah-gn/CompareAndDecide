import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AuthScreen from '../screens/AuthScreen';
import { useSelector } from 'react-redux';
import { StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  const screenOptions = ({ route }) => ({
    headerStyle: { backgroundColor: selectedTheme.MainColor },
    headerTintColor: '#fff',
    tabBarStyle: { backgroundColor: selectedTheme.WhiteColor },
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Settings') {
        iconName = 'settings';
      }
      return <Icon name={iconName} color={color} size={size} />;
    },
    tabBarActiveTintColor: selectedTheme.DarkColor,
    tabBarInactiveTintColor: selectedTheme.MainColor,
    headerShown: false
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: selectedLanguage.Home || "Home" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false, title: selectedLanguage.Settings || "Settings" }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const selectedTheme = useSelector((state) => state.theme.selectedTheme);
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(selectedTheme.SecondaryColor);
    }
  }, [selectedTheme.SecondaryColor]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={selectedTheme.MainColor} />
      <Stack.Navigator >
        <Stack.Screen name="MainTabs" component={MainTabs} options={{headerShown: false}} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{title: selectedLanguage.Login || "Login" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
