import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../firebase";
import { Input } from "@rneui/themed";
import TitledHeader from "../components/TitledHeader";

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
        navigation.navigate("InicioSesion");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <TitledHeader title="Registrarse" />
      <View
        style={{
          flex: 1,
          padding: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          onChange={(e) => setusuario(e.nativeEvent.target.value)}
          type={Text}
        />
        <Input
          onChange={(e) => setpassword(e.nativeEvent.target.value)}
          type={Text}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[style.button]}
          onPress={registrar}
        >
          <View>
            <Text style={[style.text]}>Registrarme</Text>
          </View>
        </TouchableOpacity>
      </View>
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
