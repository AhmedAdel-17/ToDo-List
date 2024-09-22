import React, { useEffect, useState } from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import ProfileItem from './components/ProfileItem';
import TopBar from './components/TopBar';
import styles from './Profile.styles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import colors from '../../utils/colors';

const ProfileScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [uncompletedTasks, setUncompletedTasks] = useState<number>(0);
  
  const userId = auth().currentUser?.uid;
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        setUserInfo(userDoc.data());
        
        const tasksSnapshot = await firebase.firestore().collection('users').doc(userId).collection('tasks').get();
        const tasks = tasksSnapshot.docs.map(doc => doc.data());
        
        setCompletedTasks(tasks.filter(task => task.completed).length);
        setUncompletedTasks(tasks.length - completedTasks);
      }
    };
    
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle:t("Profile"),
      headerStyle: styles.headerStyle, 
      headerTitleStyle: styles.headerTitleStyle, 
      headerTintColor: styles.headerTintColor, 
      headerTitleAlign: 'center',
    });
  }, [i18n.language]);

  if (!userInfo) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color= {colors.brown} />
        </View>
    );
}
  return (
    <View style={styles.rootContainer}>
      <TopBar profilePictureUrl={userInfo.profilePictureUrl} />
      <View style={styles.container}>
        <ProfileItem icon="mail-outline" text={t("email")} subText={userInfo.email} />
        <ProfileItem icon="person-outline" text={t("first_name")} subText={userInfo.firstName} />
        <ProfileItem icon="person-outline" text={t("last_name")} subText={userInfo.lastName} />
        <ProfileItem icon="balloon-outline" text={t("birthdate")} subText={userInfo.birthDate} />
        <ProfileItem icon="checkmark-circle-outline" text={t("completed_tasks")} subText={completedTasks.toString()} />
        <ProfileItem icon="close-circle-outline" text={t("uncompleted_tasks")} subText={uncompletedTasks.toString()} />
      </View>
    </View>
  );
};

export default ProfileScreen;
