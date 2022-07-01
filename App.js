import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserStack from './UserStack';
import LoginStack from './LoginStack';
import InicioSecion from './inicioSesion';
import RegistrarUsuario from './registrarUsuario';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();
console.log(auth.user)

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator>
      {/* <Tab.Screen name="Home" component={HomeScreen} />      
         <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Users" component={UserStack}  options={{ headerShown: false }}/> */}
        <Tab.Screen name="login" component={LoginStack}  options={{ title:"Iniciar sesión" }}/> 
        {/* <Tab.Screen name="RegistrarUario" component={RegistrarUsuario}  options={{ headerShown: false }}/>*/}    
        <Tab.Screen name="signin" component={UserStack}  options={{ title:"Registrarse" }}/>
      </Tab.Navigator>
    </NavigationContainer> 
  );
}