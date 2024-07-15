import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Footer } from '@/src/shared/ui/footer/ui';
import { useEffect, useState } from 'react';
import { Header } from './header/ui';
import { Separator } from '@/src/pages/create-game-page/ui/separator/ui';
import { GameOptionCheckbox } from '@/src/pages/create-game-page/ui/game-option-checkbox/ui';
import { GameOptionSelect } from '@/src/pages/create-game-page/ui/game-option-select/ui';
import { SexualOrientation } from '@/src/shared/lib/types/sexual-orientation';
import { gameSettingsStore } from '@/src/entities/game/model/game-settings';
import { GameOptionRange } from '@/src/pages/create-game-page/ui/game-option-range/ui';
import { difficultyValueToTitle } from '@/src/pages/create-game-page/ui/difficulty-value-to-title';
import { observer } from 'mobx-react';
import { sexualOrientationValueToTitle } from '@/src/pages/create-game-page/ui/sexual-orientation-value-to-title';
import { characterBalanceValueToTitle } from '@/src/pages/create-game-page/ui/character-balance-value-to-title';
import { GameOptionList } from '@/src/pages/create-game-page/ui/game-option-list/ui';
import { renderBunkerSelectedText } from '@/src/pages/create-game-page/ui/render-bunker-selected-text';
import { sheltersCategories } from '@/src/entities/shelter';
import { ShelterCategoryList } from '@/src/shared/lib/types/shelter-category-list';
import { shelterNameToShelter } from '@/src/entities/shelter/model/shelter-name-to-shelter';
import { apocalypses, apocalypsesCategories } from '@/src/entities/apocalypse';
import { ApocalypseCategories } from '@/src/shared/lib/types/apocalypse-categories';
import { renderApocalypseSelectedText } from '@/src/pages/create-game-page/ui/render-apocalypse-selected-text';
import { apocalypseNameToApocalypse } from '@/src/entities/apocalypse/model/apocalypse-name-to-apocalypse';
import {
  characteristicCards,
  characteristicCardsList,
} from '@/src/entities/characteristic-card/model/characteristic-card';
import { renderCharacteristicCardSelectedText } from '@/src/pages/create-game-page/ui/render-characteristic-card-selected-text';
import { CharacteristicCardsList } from '@/src/shared/lib/types/characteristic-cards-list';
import { characteristicCardNameToCard } from '@/src/entities/characteristic-card/model/characteristic-card-name-to-card';
import { characteristicBalanceValueToTitle } from '@/src/pages/create-game-page/ui/characteristic-balance-value-to-title';
import { createGameStore } from '@/src/feature/create-game/model/create-game';
import { gameStore } from '@/src/entities/game/model/game';
import { OverlayModal } from '@/src/shared/ui/overlay-modal/ui';
import { cardKitToCards } from '@/src/shared/lib/card-kit-to-cards';
//TODO refactoring
//TODO fix font issues

type PropsType = {
  navigation: any;
};

