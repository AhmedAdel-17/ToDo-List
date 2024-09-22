import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor, RootState } from './src/features/tasks/store/store';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import EditInfoScreen from './src/screens/EditInfoScreen/EditInfoScreen';
import HeaderStyles from './src/CommonComponents/Header/HeaderStyles';
import colors from './src/utils/colors';
import i18n from './src/services/Translation/i18n';
import { NavigatorScreenParams } from '@react-navigation/native';
import { RootTabParamList } from './src/navigation/MainTabNavigator';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  SignUp: undefined;
  Profile: undefined;
  Settings: undefined;
  Home: undefined;
  EditInfo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppContent: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => !!state.auth.email);
  const currentLanguage = useSelector((state: RootState) => state.language.language);

  useEffect(() => {
    if (i18n.language !== currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'MainTabs' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: i18n.t('login'),
            headerStyle: HeaderStyles.headerStyle,
            headerTitleStyle: HeaderStyles.headerTitleStyle,
            headerTintColor: colors.white,
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            title: i18n.t('signup'),
            headerStyle: HeaderStyles.headerStyle,
            headerTitleStyle: HeaderStyles.headerTitleStyle,
            headerTintColor: colors.white,
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditInfo"
          component={EditInfoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
};

export default App;
