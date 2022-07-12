import { createStackNavigator } from "@react-navigation/stack";
import Users from "./Users";
import User from "./User";
import Subir from "./Subir";
import RegistrarUario from "./registrarUsuario";

const Stack = createStackNavigator();

export default function UserStack({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Users" component={Subir} />
      <Stack.Screen name="User" component={User} /> */}
      <Stack.Screen
        name="RegistrarUario"
        component={RegistrarUario}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subir"
        component={Subir} /* options={{ headerShown: false }} */
      />
    </Stack.Navigator>
  );
}
