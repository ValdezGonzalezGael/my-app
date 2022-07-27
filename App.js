import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserStack from "./components/stacks/UserStack";
import LoginStack from "./components/stacks/LoginStack";
import InicioSecion from "./screens/inicioSesion";
import RegistrarUsuario from "./screens/registrarUsuario";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Notificaciones from "./components/Notificaciones";
import Local from "./components/Localización";
import Maps from "./components/Maps";

const auth = getAuth();
console.log(auth.user);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Home" component={Local} /> */}
        {/*  <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Users" component={UserStack}  options={{ headerShown: false }}/> */}
        {/* <Tab.Screen
          name="Notificaciones"
          component={Notificaciones}
          options={{ title: "Notificaciones" }}
        /> */}
        <Tab.Screen
          name="InicioSesion"
          component={LoginStack}
          options={{ title: "Iniciar sesión", headerShown: false }}
        />
        {/* <Tab.Screen name="RegistrarUario" component={RegistrarUsuario}  options={{ headerShown: false }}/>*/}
        <Tab.Screen
          name="signin"
          component={UserStack}
          options={{ title: "Registrarse", headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
