import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Apocalypse } from '@/src/shared/lib/types/apocalypse';
import { Shelter } from '@/src/shared/lib/types/shelter';
import { stayTimeMonthsToTitle } from '@/src/pages/game-page/ui/stay-time-months-to-title';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  EasingFunction,
  EasingFunctionFactory,
} from 'react-native-reanimated';
import { Image, ImageBackground } from 'expo-image';

type PropsType = {
  isOpened: boolean;
  isCompletelyHidden: boolean;
  setIsOpened: (isOpened: boolean) => void;
  apocalypse: Apocalypse;
  shelter: Shelter;
  shelterCapacity: number;
  animationDuration: number;
  animationEasing: EasingFunction | EasingFunctionFactory;
};

export function LeftSidebar({
                              isOpened,
                              setIsOpened,
                              apocalypse,
                              shelter,
                              isCompletelyHidden,
                              shelterCapacity,
                              animationDuration,
                              animationEasing,
                            }: PropsType) {
  const translateXAnim = useSharedValue<number>(-(leftSideBarWidth - 78));

  const closeSideBar = () => {
    translateXAnim.value = -(leftSideBarWidth - 78);
  };
  const openSideBar = () => {
    translateXAnim.value = -7;
  };
  const hideSideBar = () => {
    translateXAnim.value = -360;
  };
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(translateXAnim.value, {
          duration: animationDuration,
          easing: animationEasing,
        }),
      },
    ],
  }));

  if (isCompletelyHidden) {
    hideSideBar();
  } else {
    isOpened ? openSideBar() : closeSideBar();
  }

  return (
    <Animated.View style={[s.sideBarWrapper, animatedStyles]}>
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        contentFit={'contain'}
        source={require('@/assets/images/gamescreen/left_final.webp')}>
        <View style={s.leftSideBar}>
          <View
            style={{
              maxHeight: '100%',
              flex: 1,
              width: 278,
              marginBottom: 20,
              marginLeft: 17,
              marginTop: 34,
              padding: 16,
            }}>
            <View style={s.apocalypse}>
              <Image
                style={s.apocalypseMainImage}
                contentFit={'contain'}
                source={require('@/assets/images/gamescreen/apok.webp')}
              />

              <ImageBackground contentFit={'contain'} source={require('@/assets/images/gamescreen/text_frame.webp')}>
                <View style={{ height: 190 }}>
                  <ScrollView style={s.apocalypseDescriptionWrapper}>
                    <Text style={s.apocalypseDescription}>{apocalypse.description}</Text>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>

            <View style={s.apocalypse}>
              <Image
                style={s.shelterMainImage}
                contentFit={'contain'}
                source={require('@/assets/images/gamescreen/bunker.webp')}
              />

              <ImageBackground contentFit={'contain'} source={require('@/assets/images/gamescreen/shelter_info.webp')}>
                <View style={s.shelterInfo}>
                  <Text style={s.shelterName}>{shelter.name}</Text>
                  <Text style={s.shelterSpace}>
                    {shelter.spaceInSquareMeters}
                    {'\n'}m²
                  </Text>
                  <Text style={s.shelterCapacity}>
                    {shelterCapacity}
                    {'\n'}чел.
                  </Text>
                  <Text style={s.stayTime}>{stayTimeMonthsToTitle(shelter.stayTimeInMonths)}</Text>
                </View>
              </ImageBackground>

              <ImageBackground contentFit={'contain'} source={require('@/assets/images/gamescreen/text_frame.webp')}>
                <View style={{ height: 190 }}>
                  <ScrollView style={s.shelterDescriptionWrapper}>
                    <Text style={s.shelterDescription}>
                      {shelter.description}
                      {'\n\n'}
                      Местоположение: {shelter.location}
                      {'\n\n'}
                      Помещения:{'\n'}
                      {shelter.rooms.join(';\n')}
                      {'\n\n'}
                      Доступные ресурсы:{'\n'}
                      {shelter.resources.join(';\n')}.
                    </Text>
                  </ScrollView>
                </View>
              </ImageBackground>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => setIsOpened(!isOpened)}>
            <View style={s.leftSideBarDetailWrapper}>
              <Image
                style={s.leftSideBarDetail}
                contentFit={'contain'}
                source={require('@/assets/images/gamescreen/apoc_bunker_icon.webp')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const leftSideBarWidth = 370;
const shelterInfoLineHeight = 16;
const s = StyleSheet.create({
  leftSideBarDetailWrapper: {
    position: 'absolute',
    right: 20,
    bottom: 0,
    padding: 10,
    paddingBottom: 20,
    paddingTop: 30,
  },
  shelterMainImage: {
    width: '70%',
    maxWidth: '100%',
    marginHorizontal: 'auto',
    aspectRatio: 325 / 77,
    marginTop: 20,
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
    width: 43,
    height: 120,
  },
});
