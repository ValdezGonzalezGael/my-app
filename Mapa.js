import * as React from 'react';
import MapView, {maker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Mapa() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} >
      <maker
        coordinate ={{
          latitude: 23.752388,
          longitude: -99.142277
        }}
        title= "El Estarbocks"
        description = "Esto es el Estarbocks"
      />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});