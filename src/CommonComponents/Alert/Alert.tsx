import React from 'react';
import { Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './Alert.srtyles';
type AlertProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
  buttonText?: string;
};

const Alert: React.FC<AlertProps> = ({ visible, message, onClose, buttonText = 'OK' }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.alertBox}>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.alertButton}>
            <Text style={styles.alertButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};



export default Alert;