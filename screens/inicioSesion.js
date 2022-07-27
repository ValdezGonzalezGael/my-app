import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { Input } from "@rneui/themed";
import { firebase } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TitledHeader from "../components/TitledHeader";
// import firestore from "@react-native-firebase/firestore";

export default function InicioSesion({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const auth = getAuth();

  const loguear = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        // const collectionRef = firestore().collection("imagenes");
        // const doc = collectionRef.doc(user.email).set({ users: user.email });
        navigation.navigate("Subir");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };
  return (
    <>
      <TitledHeader title="Iniciar sesión" />

      <View style={{ flex: 1, padding: 24 }}>
        <Input
          onChange={(e) => setEmail(e.nativeEvent.target.value)}
          type={Text}
        />
        <Input
          onChange={(e) => setpassword(e.nativeEvent.target.value)}
          type={Text}
        />
        <Button title="Presioname" onPress={() => loguear()}></Button>
      </View>
    </>
  );
}