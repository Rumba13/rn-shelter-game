import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Footer } from '@/src/shared/ui/footer/ui';
import { useEffect, useMemo, useState } from 'react';
import { Header } from './header/ui';
import { GameOptionCheckbox } from '@/src/pages/create-game-page/ui/game-option-checkbox/ui';
import { GameOptionSelect } from '@/src/pages/create-game-page/ui/game-option-select/ui';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { GameSettingsStore } from '@/src/entities/game/model/game-settings';
import { GameOptionRange } from '@/src/pages/create-game-page/ui/game-option-range/ui';
import { difficultyToTitleMap } from '@/src/pages/create-game-page/ui/difficulty-to-title-map';
import { observer } from 'mobx-react';
import {
  sexualOrientationToTitleMap,
  sexualOrientationValueToTitle,
} from '@/src/pages/create-game-page/ui/sexual-orientation-to-title-map';
import {
  characterBalanceMap,
} from '@/src/pages/create-game-page/ui/character-balance-to-title-map';
import { GameOptionList } from '@/src/pages/create-game-page/ui/game-option-list/ui';
import { renderBunkerSelectedText } from '@/src/pages/create-game-page/ui/render-bunker-selected-text';
import { ShelterCategoryList } from '@/src/shared/lib/types/shelter-category-list';
import { shelterNameToShelter } from '@/src/entities/shelter/model/shelter-name-to-shelter';
import { ApocalypseCategories } from '@/src/shared/lib/types/apocalypse-categories';
import { renderApocalypseSelectedText } from '@/src/pages/create-game-page/ui/render-apocalypse-selected-text';
import { apocalypseNameToApocalypse } from '@/src/entities/apocalypse/model/apocalypse-name-to-apocalypse';
import {
  cardsStore,
} from '@/src/entities/characteristic-card/model/cards-store';
import {
  renderCharacteristicCardSelectedText,
} from '@/src/pages/create-game-page/ui/render-characteristic-card-selected-text';
import { CharacteristicCardsList } from '@/src/shared/lib/types/characteristic-cards-list';
import {
  characteristicBalanceToTitleMap,
} from '@/src/pages/create-game-page/ui/characteristic-balance-to-title-map';
import { createGameStore } from '@/src/feature/create-game/model/create-game';
import { gameStore } from '@/src/entities/game/model/game';
import { OverlayModal } from '@/src/shared/ui/overlay-modal/ui';
import { Image } from 'expo-image';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { apocalypsesStore } from '@/src/entities/apocalypse/model/apocalypses-store';
import { sheltersStore } from '@/src/entities/shelter/model/shelters';

//TODO refactoring
type PropsType = {
  navigation: any;
  gameSettingsStore: GameSettingsStore
};

