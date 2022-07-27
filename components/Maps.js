import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import Local from "./Localización";

export default function Maps(props) {
  const [region, setRegion] = React.useState("");
  const { info } = props;
  console.log(info);
  return (
    <>
      <View style={styles.container}>
        {info !== undefined ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0221,
            }}
          >
            <Marker
              coordinate={{
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
              }}
              title="Tu ubicación actual"
              description="Esta es tu ubicación actual"
            />
          </MapView>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
