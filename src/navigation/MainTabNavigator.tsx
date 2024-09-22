import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ToDoScreen from '../screens/ToDoScreen/ToDoscreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import colors from '../utils/colors';
import { useTranslation } from 'react-i18next';

export type RootTabParamList = {
  ToDoScreen: undefined;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigator: React.FC = () => {
  const { t } = useTranslation();

  const getIconName = (routeName: string): string => {
    switch (routeName) {
      case 'ToDoScreen':
        return 'home-outline';
      case 'ProfileScreen':
        return 'person-outline';
      case 'SettingsScreen':
        return 'settings-outline';
      default:
        return 'help-circle-outline';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = getIconName(route.name);
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.silver,
      })}
    >
      <Tab.Screen
        name="ToDoScreen"
        component={ToDoScreen}
        options={{
          tabBarLabel: t('todo'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('settings'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