export const CreateGamePage = observer(({ navigation, gameSettingsStore }: PropsType) => {
  const [isErrorModalOpened, setIsErrorModalOpened] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [isPageFullLoadingStarted, setIsPageFullLoadingStarted] = useState<boolean>(false);
  const selectedByDefaultCards = useMemo(() => cardsStore.getAllCards().map(card => card.name), [cardsStore]);
  const cardsStandartEdition = useMemo(() => cardsStore.getCardsByEdition('standart'), []);
  const cardsBorovEdition = useMemo(() => cardsStore.getCardsByEdition('borov'), []);

  const { settings } = gameSettingsStore;

  useEffect(() => {
    setTimeout(() => {
      setIsPageFullLoadingStarted(true);
    }, 100);
  }, []);

  return (
    <View style={s.createGamePageWrapper}>
      <Image
        style={s.pageTitle}
        contentFit={'contain'}
        source={require('../../../../assets/images/gamecreationscreen/create.webp')}
      />
      <View style={{ width: '80%', marginHorizontal: 'auto' }}>
        <ImageBackground
          source={require('../../../../assets/images/gamecreationscreen/frame_back.webp')}
          resizeMode={'contain'}
          style={s.mainContentBackground}>
          <View style={s.mainContentWrapper}>
            <SafeAreaView style={s.mainContent}>
              <ScrollView decelerationRate={0.985}>
                <Header />
                <GameOptionCheckbox
                  isEnable={settings.hillbillyMode}
                  title={`Проклятые деревенщины`}
                  description={'Параметр определяет будут ли задействованы деревенщины'}
                  onValueChange={isEnable =>
                    gameSettingsStore.setSettings(options => (options.hillbillyMode = isEnable))
                  }
                />
                <GameOptionCheckbox
                  isEnable={settings.lotteryTicketMode}
                  title={'Режим лотереи'}
                  description={'Трудно объяснить, что этот режим делает...'}
                  onValueChange={value =>
                    gameSettingsStore.setSettings(settings => (settings.lotteryTicketMode = value))
                  }
                />
                <GameOptionSelect
                  description={'Параметр определяет кто пидр, кто не пидр и всё такое'}
                  title={'Сексуальная Ориентация'}
                  items={[
                    SexualOrientation.Random,
                    SexualOrientation.AllStraight,
                    SexualOrientation.AllGays,
                    SexualOrientation.Disable,
                  ].map(value => ({
                    value,
                    key: value,
                    label: sexualOrientationToTitleMap[value],
                  }))}
                  onValueChange={orientation =>
                    gameSettingsStore.setSettings(options => (options.sexualOrientation = orientation))
                  }
                />

                {isPageFullLoadingStarted && <>

                  <GameOptionRange
                    title={'Уровень сложности'}
                    defaultValue={settings.difficulty}
                    description={'Параметр определяет насколько персонажи полезны и безопасны в среднем'}
                    selectedTitle={difficultyToTitleMap[settings.difficulty]}
                    onValueChanged={difficulty =>
                      gameSettingsStore.setSettings(options => (options.difficulty = difficulty))
                    }
                    min={gameSettingsStore.settingsLimits.difficulty.min}
                    max={gameSettingsStore.settingsLimits.difficulty.max}
                  />

                  <GameOptionRange
                    title={'Баланс Персонажей'}
                    description={'Параметр определяет насколько различается полезность персонажей'}
                    onValueChanged={characterBalance =>
                      gameSettingsStore.setSettings(options => (options.balance = characterBalance))
                    }
                    selectedTitle={characterBalanceMap[settings.balance]}
                    min={gameSettingsStore.settingsLimits.balance.min}
                    max={gameSettingsStore.settingsLimits.balance.max}
                    defaultValue={settings.balance}
                  />
                  <GameOptionRange
                    title={'Баланс характеристик'}
                    description={'Параметр определяет разброс характеристик'}
                    onValueChanged={characteristicBalance =>
                      gameSettingsStore.setSettings(settings => (settings.characteristicBalance = characteristicBalance))
                    }
                    selectedTitle={characteristicBalanceToTitleMap[settings.characteristicBalance]}
                    min={gameSettingsStore.settingsLimits.characteristicBalance.min}
                    max={gameSettingsStore.settingsLimits.characteristicBalance.max}
                    defaultValue={settings.characteristicBalance}
                  />

                  <GameOptionList<ShelterCategoryList>
                    title={'Список бункеров'}
                    description={'Выберите из списка, с какими бункерами вы хотите играть'}
                    renderSelectedText={renderBunkerSelectedText}
                    items={[
                      {
                        name: 'Бункеры Стандартного Издания',
                        children: sheltersStore.getSheltersByEdition('standart'),
                      },
                      {
                        name: 'Бункеры Издания "Боров"',
                        children: sheltersStore.getSheltersByEdition('borov'),
                      },
                    ]}
                    uniqueKey={'name'}
                    subKey={'children'}
                    displayKey={'name'}
                    selectText={'Выбрать бункер'}
                    selectedByDefault={['Тора Бора']}
                    searchPlaceholderText={'Искать Бункеры'}
                    onValueChange={shelterNames =>
                      gameSettingsStore.setSettings(options => {
                        options.shelters = shelterNames.map(shelterName => shelterNameToShelter(shelterName));
                      })
                    }
                  />

                  <GameOptionList<ApocalypseCategories>
                    title={'Список апокалипсисов'}
                    description={'Выберите из списка, с какими апокалипсисами вы хотите играть'}
                    renderSelectedText={renderApocalypseSelectedText}
                    items={[
                      {
                        name: 'Апокалипсисы Стандартного Издания',
                        children: apocalypsesStore.getApocalypsesByEdition('standart'),
                      },
                      {
                        name: 'Апокалипсисы Издания "Боров"',
                        children: apocalypsesStore.getApocalypsesByEdition('borov'),
                      },
                    ]}
                    uniqueKey={'name'}
                    displayKey={'name'}
                    selectedByDefault={['Гигантские Змеи']}
                    selectText={'Выбрать Апокалипсис'}
                    searchPlaceholderText={'Искать Апокалипсисы'}
                    onValueChange={apocalypsesNames =>
                      gameSettingsStore.setSettings(options => {
                        options.apocalypses = apocalypsesNames.map(apocalypseNameToApocalypse);
                      })
                    }
                    subKey={'children'}
                  />
                  <GameOptionList<CharacteristicCardsList>
                    title={'Список используемых карточек'}
                    description={'Выберите из списка, с какими карточками вы хотите играть'}
                    renderSelectedText={renderCharacteristicCardSelectedText}
                    items={[
                      { name: 'Карточки Стандартного Издания', children: cardsStandartEdition },
                      { name: 'Карточки Издания "Боров"', children: cardsBorovEdition },
                    ]}
                    uniqueKey={'name'}
                    displayKey={'name'}
                    selectText={'Выбрать карточки'}
                    subKey={'children'}
                    selectedByDefault={selectedByDefaultCards}
                    searchPlaceholderText={'Искать карточки'}
                    onValueChange={characteristicCardsNames =>
                      gameSettingsStore.setSettings(options => options.cardsKit = characteristicCardsNames.map(cardsStore.getCardByName))
                    }
                  />
                </>}

              </ScrollView>
            </SafeAreaView>
          </View>
        </ImageBackground>

        <OverlayModal
          isModalOpened={isErrorModalOpened}
          setIsModalOpened={setIsErrorModalOpened}
          overlayStyle={{ backgroundColor: 'rgba(255,0,0, 0.5)' }}>
          <View style={s.errorModalContent}>
            <Text style={s.errorModalTitle}>ААААААА ОЩИБКА</Text>
            <Text style={s.errorModalError}>{errorDescription}</Text>
          </View>
        </OverlayModal>
      </View>

      <Footer
        style={{ marginHorizontal: 35 }}
        onButtonPress={() => {
          try {
            gameStore.game = createGameStore.createGame(gameSettingsStore.settings);
            navigation.navigate('select-player-page');
          } catch (err) {
            setIsErrorModalOpened(true);
            setErrorDescription(String(err));
          }
        }}
      />
    </View>
  );
});

const s = StyleSheet.create({
  errorModalTitle: {
    position: 'absolute',
    top: -36,
    fontSize: adaptiveValue(29),
    width: '100%',
    textAlign: 'center',
  },
  errorModalContent: {
    maxWidth: '100%',
    margin: 20,
    padding: 10,
    borderRadius: 10,
  },
  errorModalError: {
    fontSize: adaptiveValue(18),
    lineHeight: 20,
    letterSpacing: 1.2,
    fontFamily: 'RobotoSlab',
  },
  createGameButtonWrapper: {},
  createGamePageWrapper: {
    maxWidth: '100%',
    flex: 1,
  },
  pageTitle: {
    maxWidth: '90%',
    width: '100%',
    height: 80,
    marginTop: 50,
    marginBottom: 13,
    flexBasis: 'auto',
    alignSelf: 'center',
  },
  mainContentWrapper: {
    position: 'relative',
    marginBottom: 12,
    marginHorizontal: 15,
    marginTop: 12,
  },
  mainContentBackground: {
    position: 'relative',
    aspectRatio: 549 / 934,
  },
  mainContent: {},
});
