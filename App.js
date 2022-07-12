import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserStack from "./UserStack";
import LoginStack from "./LoginStack";
import InicioSecion from "./inicioSesion";
import RegistrarUsuario from "./registrarUsuario";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();
console.log(auth.user);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        {auth.user ? null : (
          <>
            <Tab.Screen
              name="login"
              component={LoginStack}
              options={{ title: "Iniciar sesión" }}
            />
            <Tab.Screen
              name="signin"
              component={UserStack}
              options={{ title: "Registrarse" }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
