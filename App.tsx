// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/features/tasks/store/store';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';

import i18n from './src/services/Translation/i18n';
import { useTranslation } from 'react-i18next';
import HeaderStyles from './src/CommonComponents/Header/HeaderStyles';
import colors from './src/utils/colors';

const initI18n = i18n;

export type RootStackParamList = {
    Login: undefined;
    MainTabs: undefined;
    SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    const { t } = useTranslation(); // Initialize translation hook

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {/* Login Screen with styled header */}
                    <Stack.Screen 
                        name="Login" 
                        component={LoginScreen} 
                        options={{ 
                            title: t('login'),
                            headerStyle: HeaderStyles.headerStyle, // Use the styles from the HeaderStyles file
                            headerTitleStyle: HeaderStyles.headerTitleStyle, // Title text style
                            headerTintColor: colors.white,
                            headerTitleAlign: 'center', 
                        }} 
                    />
                    
                    <Stack.Screen
                        name="MainTabs"
                        component={MainTabNavigator}
                        options={{ headerShown: false }} // Hides header for tab navigator
                    />
                    <Stack.Screen 
                        name="SignUp" 
                        component={SignUpScreen} 
                        options={{ 
                            title: t('signup'),
                            headerStyle: HeaderStyles.headerStyle, // Use the styles from the HeaderStyles file
                            headerTitleStyle: HeaderStyles.headerTitleStyle, // Title text style
                            headerTintColor: colors.white,
                            headerTitleAlign:'center',
                        }} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;