import { createStackNavigator } from "@react-navigation/stack";
import Users from "../Users";
import User from "../User";
import Subir from "../../screens/Subir";
import RegistrarUario from "../../screens/registrarUsuario";
import LogIn from "../../screens/inicioSesion";

const Stack = createStackNavigator();

export default function LoginStack({ navigation }) {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Users" component={Subir} />
      <Stack.Screen name="User" component={User} /> */}
      <Stack.Screen
        name="InicioSesion"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subir"
        component={Subir}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
