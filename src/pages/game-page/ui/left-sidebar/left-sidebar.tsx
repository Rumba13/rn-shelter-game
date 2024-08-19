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
  EasingFunction,
  EasingFunctionFactory,
} from 'react-native-reanimated';
import { Image, ImageBackground } from 'expo-image';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

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
const sideBarAspectRatio = 657 / 1442;
const sideBarHeight = Dimensions.get('window').height;
const sideBarWidth = sideBarHeight * sideBarAspectRatio;

const sideBarClosedAtPx = -((sideBarWidth / 100) * 78);
const sideBarOpenedAtPx = 0;
const sideBarHiddenAtPx = -430;

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
  const translateXAnim = useSharedValue<number>(sideBarClosedAtPx);
  const closeSideBar = () => {
    translateXAnim.value = sideBarClosedAtPx;
  };
  const openSideBar = () => {
    translateXAnim.value = sideBarOpenedAtPx;
  };
  const hideSideBar = () => {
    translateXAnim.value = sideBarHiddenAtPx;
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
        source={require('@/assets/images/gamescreen/sidebar-left.webp')}>
        <View style={s.leftSideBar}>
          <View
            style={{
              flex: 1,
              marginBottom: '6%',
              marginLeft: '3%',
              marginTop: '10%',
              marginRight: '19.5%',
              padding: 16,
            }}>
            <View style={s.apocalypse}>
              <Image
                style={s.apocalypseMainImage}
                contentFit={'contain'}
                source={require('@/assets/images/gamescreen/apocalypse-icon.webp')}
              />

              <ImageBackground contentFit={'contain'} source={require('@/assets/images/gamescreen/text-box-small-background.webp')}>
                <View style={{ width: '100%', aspectRatio: 441 / 343 }}>
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
                source={require('@/assets/images/gamescreen/bunker-icon.webp')}
              />

              <ImageBackground contentFit={'contain'} source={require('@/assets/images/gamescreen/shelter-info.webp')}>
                <View style={s.shelterInfo}>
                  <Text style={s.shelterName} adjustsFontSizeToFit>
                    {shelter.name}
                  </Text>
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

              <ImageBackground
                style={{ marginTop: 20 }}
                contentFit={'contain'}
                source={require('@/assets/images/gamescreen/text-box-small-background.webp')}>
                <View style={{ width: '100%', aspectRatio: 441 / 343 }}>
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
                source={require('@/assets/images/gamescreen/apocalypse-bunker-icon.webp')}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

const shelterInfoLineHeight = 16;
const s = StyleSheet.create({
  shelterMainImage: {
    height: 'auto',
    width: '75%',
    marginHorizontal: 'auto',
    maxWidth: '100%',
    aspectRatio: 325 / 77,
    marginBottom: 20,
    marginTop: 20,
  },
  shelterName: {
    position: 'absolute',
    color: '#dcceac',
    fontFamily: 'RobotoSlabMedium',
    fontSize: adaptiveValue(23),
    height: '37%',
    width: '100%',
    top: '0%',
    textAlign: 'center',
  },
  shelterSpace: {
    position: 'absolute',
    color: '#dcceac',
    bottom: '12%',
    lineHeight: shelterInfoLineHeight,
    left: '20%',
    fontFamily: 'RobotoSlab',
    fontSize: adaptiveValue(13),
  },
  shelterCapacity: {
    position: 'absolute',
    bottom: '12%',
    lineHeight: shelterInfoLineHeight,
    left: '50%',
    color: '#dcceac',
    fontFamily: 'RobotoSlab',
    fontSize: adaptiveValue(13),
  },
  stayTime: {
    position: 'absolute',
    bottom: '12%',
    left: '80%',
    lineHeight: shelterInfoLineHeight,
    color: '#dcceac',
    fontFamily: 'RobotoSlab',
    fontSize: adaptiveValue(13),
  },

  apocalypse: {},
  apocalypseMainImage: {
    height: 'auto',
    width: '100%',
    maxWidth: '100%',
    aspectRatio: 492 / 202,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  apocalypseDescriptionWrapper: {
    margin: '1.7%',
  },
  shelterDescriptionWrapper: {
    margin: '1.7%',
  },
  shelterInfo: {
    position: 'relative',
    width: '100%',
    aspectRatio: 493 / 184,
  },
  apocalypseDescription: {
    fontSize: adaptiveValue(15),
    color: '#232322',
    fontFamily: 'RobotoSlabMedium',
    lineHeight: adaptiveValue(20),
    letterSpacing: 1.3,
    paddingHorizontal: 8,
    paddingLeft: 12,
    paddingVertical: 5,
  },
  shelterDescription: {
    fontSize: adaptiveValue(15),
    color: '#232322',
    fontFamily: 'RobotoSlabMedium',
    lineHeight: adaptiveValue(20),
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
    height: sideBarHeight,
    aspectRatio: sideBarAspectRatio,
  },
  leftSideBarDetail: {
    width: 'auto',
    height: '100%',
    aspectRatio: 81 / 183,
  },
  leftSideBarDetailWrapper: {
    height: '20.5%',
    position: 'absolute',
    right: '4%',
    bottom: 0,
    padding: '3%',
    paddingBottom: '7%',
    paddingTop: '6%',
  },
});
