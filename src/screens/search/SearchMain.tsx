import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import Places from '../../data/Places';
import ExploreCard from '../../components/tabComponents/ExploreCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Categories from '../../data/Catagories';
import {useFocusEffect} from '@react-navigation/native';

const SearchMain = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useFocusEffect(
    useCallback(() => {
      console.log('salam');
    }, []),
  );

  const filteredPlaces = Places.filter(place => {
    if (selectedCategory && place.categoryid != selectedCategory) {
      return false;
    }
    return place.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleCategoryPress = (categoryId: any) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#1c1c1c'}}>
      <View>
        <View style={{marginHorizontal: 6, marginTop: 15, marginBottom: 5}}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍  Search by items"
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={'white'}
            value={searchText}
          />
        </View>
        <FlatList
          horizontal
          data={Categories}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.sectionList,
                selectedCategory === item.id && {backgroundColor: 'red'},
              ]}
              onPress={() => handleCategoryPress(item.id)}>
              <Text style={styles.sectionText}>
                {item.img} {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <FlatList
        data={filteredPlaces}
        renderItem={({item}) => {
          return <ExploreCard item={item} />;
        }}
        keyExtractor={item => item.id.toString()}
      />
    </GestureHandlerRootView>
  );
};

export default SearchMain;

const styles = StyleSheet.create({
  sectionList: {
    marginHorizontal: 8,
    marginVertical: 5,
    borderWidth: 2,
    width: 125,
    height: 40,
    borderColor: 'gray',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
  searchInput: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingLeft: 15,
    color: 'white',
    backgroundColor: '#262626',
    fontSize: 16,
  },
});
