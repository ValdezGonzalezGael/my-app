import React, { useState } from "react";
import {
  View,
  Button,
  SnapshotViewIOSBase,
  FlatList,
  Image,
  ScrollView,
  Text,
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

import { ListItem, Icon, Avatar, Card } from "@rneui/themed";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { getAdditionalUserInfo, getAuth, signOut } from "firebase/auth";

export default function Subir({ navigation }, props) {
  const [nameImage, setNameImage] = useState(
    Math.floor(Math.random() * (999999999999999999 - 1 + 1) + 1)
  );
  const [list, setList] = useState([]);

  const datos = {
    user: { id: "", email: "", urlImage: "" },
  };

  /* const usuario = props.user.email;
  console.log(usuario); */

  const auth = getAuth();
  console.log(props);

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
    const storageRef = ref(storage, `imagenes/${nameImage}`);
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

  const VerImagenes = () => {
    const storage = getStorage();
    const listRef = ref(storage, "imagenes/");

    listAll(listRef).then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log("folder" + folderRef);
      });
      res.items
        .forEach((itemRef) => {
          console.log(itemRef);
          getDownloadURL(itemRef).then((downloadURL) => {
            // list.push(downloadURL);
            const URL_DATA = downloadURL;
            const dt = [URL_DATA];
            dt.push()
            setList(dt);
            console.log(dt)
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
      <View>
        <Button title="Subir imagen" onPress={seleccionarImagen}></Button>
      </View>
      <View>
        <Button title="Cerrar sesión" onPress={signOutMain}></Button>
      </View>
      <View>
        <Button title="Ver imagenes" onPress={VerImagenes}></Button>
      </View>
      <Image
          style={{ width: "100%", height: 100 }}
          resizeMode="contain"
          source={{ uri: list }}   
        />
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
