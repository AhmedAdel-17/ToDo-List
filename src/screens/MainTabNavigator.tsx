import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDoScreen from './ToDoscreen';
import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'circle';

          if (route.name === 'ToDoScreen') {
            iconName = 'home';
          } else if (route.name === 'ProfileScreen') {
            iconName = 'person-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.newpurple,
        tabBarInactiveTintColor: colors.charcoal,
      })}
    >
      {/* Use the translated names for the tabs */}
      <Tab.Screen 
        name="ToDoScreen" 
        component={ToDoScreen} 
        options={{ tabBarLabel: t('ToDo') }} 
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ tabBarLabel: t('Profile') }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
