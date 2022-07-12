import React, { useState } from "react";
import {
  View,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { firebase } from "./firebase";
import {
  getStorage,
  ref,
  uploadString,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { camera } from "expo-Permissions";

import { ListItem, Icon, Avatar, Card, Input } from "@rneui/themed";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { getAdditionalUserInfo, getAuth, signOut } from "firebase/auth";
import TitledHeader from "./components/TitledHeader";

export default function Subir({ navigation }, props) {
  const [nameImage, setNameImage] = useState(
    Math.floor(Math.random() * (9999999999999999 - 1 + 1) + 1)
  );
  const [list, setList] = useState([]);

  const datos = { id: "", email: "", urlImage: "" };

  const auth = getAuth();

  const signOutMain = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesion finalizada");
        navigation.navigate("login");
      })
      .catch((error) => {
        console.log("Error = " + error);
      });
  };

  const subirImagen = async (uri) => {
    const response = await fetch(uri);
    const blob = await response;
    console.log(blob);

    const storage = getStorage();
    const storageRef = ref(storage, `imagenes/img${nameImage}`);
    uploadString(storageRef, blob.url, "data_url").then((snapshot) => {
      setNameImage(nameImage);
      console.log(nameImage);
      console.log(snapshot);
      console.log(storageRef);
      console.log("La imagen se subio correctamente");
    });
  };

  const seleccionarImagen = async () => {
    const resultPermissions = await Permissions.askAsync(Permissions.camera);
    console.log(resultPermissions);
    const resultPermissionsCamera = resultPermissions.status;
    if (resultPermissionsCamera === "denied") {
      alert("No tienes los permisos necesarios");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      console.log(result);
      console.log(result.uri);
      subirImagen(result.uri);
    }
  };

  const VerImagenes = async () => {
    const storage = getStorage();
    const listRef = await ref(storage, "imagenes/");

    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((downloadURL) => {
          const fetched = downloadURL;
          list.push(fetched);
          const obj = { ...list };
          setList(obj);
          console.log(obj);
        });
      });
      /* .catch((error) => {
          console.log(error);
        }); */
    });
  };
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <Card>
      <View style={{ position: "relative", alignItems: "center" }}>
        <Image
          style={{ width: "100%", height: 100 }}
          resizeMode="contain"
          source={{ uri: item }}
        />
        <Text>Text</Text>
      </View>
    </Card>
  );
  return (
    <>
      <TitledHeader title="Subir" />
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[style.button]}
          onPress={seleccionarImagen}
        >
          <View>
            <Text style={[style.text]}>Subir imagen</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[style.button]}
          onPress={signOutMain}
        >
          <View>
            <Text style={[style.text]}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[style.button]}
          onPress={VerImagenes}
        >
          <View>
            <Text style={[style.text]}>Ver imagenes</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <ScrollView>
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItem}
        />
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  button: {
    backgroundColor: "#0BBBEF",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
});
