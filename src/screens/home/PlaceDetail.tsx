import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Place} from '../../models/Place';
import axios from 'axios';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const PlaceDetails = ({route}: any) => {
  const {id} = route.params;

  const [place, setPlace] = useState<Place | null>(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get<Place>(
          `https://644fe705ba9f39c6ab6f6bc2.mockapi.io/products/${id}`,
        );
        setPlace(response.data);
      } catch (error) {
        console.error('Error fetching place:', error);
      }
    };

    fetchPlace();
  }, []);

  const handleGoToMap = () => {
    if (place) {
      const url = `https://maps.google.com/maps?q=${place.lat},${place.long}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {place ? (
          <>
            <Image source={{uri: place.imageUrl}} style={styles.image} />
            <View style={styles.NameRate}>
              <Text style={styles.name}>{place.name} </Text>
              <Text style={styles.rate}>⭐ {place.rate}</Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.infotext}>Information</Text>
              <Text style={styles.time}>🕘 {place.opentime}</Text>
              <Text style={styles.contact}>📞 {place.contact}</Text>
              <Text style={styles.contact}>📍 {place.location}</Text>
              <Text style={styles.MapHeader}>Map</Text>
            </View>

            <View style={styles.MapMain}>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: place.lat,
                    longitude: place.long,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  scrollEnabled={true}
                  ref={mapRef}>
                  <Marker
                    coordinate={{
                      latitude: place.lat,
                      longitude: place.long,
                    }}
                  />
                </MapView>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleGoToMap}>
              <Text style={styles.buttonText}>Go To Map</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  container: {
    alignSelf: 'center',
    backgroundColor: '#1c1c1c',
  },
  image: {
    width: 350,
    height: 225,
    marginBottom: 10,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  NameRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
    lineHeight: 28,
  },
  rate: {
    alignSelf: 'flex-end',
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
  },
  information: {
    marginTop: 15,
    rowGap: 8,
  },
  infotext: {
    color: '#E8E8E8',
    fontSize: 16,
    fontWeight: '500',
  },
  time: {
    color: '#B9B9B9',
    marginBottom: 5,
  },
  contact: {
    marginBottom: 10,
    color: '#B9B9B9',
  },
  MapHeader: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  MapMain: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.9,
    marginTop: 3,
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#018CF1',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default PlaceDetails;
