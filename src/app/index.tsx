import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { HomePage } from '@/src/pages/home-page';
import { AppLayout } from '@/src/layouts/app-layout';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { CreateGamePage } from '@/src/pages/create-game-page';
import { SelectPlayerPage } from '@/src/pages/select-player-page';
import { ConnectToGamePage } from '@/src/pages/connect-to-game-page';
import { gameStore } from '@/src/entities/game/model/game';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GamePage } from '@/src/pages/game-page';
import { SQLiteProvider } from 'expo-sqlite/next';
import { createStackNavigator } from '@react-navigation/stack';

//@ts-ignore
Text.defaultProps = Text.defaultProps || {};
//@ts-ignore
Text.defaultProps.allowFontScaling = false;
//@ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
//@ts-ignore
TextInput.defaultProps.allowFontScaling = false;

const Stack = createNativeStackNavigator();

export default function App() {
  const stackScreenOptions: NativeStackNavigationOptions = { headerShown: false, animation: 'fade_from_bottom', };

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
        <CreateGamePage navigation={navigation} />
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
  const DevPageRoute = ({ navigation }: any) => {
    const game = gameStore.getGame();

    return (
      <AppLayout>
        <ScrollView>
          <Text>
            {game.shelter.name}
            {game.apocalypse.name}
            {game.players.map(player => (
              <View key={player.profession.id}>
                <Text>------------------- {player.profession.name}</Text>
                <Text>
                  Био {player.bioCharacteristics?.price}: {player.bioCharacteristics?.name}
                </Text>
                <Text>
                  Здоровье {player.health?.price}: {player.health?.name}
                </Text>
                <Text>
                  Багаж {player.luggage?.price}: {player.luggage?.name}
                </Text>
                <Text>
                  Карта условия {player.conditionCard?.price}: {player.conditionCard?.name}
                </Text>
                <Text>
                  Характер {player.character?.price}: {player.character?.name}
                </Text>
                <Text>
                  Информация {player.additionalInformation?.price}: {player.additionalInformation?.name}
                </Text>
                <Text>
                  Хобби {player.hobby?.price}: {player.hobby?.name}
                </Text>
                <Text>
                  Фобия {player.phobia?.price}: {player.phobia?.name}
                </Text>
                <Text>
                  Карта действия {player.actionCard?.price}: {player.actionCard?.name}
                </Text>
                <Text>
                  Знания {player.knowledge?.price}: {player.knowledge?.name}
                </Text>
              </View>
            ))}
          </Text>
        </ScrollView>
      </AppLayout>
    );
  };
  //Change navigate animation

  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName={'game-assets.db'} assetSource={{ assetId: require('../../SQLite/game-assets.db') }}>
        <NavigationContainer independent>
          <Stack.Navigator>
            <Stack.Screen name={'home-page'}  options={stackScreenOptions} component={HomePageRoute} />
            <Stack.Screen name={'create-game-page'} options={stackScreenOptions} component={CreateGamePageRoute} />
            <Stack.Screen name={'select-player-page'} options={stackScreenOptions} component={SelectPlayerPageRoute} />
            <Stack.Screen name={'dev-page'} options={stackScreenOptions} component={DevPageRoute} />
            <Stack.Screen name={'game-page'} options={stackScreenOptions} component={GamePageRoute} />
            <Stack.Screen name={'connect-to-game-page'} options={stackScreenOptions}
                          component={ConnectToGamePageRoute} />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
