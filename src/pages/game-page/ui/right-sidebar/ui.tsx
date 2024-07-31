import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { Player } from '@/src/shared/lib/types/player';
import { ScratchCard } from '@/src/shared/ui/scratch-card/ui';
//@ts-ignore
import ScratchImage from '@/assets/images/gamescreen/skresti.png';
import { useImage } from '@shopify/react-native-skia';
import { gameSettingsStore } from '@/src/entities/game';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  EasingFunction,
  EasingFunctionFactory,
} from 'react-native-reanimated';
import { QuestionButton } from '@/src/shared/ui/question-button/ui';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

type PropsType = {
  isOpened: boolean;
  isHidden: boolean;
  setIsOpened: (value: boolean) => void;
  animationDuration: number;
  unKickedOutPlayers: Player[];
  ending: string;
  animationEasing: EasingFunction | EasingFunctionFactory;
};

const sideBarAspectRatio = 657 / 1442;
const sideBarHeight = Dimensions.get('window').height;
const sideBarWidth = sideBarHeight * sideBarAspectRatio;

const sidebarClosedAtPx = (sideBarWidth / 100 * 80);
const sidebarOpenedAtPx = 5;
const sidebarHiddenAtPx = sidebarClosedAtPx + (sideBarWidth / 100 * 20);


export function RightSidebar({
                               isOpened,
                               setIsOpened,
                               isHidden,
                               animationDuration,
                               unKickedOutPlayers,
                               ending,
                               animationEasing,
                             }: PropsType) {
  const sideBarTranslateXAnim = useSharedValue(sidebarHiddenAtPx);
  const animatedSidebarStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(sideBarTranslateXAnim.value, {
          duration: animationDuration,
          easing: animationEasing,
        }),
      },
    ],
  }));
  const scratchImage = useImage(ScratchImage);
  if (!scratchImage) return null;

  const closeSideBar = () => (sideBarTranslateXAnim.value = sidebarClosedAtPx);
  const openSideBar = () => (sideBarTranslateXAnim.value = sidebarOpenedAtPx);
  const hideSideBar = () => (sideBarTranslateXAnim.value = sidebarHiddenAtPx);

  if (isHidden) {
    hideSideBar();
  } else if (isOpened) {
    openSideBar();
  } else {
    closeSideBar();
  }

  return (
    <Animated.View style={[s.rightSideBarWrapper, animatedSidebarStyles]}>
      <View style={{ flex: 1, position: 'relative' }}>
        <ImageBackground style={{ width: '100%', height: '100%' }} resizeMode={'contain'}
                         source={require('@/assets/images/gamescreen/right_final.png')}>
          <TouchableWithoutFeedback onPress={() => setIsOpened(!isOpened)}>
            <View style={s.rightSideBarIconWrapper}>
              <Image
                style={s.rightSideBarIcon}
                resizeMode={'contain'}
                source={require('@/assets/images/gamescreen/end_icon.png')}
              />
            </View>
          </TouchableWithoutFeedback>

          <View style={s.helpButtonWrapper}>
            <QuestionButton height={'100%'} width={'100%'} onPress={() => void 0} />
          </View>
          <View style={s.rightSideBar}>
            <ScrollView style={s.leftPlayersWrapper}>
              <Text style={s.leftPlayers}>
                {unKickedOutPlayers.map((player: Player) => `${player.number} ${player.profession.name}\n`)}
              </Text>
            </ScrollView>
            <View style={s.endingWrapper}>
              <Image
                source={require('@/assets/images/gamescreen/koncovka.png')}
                resizeMode={'contain'}
                style={s.endingImage}
              />
              <ScratchCard style={s.ending} image={scratchImage}>
                <ImageBackground resizeMode={'contain'} source={require('@/assets/images/gamescreen/text_frame.png')}>
                  <View style={{ height: '100%' }}>
                    <ScrollView style={s.endingDescriptionWrapper}>
                      {gameSettingsStore.settings.lotteryTicketMode ? (
                        <View
                          style={{
                            alignItems: 'center',
                            height: 180,
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={s.scratchReward}
                            resizeMode={'contain'}
                            source={require('@/assets/images/scratch-reward.jpg')}
                          />
                          <Image
                            style={s.scratchReward}
                            resizeMode={'contain'}
                            source={require('@/assets/images/scratch-reward.jpg')}
                          />
                          <Image
                            style={s.scratchReward}
                            resizeMode={'contain'}
                            source={require('@/assets/images/scratch-reward.jpg')}
                          />
                        </View>
                      ) : (
                        <Text style={s.endingDescription}>{ending}</Text>
                      )}
                    </ScrollView>
                  </View>
                </ImageBackground>
              </ScratchCard>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Animated.View>
  );
}

const helpButtonSize = adaptiveValue(36);
const sideBarIconSize = 48;
const s = StyleSheet.create({
  endingDescription: {
    fontSize: adaptiveValue(15),
    color: '#232322',
    fontFamily: 'RobotoSlabMedium',
    lineHeight: 20,
    letterSpacing: 1.3,
    paddingHorizontal: 8,
    paddingLeft: 12,
    paddingVertical: 5,
  },
  scratchReward: {
    maxWidth: '100%',
    width: '20%',
    height: 100,
    alignSelf: 'center',
  },
  endingDescriptionWrapper: {
    marginVertical: 'auto',
  },
  endingWrapper: {
    position: 'absolute',
    bottom: '2%',
    left: '3%',
    right: '5%',
    top: '43.5%',
    padding: 20,
    paddingTop: 0,
    justifyContent: 'center',
  },
  endingImage: {
    maxWidth: '100%',
    width: '100%',
    aspectRatio: 402 / 162,
    marginBottom: 30,
  },
  ending: {
    width: '100%',
    aspectRatio: 458 / 356,
    height: 'auto',
  },
  leftPlayersWrapper: {
    position: 'absolute',
    top: '9%',
    left: '3%',
    height: sideBarHeight * 0.29,
    width: '100%',
  },
  leftPlayers: {
    height: '100%',
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'RobotoSlab',
    color: '#222327',
    fontSize: adaptiveValue(17),
    letterSpacing: 1.25,
    lineHeight: 22,
  },
  rightSideBarWrapper: {
    position: 'absolute',
    top: -20,
    right: 0,
    zIndex: 200,
    height: sideBarHeight,
    aspectRatio: sideBarAspectRatio,
  },
  rightSideBar: {
    width: '84%',
    marginLeft: 'auto',
    height: '100%',
  },
  rightSideBarIcon: {
    maxWidth: '100%',
    width: sideBarIconSize,
    height: sideBarIconSize,
  },
  rightSideBarIconWrapper: {
    position: 'absolute',
    top: '87.5%',
    left: '3.5%',
    paddingBottom: '6%',
    paddingLeft: '3%',
    paddingTop: '7%',
  },
  helpButton: {
    zIndex: 20,
  },
  helpButtonWrapper: { //TODO adaptive
    position: 'absolute',
    zIndex: 20,
    top: '81%',
    left: '7%',
    maxWidth: '100%',
    width: helpButtonSize,
    height: helpButtonSize,
  },
});
