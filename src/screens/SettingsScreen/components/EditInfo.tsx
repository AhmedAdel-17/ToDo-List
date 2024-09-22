import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, I18nManager } from 'react-native';
import styles from './EditInfo.styles';
import colors from '../../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

type Props = {
    onPress: () => void;
    isLoading?: boolean;
}


const EditInfoButton: React.FC<Props> = ({onPress , isLoading = false }) => {

    const {t} = useTranslation();

    return (
        <TouchableOpacity style = {styles.EditInfoButton} onPress={onPress}>
            {isLoading?(<ActivityIndicator size = 'small' color={colors.white} />) 
            : (
                <>
                    <Icon
                    name='create-outline'
                    size = {30}
                    color = {colors.white}
                    style = {styles.icon}
                    />
                    <Text style = {styles.EditInfoText}> 
                        {t('editInfo')}
                    </Text>
                </>
            )}

        </TouchableOpacity>
    );
}
export default EditInfoButton;