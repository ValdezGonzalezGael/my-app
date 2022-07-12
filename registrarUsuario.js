import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Text, View, Button, TouchableOpacity, Alert } from "react-native";
import { firebase } from "./firebase";
import { Input } from "@rneui/themed";
import TitledHeader from "./components/TitledHeader";

export default function RegistrarUsuario({ navigation }) {
  const [usuario, setusuario] = useState("");
  const [password, setpassword] = useState("");
  const auth = getAuth();
  function registrar() {
    createUserWithEmailAndPassword(auth, usuario, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        Alert.alert("Se ha creado el usuario correctamente");
        navigation.navigate("login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <TitledHeader title="Registrarse" />
      <View style={{ flex: 1, padding: 24 }}>
        <Input
          onChange={(e) => setusuario(e.nativeEvent.target.value)}
          type={Text}
        />
        <Input
          onChange={(e) => setpassword(e.nativeEvent.target.value)}
          type={Text}
        />
        <Button title="Presioname" onPress={() => registrar()}></Button>
      </View>
    </>
  );
}
