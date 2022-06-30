import { createStackNavigator } from '@react-navigation/stack';
import Users from './Users';
import User from './User';
import Subir from './Subir';

const Stack = createStackNavigator();

 export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Users" component={Subir} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>  
  );
}