export const CreateGamePage = observer(({ navigation }: PropsType) => {
  const [isErrorModalOpened, setIsErrorModalOpened] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);

  const settings = gameSettingsStore.settings;

  return (
    <View style={s.createGamePageWrapper}>
      <View style={{ flex: 1, height: 'auto' }}>
        <Image
          style={s.pageTitle}
          resizeMode={'contain'}
          source={require('../../../../assets/images/gamecreationscreen/create.png')}
        />
        <ImageBackground
          source={require('../../../../assets/images/gamecreationscreen/frame_back.png')}
          resizeMode={'contain'}
          style={s.mainContentBackground}>
          <View style={s.mainContentWrapper}>
            <SafeAreaView style={s.mainContent}>
              <ScrollView decelerationRate={0.985}>
                <ImageBackground
                  resizeMode={'repeat'}
                  source={require('@/assets/images/gamecreationscreen/create_back.png')}>
                  <Header />
                  <Separator />
                  <GameOptionCheckbox
                    title={`Проклятые деревенщины`}
                    descriptionHeight={100}
                    description={'Параметр определяет будут ли задействованы деревенщины'}
                    onValueChange={isEnable =>
                      gameSettingsStore.setSettings(options => (options.hillbillyMode = isEnable))
                    }
                  />
                  <GameOptionSelect
                    descriptionHeight={100}
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
                      label: sexualOrientationValueToTitle(value),
                    }))}
                    onValueChange={orientation =>
                      gameSettingsStore.setSettings(options => (options.sexualOrientation = orientation))
                    }
                  />
                  <GameOptionRange
                    title={'Уровень сложности'}
                    defaultValue={settings.difficulty}
                    description={'Параметр определяет насколько персонажи полезны и безопасны в среднем'}
                    descriptionHeight={100}
                    selectedTitle={difficultyValueToTitle(gameSettingsStore.settings.difficulty)}
                    onValueChanged={difficulty =>
                      gameSettingsStore.setSettings(options => (options.difficulty = difficulty))
                    }
                    min={gameSettingsStore.settingsLimits.difficulty.min}
                    max={gameSettingsStore.settingsLimits.difficulty.max}
                  />
                  <GameOptionRange
                    title={'Баланс Персонажей'}
                    descriptionHeight={100}
                    description={'Параметр определяет насколько различается полезность персонажей'}
                    onValueChanged={characterBalance =>
                      gameSettingsStore.setSettings(options => (options.balance = characterBalance))
                    }
                    selectedTitle={characterBalanceValueToTitle(settings.balance)}
                    min={gameSettingsStore.settingsLimits.balance.min}
                    max={gameSettingsStore.settingsLimits.balance.max}
                    defaultValue={settings.balance}
                  />
                  <GameOptionRange
                    title={'Баланс характеристик'}
                    descriptionHeight={70}
                    description={'Параметр определяет разброс характеристик'}
                    onValueChanged={characteristicBalance =>
                      gameSettingsStore.setSettings(
                        settings => (settings.characteristicBalance = characteristicBalance),
                      )
                    }
                    selectedTitle={characteristicBalanceValueToTitle(settings.characteristicBalance)}
                    min={gameSettingsStore.settingsLimits.characteristicBalance.min}
                    max={gameSettingsStore.settingsLimits.characteristicBalance.max}
                    defaultValue={settings.characteristicBalance}
                  />

                  <GameOptionList<ShelterCategoryList>
                    title={'Список бункеров'}
                    descriptionHeight={100}
                    description={'Выберите из списка, с какими бункерами вы хотите играть'}
                    renderSelectedText={renderBunkerSelectedText}
                    items={sheltersCategories}
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
                    descriptionHeight={100}
                    description={'Выберите из списка, с какими апокалипсисами вы хотите играть'}
                    renderSelectedText={renderApocalypseSelectedText}
                    items={apocalypsesCategories}
                    uniqueKey={'name'}
                    displayKey={'name'}
                    selectedByDefault={['Гигантские Змеи']}
                    selectText={'Выбрать Апокалипсис'}
                    searchPlaceholderText={'Искать Апокалипсисы'}
                    onValueChange={apocalypsesNames =>
                      gameSettingsStore.setSettings(options => {
                        options.apocalypses = apocalypsesNames.map(apocalypseName =>
                          apocalypseNameToApocalypse(apocalypseName),
                        );
                      })
                    }
                    subKey={'children'}
                  />
                  <GameOptionList<CharacteristicCardsList>
                    title={'Список используемых карточек'}
                    descriptionHeight={100}
                    description={'Выберите из списка, с какими карточками вы хотите играть'}
                    renderSelectedText={renderCharacteristicCardSelectedText}
                    items={characteristicCardsList}
                    uniqueKey={'name'}
                    displayKey={'name'}
                    selectText={'Выбрать карточки'}
                    subKey={'children'}
                    selectedByDefault={cardKitToCards(characteristicCards).map(card => card.name)}
                    searchPlaceholderText={'Искать карточки'}
                    onValueChange={characteristicCardsNames =>
                      gameSettingsStore.setSettings(options => {
                        options.cardsKit = characteristicCardsNames.map(cardName =>
                          characteristicCardNameToCard(cardName),
                        );
                      })
                    }
                  />
                </ImageBackground>
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
        onNextButtonPress={() => {
          try {
            gameStore.setGame(createGameStore.createGame(gameSettingsStore.settings));

            navigation.navigate('select-player-page');
          } catch (err) {
            setIsErrorModalOpened(true);
            setErrorDescription(String(err));
          }
        }}
        styles={{ marginHorizontal: 50 }}
      />
    </View>
  );
});

const s: any = {
  errorModalTitle: {
    position: 'absolute',
    top: -36,
    fontSize: 29,
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
    fontSize: 18,
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
    marginTop: 50,
    marginBottom: 33,
    maxHeight: 80,
    flexBasis: 'auto',
    alignSelf: 'center',
  },
  mainContentWrapper: {
    position: 'relative',
    width: '100%',
    height: 470,

    maxHeight: '100%',
  },
  mainContentBackground: {},
  mainContent: {
    position: 'relative',
    left: 67,
    top: 10,
    width: '65%',
    height: '96%',
    flexDirection: 'column',
  },
};
