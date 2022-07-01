import React, { useState } from "react";
import { View,Button, SnapshotViewIOSBase, FlatList, Image } from "react-native";
import { firebaseApp } from "./firebase";
import {getStorage, ref, uploadString} from "firebase/storage"
import { camera } from "expo-Permissions";

import { ListItem, Icon } from "@rneui/themed"

import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import { getAuth, signOut } from "firebase/auth"



export default function Subir({navigation}){

    const [nameImage, setNameImage] = useState(0);

    const auth = getAuth();
    const signOutMain = () => {
        signOut(auth).then(() => {
            console.log("Sesion finalizada")
            navigation .navigate("login")
        }).catch((error) => {
            console.log("Error = " + error)
        });
    }

    const subirImagen = async (uri)=>{
        const response = await fetch(uri);
        const blob = await response;
        console.log(blob)

        const storage = getStorage();
        const storageRef = ref(storage, `imagenes/img${nameImage}`);
        uploadString(storageRef,blob.url, 'data_url').then((snapshot)=>{
            console.log(snapshot)
            setNameImage(nameImage+1)
            console.log('La imagen se subio correctamente');
        });
    }
    
    const seleccionarImagen = async ()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.camera);
        console.log(resultPermissions)
        const resultPermissionsCamera = resultPermissions.status;
        if (resultPermissionsCamera === "denied"){
            alert("No tienes los permisos necesarios");
        }
        else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });
            console.log(result);
            console.log(result.uri);
            subirImagen(result.uri);
        }
    }
    return(
        <>
            <View>
                <Button title='Subir imagen' onPress={seleccionarImagen}></Button>
            </View>
            <View>
                <Button title='cerrar sesión' onPress={signOutMain}></Button>
            </View>
            <View>
            {
                list.map((item, i) => (
                <ListItem key={i} bottomDivider>
                    <Image name={item.icon} />
                    <ListItem.Content>
                    <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
                ))
            }
            </View>
        </>
    )
}