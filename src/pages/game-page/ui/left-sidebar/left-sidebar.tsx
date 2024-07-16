import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  Animated,
  Touchable,
  TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { gameStore } from '@/src/entities/game';
import { stayTimeMonthsToTitle } from '@/src/pages/game-page/ui/stay-time-months-to-title';

type PropsType = {
  isOpened: boolean,
  isCompletelyHidden: boolean,
  setIsOpened: (isOpened: boolean) => void,
  apocalypse: Apocalypse,
  shelter: Shelter,
  shelterCapacity: number,
  animationDuration: number,
}

export function LeftSidebar({
                              isOpened,
                              setIsOpened,
                              apocalypse,
                              shelter,
                              isCompletelyHidden,
                              shelterCapacity,
                              animationDuration,
                            }: PropsType) {
  const translateXAnim = useRef(new Animated.Value(-(leftSideBarWidth - 78))).current;

  const closeSideBar = () => {
    Animated.timing(translateXAnim, {
      toValue: -(leftSideBarWidth - 78),
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };
  const openSideBar = () => {
    Animated.timing(translateXAnim, {
      toValue: -7,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };
  const hideSideBar = () => {
    Animated.timing(translateXAnim, {
      toValue: -360,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };


  if (isCompletelyHidden) {
    hideSideBar();
  } else {
    isOpened
      ? openSideBar()
      : closeSideBar();
  }


  return (
    <Animated.View style={{ ...s.sideBarWrapper, transform: [{ translateX: translateXAnim }] }}>
      <ImageBackground style={{ width: '100%', height: '100%' }} resizeMode={'contain'}
                       source={require('@/assets/images/gamescreen/left_final.png')}>
        <Animated.View style={s.leftSideBar}>
          <View style={{
            maxHeight: '100%',
            flex: 1,
            width: 278,
            marginBottom: 20,
            marginLeft: 17,
            marginTop: 34,
            padding: 16,
          }}>

            <View style={s.apocalypse}>
              <Image style={s.apocalypseMainImage} resizeMode={'contain'}
                     source={require('@/assets/images/gamescreen/apok.png')} />

              <ImageBackground resizeMode={'contain'} source={require('@/assets/images/gamescreen/text_frame.png')}>
                <View style={{ height: 190 }}>
                  <ScrollView style={s.apocalypseDescriptionWrapper}>
                    <Text style={s.apocalypseDescription}>{apocalypse.description}</Text>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>

            <View style={s.apocalypse}>
              <Image style={s.shelterMainImage} resizeMode={'contain'}
                     source={require('@/assets/images/gamescreen/bunker.png')} />

              <ImageBackground resizeMode={'contain'} source={require('@/assets/images/gamescreen/shelter_info.png')}>
                <View style={s.shelterInfo}>
                  <Text style={s.shelterName}>{shelter.name}</Text>
                  <Text style={s.shelterSpace}>{shelter.spaceInSquareMeters}{'\n'}m²</Text>
                  <Text style={s.shelterCapacity}>{shelterCapacity}{'\n'}чел.</Text>
                  <Text style={s.stayTime}>{stayTimeMonthsToTitle(shelter.stayTimeInMonths)}</Text>
                </View>
              </ImageBackground>

              <ImageBackground resizeMode={'contain'} source={require('@/assets/images/gamescreen/text_frame.png')}>
                <View style={{ height: 190 }}>
                  <ScrollView style={s.shelterDescriptionWrapper}>
                    <Text style={s.shelterDescription}>
                      {shelter.description}{'\n\n'}
                      Местоположение: {shelter.location}{'\n\n'}
                      Помещения:{'\n'}{shelter.rooms.join(';\n')}{'\n\n'}

                      Доступные ресурсы:{'\n'}{shelter.resources.join(';\n')}.

                    </Text>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>


          </View>
          <TouchableWithoutFeedback onPress={() => setIsOpened(!isOpened)}>
            <Image style={s.leftSideBarDetail} resizeMode={'contain'}
                   source={require('@/assets/images/gamescreen/apoc_bunker_icon.png')} />
          </TouchableWithoutFeedback>
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
}

const leftSideBarWidth = 370;
const shelterInfoHeight = 109;
const shelterInfoLineHeight = 16;
const s = StyleSheet.create({
  shelterMainImage: {
    maxWidth: '100%',
    marginHorizontal: 'auto',
    width: '70%',
  },
  shelterName: {
    position: 'absolute',
    color: '#dcceac',
    fontFamily: 'RobotoSlabMedium',
    fontSize: 27,
    width: '100%',
    top: 16,
    textAlign: 'center',
  },
  shelterSpace: {
    position: 'absolute',
    color: '#dcceac',
    bottom: 13,
    lineHeight: shelterInfoLineHeight,
    left: 50,
    fontFamily: 'RobotoSlab',
    fontSize: 13,
  },
  shelterCapacity: {
    position: 'absolute',
    bottom: 13,
    lineHeight: shelterInfoLineHeight,
    left: 122,
    color: '#dcceac',
    fontFamily: 'RobotoSlab',
    fontSize: 13,
  },
  stayTime: {
    position: 'absolute',
    bottom: 13,
    left: 195,
    lineHeight: shelterInfoLineHeight,
    color: '#dcceac',
    fontFamily: 'RobotoSlab',
    fontSize: 13,
  },

  apocalypse: {},
  apocalypseMainImage: {
    maxWidth: '100%',
    height: 110,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  apocalypseDescriptionWrapper: {
    maxHeight: 182,
    marginVertical: 'auto',
  },
  shelterDescriptionWrapper: {
    maxHeight: 182,
    marginVertical: 'auto',
  },
  shelterInfo: {
    position: 'relative',
    height: 109,
    width: '100%',
    marginBottom: 15,

  },
  apocalypseDescription: {
    fontSize: 15,
    color: '#232322',
    fontFamily: 'RobotoSlabMedium',
    lineHeight: 20,
    letterSpacing: 1.3,
    paddingHorizontal: 8,
    paddingLeft: 12,
    paddingVertical: 5,
  },
  shelterDescription: {
    fontSize: 15,
    color: '#232322',
    fontFamily: 'RobotoSlabMedium',
    lineHeight: 20,
    letterSpacing: 1.3,
    paddingHorizontal: 8,
    paddingLeft: 12,
    paddingVertical: 5,
  },

  leftSideBar: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  sideBarWrapper: {
    position: 'absolute',
    top: -20,
    zIndex: 200,
    width: leftSideBarWidth,
    height: Dimensions.get('window').height,
  },
  leftSideBarDetail: {
    position: 'absolute',
    right: 32,
    bottom: 25,
    width: 43,
    height: 120,
  },
});