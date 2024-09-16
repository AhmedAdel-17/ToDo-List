import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import ToDoScreen from '../screens/ToDoScreen/ToDoscreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../utils/colors';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  const { t } = useTranslation();

  const getIconName = (routeName: string): string => {
    switch (routeName) {
      case 'ToDoScreen':
        return 'home';
      case 'ProfileScreen':
        return 'person-circle-outline';
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
        tabBarActiveTintColor: colors.newpurple,
        tabBarInactiveTintColor: colors.charcoal,
      })}
    >
      <Tab.Screen
        name="ToDoScreen"
        component={ToDoScreen}
        options={{
          tabBarLabel: t('todo'),
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: t('profile'),
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
