import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { HomePage } from '@/src/pages/home-page';
import { AppLayout } from '@/src/layouts/app-layout';
import { AppRegistry, ScrollView, Text, TextInput, View } from 'react-native';
import { CreateGamePage } from '@/src/pages/create-game-page';
import { SelectPlayerPage } from '@/src/pages/select-player-page';
import { ConnectToGamePage } from '@/src/pages/connect-to-game-page';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GamePage } from '@/src/pages/game-page';
import { SQLiteProvider } from 'expo-sqlite/next';
import { expo } from '@/app.json';
import { gameSettingsStore } from '@/src/entities/game';
//@ts-ignore
Text.defaultProps = TextInput.defaultProps = Text.defaultProps || {};
//@ts-ignore
TextInput.defaultProps.allowFontScaling = Text.defaultProps.allowFontScaling = false;

const Stack = createNativeStackNavigator();

export default function App() {
  const stackScreenOptions: NativeStackNavigationOptions = { headerShown: false, animation: 'fade_from_bottom' };

  const HomePageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <HomePage navigation={navigation} />
      </AppLayout>
    );
  };
  const CreateGamePageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <CreateGamePage navigation={navigation} gameSettingsStore={gameSettingsStore} />
      </AppLayout>
    );
  };
  const ConnectToGamePageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <ConnectToGamePage navigation={navigation} />
      </AppLayout>
    );
  };
  const SelectPlayerPageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <SelectPlayerPage navigation={navigation} />
      </AppLayout>
    );
  };
  const GamePageRoute = ({ navigation }: any) => {
    return (
      <AppLayout>
        <GamePage />
      </AppLayout>
    );
  };
  //Change navigate animation

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName={'game-assets.db'} assetSource={{ assetId: require('../../SQLite/game-assets.db') }}>
        <NavigationContainer independent>
          <Stack.Navigator screenOptions={stackScreenOptions} initialRouteName={'home-page'}>
            <Stack.Screen name={'home-page'} component={HomePageRoute} />
            <Stack.Screen name={'create-game-page'} component={CreateGamePageRoute} />
            <Stack.Screen name={'select-player-page'} component={SelectPlayerPageRoute} />
            <Stack.Screen name={'game-page'} component={GamePageRoute} />
            <Stack.Screen name={'connect-to-game-page'} component={ConnectToGamePageRoute} />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => App);