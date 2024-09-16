// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor, RootState } from './src/features/tasks/store/store';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import { useTranslation } from 'react-i18next';
import HeaderStyles from './src/CommonComponents/Header/HeaderStyles';
import colors from './src/utils/colors';

// Define the RootStackParamList for Stack Navigator
export type RootStackParamList = {
  Login: undefined;        // Login screen does not expect params
  MainTabs: undefined;     // MainTabs does not expect params
  SignUp: undefined;       // SignUp screen does not expect params
};

// Create the Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();  // Use RootStackParamList as type

const AppContent: React.FC = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.email); // Check if user is logged in

  useEffect(() => {
    console.log("Auth State (isLoggedIn):", isLoggedIn); // Log the authentication state
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "MainTabs" : "Login"}>
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
            headerTitleAlign: 'center',
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* PersistGate delays the rendering until the persisted state has been retrieved and loaded */}
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
