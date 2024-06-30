import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomePage} from "@/src/pages//home-page";
import {AppLayout} from "@/src/layouts/app-layout";
import {Text, View} from "react-native"

const Stack = createNativeStackNavigator()

export default function App() {

    const HomePageRoute = ({navigation}: any) => {
        return <AppLayout><HomePage navigation={navigation}/></AppLayout>;
    }
    const CreateGamePageRoute = ({navigation}: any) => {
        return <AppLayout><Text>Eva</Text></AppLayout>
    }
 //Change navigate animation
    return (
        <NavigationContainer independent >
            <Stack.Navigator>
                <Stack.Screen name={'home-page'} options={{headerShown: false, animation:"fade_from_bottom"}} component={HomePageRoute}/>
                <Stack.Screen name={"create-game-page"} options={{headerShown: false, animation:"fade_from_bottom"}}
                              component={CreateGamePageRoute}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


