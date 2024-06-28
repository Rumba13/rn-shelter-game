import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomePage} from "@/src/pages//home-page";
import {AppLayout} from "@/src/layouts/app-layout";

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer independent >
            <Stack.Navigator >
                <Stack.Screen name={'HomePage'} options={{headerShown: false}}>
                    {() => <AppLayout><HomePage/></AppLayout>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


