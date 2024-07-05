import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { HomePage } from '@/src/pages//home-page'
import { AppLayout } from '@/src/layouts/app-layout'
import { Text, View } from 'react-native'
import { CreateGamePage } from '@/src/pages/create-game-page'
import { SelectPlayerPage } from '@/src/pages/select-player-page'

const Stack = createNativeStackNavigator()

export default function App() {

  const stackScreenOptions: NativeStackNavigationOptions = { headerShown: false, animation: 'fade_from_bottom' }

  const HomePageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <HomePage navigation={navigation} />
      </AppLayout>
    )
  }
  const CreateGamePageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <CreateGamePage navigation={navigation} />
      </AppLayout>
    )
  }
  const SelectPlayerPageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <SelectPlayerPage />
      </AppLayout>
    )
  }
  //Change navigate animation
  return (
    <NavigationContainer independent>
      <Stack.Navigator>
        <Stack.Screen
          name={'home-page'}
          options={stackScreenOptions}
          component={HomePageRoute}
        />
        <Stack.Screen
          name={'create-game-page'}
          options={stackScreenOptions}
          component={CreateGamePageRoute}
        />
        <Stack.Screen
          name={'select-player-page'}
          options={stackScreenOptions}
          component={SelectPlayerPageRoute}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
