import { Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Footer } from '@/src/shared/ui/footer/ui'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { Header } from './header/ui'
import { Separator } from '@/src/pages/create-game-page/ui/separator/ui'
import { GameOptionCheckbox } from '@/src/pages/create-game-page/ui/game-option-checkbox/ui'
import { GameOptionSelect } from '@/src/pages/create-game-page/ui/game-option-select/ui'
import { SexualOrientation } from '@/src/shared/lib/types/game-creation-option/sexual-orientation'
import { gameCreationOptionsModel } from '@/src/entities/game/model/create-game-options'
import { GameOptionRange } from '@/src/pages/create-game-page/ui/game-option-range/ui'
import { difficultyValueToTitle } from '@/src/pages/create-game-page/ui/difficulty-value-to-title'
import { observer } from 'mobx-react'
import { sexualOrientationValueToTitle } from '@/src/pages/create-game-page/ui/sexual-orientation-value-to-title'
import { characterBalanceValueToTitle } from '@/src/pages/create-game-page/ui/character-balance-value-to-title'
import { GameOptionList } from '@/src/pages/create-game-page/ui/game-option-list/ui'
import { renderBunkerSelectedText } from '@/src/pages/create-game-page/ui/render-bunker-selected-text'
import { sheltersCategories } from '@/src/entities/shelter'
import { ShelterCategoryList } from '@/src/shared/lib/types/shelter-category-list'
import { shelterNameToShelter } from '@/src/entities/shelter/model/shelter-name-to-shelter'
import { apocalypsesCategories } from '@/src/entities/apocalypse'
import { ApocalypseCategories } from '@/src/shared/lib/types/apocalypse-categories'
import { renderApocalypseSelectedText } from '@/src/pages/create-game-page/ui/render-apocalypse-selected-text'
import { apocalypseNameToApocalypse } from '@/src/entities/apocalypse/model/apocalypse-name-to-apocalypse'
import {
  characteristicCardCategories,
  characteristicCards,
} from '@/src/entities/characteristic-card/model/characteristic-card'
import { renderCharacteristicCardSelectedText } from '@/src/pages/create-game-page/ui/render-characteristic-card-selected-text'
import { CharacteristicCardCategories } from '@/src/shared/lib/types/characteristic-card-categories'
import { characteristicCardNameToCard } from '@/src/entities/characteristic-card/model/characteristic-card-name-to-card'
//TODO refactoring
//TODO fix font issues

type PropsType = {
  navigation: any
}

export const CreateGamePage = observer(({ navigation }: PropsType) => {
  const [fontsLoaded, fontsError] = useFonts({
    RobotoSlab: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
  })

  const options = gameCreationOptionsModel.options

  useEffect(() => {}, [fontsLoaded, options.difficulty])

  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={s.createGamePageWrapper}>
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
            <ScrollView>
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
                    gameCreationOptionsModel.setOptions(options => (options.hillbillyMode = isEnable))
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
                    gameCreationOptionsModel.setOptions(options => (options.sexualOrientation = orientation))
                  }
                />
                <GameOptionRange
                  title={'Уровень сложности'}
                  defaultValue={4}
                  description={'Параметр определяет насколько персонажи полезны и безопасны в среднем'}
                  descriptionHeight={100}
                  selectedTitle={difficultyValueToTitle(gameCreationOptionsModel.options.difficulty)}
                  onValueChanged={difficulty =>
                    gameCreationOptionsModel.setOptions(options => (options.difficulty = difficulty))
                  }
                  min={1}
                  max={8}
                />
                <GameOptionRange
                  title={'Баланс Персонажей'}
                  descriptionHeight={100}
                  description={'Параметр определяет насколько различается полезность персонажей'}
                  onValueChanged={characterBalance =>
                    gameCreationOptionsModel.setOptions(options => (options.balance = characterBalance))
                  }
                  selectedTitle={characterBalanceValueToTitle(options.balance)}
                  min={1}
                  max={8}
                  defaultValue={options.balance}
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
                  searchPlaceholderText={'Искать Бункеры'}
                  onValueChange={shelterNames =>
                    gameCreationOptionsModel.setOptions(options => {
                      options.shelters = shelterNames.map(shelterName => shelterNameToShelter(shelterName))
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
                  selectText={'Выбрать Апокалипсис'}
                  searchPlaceholderText={'Искать Апокалипсисы'}
                  onValueChange={apocalypsesNames =>
                    gameCreationOptionsModel.setOptions(options => {
                      options.apocalypses = apocalypsesNames.map(apocalypseName =>
                        apocalypseNameToApocalypse(apocalypseName),
                      )
                    })
                  }
                  subKey={'children'}
                />
                <GameOptionList<CharacteristicCardCategories>
                  title={'Список используемых карточек'}
                  descriptionHeight={100}
                  description={'Выберите из списка, с какими карточками вы хотите играть'}
                  renderSelectedText={renderCharacteristicCardSelectedText}
                  items={characteristicCardCategories}
                  uniqueKey={'name'}
                  displayKey={'name'}
                  selectText={'Выбрать карточки'}
                  subKey={'children'}
                  searchPlaceholderText={'Искать карточки'}
                  onValueChange={characteristicCardsNames =>
                    gameCreationOptionsModel.setOptions(options => {
                      options.cardsKit = characteristicCardsNames.map(cardName =>
                        characteristicCardNameToCard(cardName),
                      )
                    })
                  }
                />
              </ImageBackground>
            </ScrollView>
          </SafeAreaView>
        </View>
      </ImageBackground>

      <Footer navigation={navigation} styles={{ marginHorizontal: 50 }} />
    </View>
  )
})

const s: any = {
  createGameButtonWrapper: {},
  createGamePageWrapper: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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
  },
  mainContentBackground: {
    marginBottom: 25,
  },
  mainContent: {
    position: 'absolute',
    right: '17.5%',
    top: '2%',
    width: '65%',
    height: '96%',
    flexDirection: 'column',
  },
}
