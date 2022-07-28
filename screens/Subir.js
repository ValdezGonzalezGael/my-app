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
import { firebase } from "../firebase";
import {
  getStorage,
  ref,
  uploadString,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { camera } from "expo-permissions";

import { ListItem, Icon, Avatar, Card, Input } from "@rneui/themed";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { getAdditionalUserInfo, getAuth, signOut } from "firebase/auth";
import TitledHeader from "../components/TitledHeader";

import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";

export default function Subir({ navigation, route }, props) {
  const [nameImage, setNameImage] = useState(
    Math.floor(Math.random() * (999999999999999999 - 1 + 1) + 1)
  );
  const [list, setList] = useState([]);
  const [urls, setUrls] = useState({
    images: [],
  });
  const { images } = urls;

  const { info } = props;
  console.log(info);
  /* const { email_user } = route.params;

  console.log(email_user);
  const user_email = props.email;
  console.log(user_email); */

  const auth = getAuth();

  const signOutMain = () => {
    signOut(auth)
      .then(() => {
        console.log("Sesion finalizada");
        navigation.navigate("InicioSesion");
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
    const listRef = ref(storage, "imagenes/");
    const db = getFirestore();

    const storageRef = ref(storage, `imagenes/${nameImage}`);
    uploadString(storageRef, blob.url, "data_url").then((snapshot) => {
      setNameImage(nameImage);
      console.log(nameImage);
      console.log(snapshot);
      console.log(storageRef);
      console.log("La imagen se subio correctamente");

      listAll(listRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((downloadURL) => {
            const docRef = addDoc(collection(db, "img"), {
              user: "user_",
              url_image: downloadURL,
            });
          });
        });
      });
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
    const listRef = ref(storage, "imagenes/");
    const db = getFirestore();

    const querySnapshot = await getDocs(collection(db, "img"));
    querySnapshot.forEach((doc) => {
      list.push(doc._document.data.value.mapValue.fields.url_image);
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(list);
      setUrls({
        ...urls,
        images,
      });
    });
    console.log(list);
  };
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <View style={{ position: "relative", alignItems: "center" }}>
      <Image
        style={{ width: "100%", height: 100 }}
        resizeMode="contain"
        source={{ uri: item.stringValue }}
      />
    </View>
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
      <ScrollView style={{ flex: 1 }}>
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
