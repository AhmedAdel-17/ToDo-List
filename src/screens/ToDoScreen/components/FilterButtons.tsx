// components/FilterButtons.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './FilterButtons.styles';
import { useTranslation } from 'react-i18next';

interface FilterButtonsProps {
  selectedFilter: 'all' | 'completed' | 'uncompleted';
  onFilterPress: (filter: 'all' | 'completed' | 'uncompleted') => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ selectedFilter, onFilterPress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.filterButtonsContainer}>
      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'uncompleted' && styles.selectedFilterButton]}
        onPress={() => onFilterPress('uncompleted')}
      >
        <Text style={[styles.filterButtonText, selectedFilter === 'uncompleted' && styles.selectedFilterButtonText]}>
          {t('uncompleted_tasks')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterButton, selectedFilter === 'completed' && styles.selectedFilterButton]}
        onPress={() => onFilterPress('completed')}
      >
        <Text style={[styles.filterButtonText, selectedFilter === 'completed' && styles.selectedFilterButtonText]}>
          {t('completed_tasks')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterButtons;
