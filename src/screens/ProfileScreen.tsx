import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Switch, I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/firestore';
import colors from '../styles/colors';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

function ProfileItem({ text, subText, icon }) {
  return (
    <View style={styles.itemContainer}>
      <Icon name={icon} size={20} color={colors.white} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.headText}>{text}</Text>
        <Text style={styles.infoText}>{subText}</Text>
      </View>
    </View>
  );
}

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
        const userData = userDoc.data();
        setUserInfo(userData);

        const tasksSnapshot = await firebase.firestore().collection('users').doc(userId).collection('tasks').get();
        const tasks = tasksSnapshot.docs.map(doc => doc.data());
        
        const completedCount = tasks.filter(task => task.completed).length;
        const uncompletedCount = tasks.length - completedCount;

        setCompletedTasks(completedCount);
        setUncompletedTasks(uncompletedCount);
      }
    };
    
    fetchUserData();
  }, [userId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('Profile'),
    });
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);
    I18nManager.allowRTL(newLanguage === 'ar');
    I18nManager.forceRTL(newLanguage === 'ar');
  };

  if (!userInfo) return <Text>Loading...</Text>;

  return (
    <View style={styles.rootContainer}>
      <View style={styles.topBar}>
        <Image style={styles.avatar} source={{ uri: userInfo.profilePictureUrl }} />
      </View>

      <View style={styles.languageSwitchContainer}>
        <Text style={styles.languageButtonText}>
          {i18n.language === 'en' ? 'English' : 'العربية'}
        </Text>
        <Switch
          value={i18n.language === 'en'}
          onValueChange={toggleLanguage}
          trackColor={{ true: colors.charcoal, false: colors.charcoal }}
          thumbColor={colors.white}
        />
      </View>

      <View style={styles.container}>
        <ProfileItem icon="envelope" text={t("Email")} subText={userInfo.email} />
        <ProfileItem icon="user" text={t("First Name")} subText={userInfo.firstName} />
        <ProfileItem icon="user" text={t("Last Name")} subText={userInfo.lastName} />
        <ProfileItem icon="birthday-cake" text={t("Birth Date")} subText={userInfo.birthDate} />
        <ProfileItem icon="check-circle" text={t("Completed Tasks")} subText={completedTasks.toString()} />
        <ProfileItem icon="times-circle" text={t("Uncompleted Tasks")} subText={uncompletedTasks.toString()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.newpurple,
  },
  topBar: {
    height: 150,
    backgroundColor: colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderColor: colors.purpleHaze,
    borderWidth: 2,
  },
  languageSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  languageButtonText: {
    fontSize: 18,
    color: colors.white,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.violet,
    padding: 10,
    borderRadius: 15,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  headText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default ProfileScreen;
