import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Input } from "@rneui/themed";
import { firebase } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TitledHeader from "../components/TitledHeader";
// import firestore from "@react-native-firebase/firestore";
import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import Subir from "./Subir";

export default function InicioSesion({ navigation: { navigate } }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [viewComponent, setViewComponent] = useState(false);

  const auth = getAuth();

  const loguear = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        /* const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "img"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          setDoc(doc(db, "img", `${doc.id}`), {
            user: user.email,
          });
        }); */
        console.log(userCredential);
        navigate("Subir");
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

      <View
        style={{
          flex: 1,
          padding: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          onChange={(e) => setEmail(e.nativeEvent.target.value)}
          type={Text}
        />
        <Input
          onChange={(e) => setpassword(e.nativeEvent.target.value)}
          type={Text}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={[style.button]}
          onPress={loguear}
        >
          <View>
            <Text style={[style.text]}>Iniciar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
      {viewComponent ? <Subir info={email} /> : null}
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
