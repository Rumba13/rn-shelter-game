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
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

type PropsType = {
  isOpened: boolean;
  isHidden: boolean;
  setIsOpened: (value: boolean) => void;
  animationDuration: number;
  unKickedOutPlayers: Player[];
  ending: string;
};

const sidebarClosedAtPx = 294;
const sidebarOpenedAtPx = 5;
const sidebarHiddenAtPx = sidebarClosedAtPx + 65;

export function RightSidebar({
  isOpened,
  setIsOpened,
  isHidden,
  animationDuration,
  unKickedOutPlayers,
  ending,
}: PropsType) {
  const sideBarTranslateXAnim = useSharedValue(sidebarHiddenAtPx);
  const animatedSidebarStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(sideBarTranslateXAnim.value, {
          duration: animationDuration,
          easing: Easing.linear,
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
        <ImageBackground resizeMode={'contain'} source={require('@/assets/images/gamescreen/right_final.png')}>
          <TouchableWithoutFeedback onPress={() => setIsOpened(!isOpened)}>
            <Image
              style={s.rightSideBarWrapperIcon}
              resizeMode={'contain'}
              source={require('@/assets/images/gamescreen/end_icon.png')}
            />
          </TouchableWithoutFeedback>

          <View style={s.helpButtonWrapper}>
            <ImageButton
              style={s.helpButton}
              buttonImage={require('@/assets/images/core/vopros_icon.png')}
              shadowImage={require('@/assets/images/mainscreen/info_button.png')}
              options={{ xOffset: 3, yOffset: 2, yOffsetOnPress: 1, xOffSetOnPress: 1 }}
            />
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

const sideBarWidth = 370;
const helpButtonSize = 36;
const sideBarIconSize = 48;
const s = StyleSheet.create({
  endingDescription: {
    fontSize: 15,
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
    bottom: 17,
    left: 19,
    right: 22,
    height: 427,
    padding: 20,
    justifyContent: 'center',
  },
  endingImage: {
    maxWidth: '100%',
    height: 95,
    marginBottom: 30,
  },
  ending: {
    height: 180,
    maxWidth: '100%',
  },
  leftPlayersWrapper: {
    position: 'absolute',
    top: 64,
    right: 5,
    left: 10,
    height: 223,
    marginTop: 10,
  },
  leftPlayers: {
    height: '100%',
    flex: 1,
    paddingLeft: 10,
    fontFamily: 'RobotoSlab',
    color: '#222327',
    fontSize: 17,
    letterSpacing: 1.25,
    lineHeight: 22,
  },
  rightSideBarWrapper: {
    position: 'absolute',
    top: -20,
    right: 0,
    zIndex: 200,
    width: sideBarWidth,
    height: Dimensions.get('window').height,
  },
  rightSideBar: {
    width: sideBarWidth - 54,
    marginLeft: 'auto',
    height: '100%',
  },
  rightSideBarWrapperIcon: {
    position: 'absolute',
    bottom: 24,
    left: 29,
    maxWidth: '100%',
    width: sideBarIconSize,
    height: sideBarIconSize,
  },
  helpButton: {
    zIndex: 20,
    maxWidth: '100%',
    width: helpButtonSize,
    height: helpButtonSize,
  },
  helpButtonWrapper: {
    position: 'absolute',
    zIndex: 20,
    bottom: 113,
    left: 30,
    maxWidth: '100%',
    width: helpButtonSize,
    height: helpButtonSize,
  },
});
