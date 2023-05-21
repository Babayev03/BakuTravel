import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgSaveIcon from '../../assets/images/SaveIcon';
import ExploreCard from '../../components/tabComponents/ExploreCard';

const SaveMain = ({navigation}: any) => {
  const [savedPlaces, setSavedPlaces] = useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          await loadSavedPlaces();
        } catch (error) {
          console.log('Error while fetching saved places:', error);
        }
      };

      fetchData();
    }, []),
  );

  const loadSavedPlaces = async () => {
    try {
      const savedPlacesJson = await AsyncStorage.getItem('SavedPlaces');
      if (savedPlacesJson) {
        const places = JSON.parse(savedPlacesJson);
        setSavedPlaces(places);
      }
    } catch (error) {
      console.log('Error loading saved places:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#1C1C1C'}}>
      {savedPlaces.length > 0 ? (
        <View style={{marginVertical:25,marginHorizontal:15}}>
          <Text style={{fontSize: 25,color:"#fff"}}>Saved</Text>
        </View>
      ) : (
        <View
          style={{flex: 50, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize:16,color:"#fff"}}>No Saved Items Yet</Text>
        </View>
      )}
      <View style={{flex:1}}>
        <FlatList
          data={savedPlaces}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ExploreCard item={item} />}
        />
      </View>
    </View>
  );
};

export default SaveMain;

const styles = StyleSheet.create({
  placeInfoContainer: {
    backgroundColor: '#1C1C1C',
    padding: 5,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 16,
    width: 300,
  },
  saveIcon: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    padding: 8,
    right: 15,
    top: 15,
    borderRadius: 20,
  },
  placeContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  main: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#262626',
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  placeImage: {
    width: '100%',
    height: 220,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },
  placeRating: {
    fontSize: 13,
    color: 'white',
    alignSelf: 'center',
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  PlaceTime: {
    color: 'white',
    fontSize: 13,
    alignSelf: 'center',
  },
});
