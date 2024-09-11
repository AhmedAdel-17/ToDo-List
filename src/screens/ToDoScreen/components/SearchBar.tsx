import React from 'react';
import { TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.style';
import colors from '../../../utils/colors';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
  filterTasks: (searchTerm: string, filter: 'all' | 'completed' | 'uncompleted') => void;
  selectedFilter: 'all' | 'completed' | 'uncompleted';
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, filterTasks, selectedFilter }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={t('search_tasks')}
        placeholderTextColor={colors.white}
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          filterTasks(text, selectedFilter);
        }}
      />
    </View>
  );
};

export default SearchBar;
