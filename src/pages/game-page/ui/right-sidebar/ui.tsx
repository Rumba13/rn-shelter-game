import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Animated,
  TouchableWithoutFeedback, ScrollView,
} from 'react-native';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { useRef } from 'react';
import { Player } from '@/src/shared/lib/types/player';

type PropsType = {
  isOpened: boolean,
  isCompletelyHidden: boolean,
  setIsOpened: (value: boolean) => void,
  animationDuration: number,
  nonKickedPlayers: Player[],
}

export function RightSidebar({
                               isOpened,
                               setIsOpened,
                               isCompletelyHidden,
                               animationDuration,
                               nonKickedPlayers,
                             }: PropsType) {
  const sideBarClosedAtPx = 294;
  const translateXAnim = useRef(new Animated.Value(sideBarClosedAtPx)).current;

  const closeSideBar = () => {
    Animated.timing(translateXAnim, {
      toValue: sideBarClosedAtPx,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };
  const openSideBar = () => {
    Animated.timing(translateXAnim, {
      toValue: 5,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };
  const hideSideBar = () => {
    Animated.timing(translateXAnim, {
      toValue: sideBarClosedAtPx + 65,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };
  hideSideBar();

  if (isCompletelyHidden) {
    hideSideBar();
  } else {
    isOpened
      ? openSideBar()
      : closeSideBar();
  }

  return (
    <Animated.View style={{ ...s.rightSideBarWrapper, transform: [{ translateX: translateXAnim }] }}>
      <View style={{ flex: 1, position: 'relative' }}>

        <ImageBackground resizeMode={'contain'} source={require('@/assets/images/gamescreen/right_final.png')}>

          <TouchableWithoutFeedback onPress={() => setIsOpened(!isOpened)}>
            <Image style={s.rightSideBarWrapperIcon} resizeMode={'contain'}
                   source={require('@/assets/images/gamescreen/end_icon.png')} />
          </TouchableWithoutFeedback>


          <View style={s.helpButtonWrapper}>
            <ImageButton style={s.helpButton} buttonImage={require('@/assets/images/core/vopros_icon.png')}
                         shadowImage={require('@/assets/images/mainscreen/info_button.png')}
                         options={{ xOffset: 3, yOffset: 2, yOffsetOnPress: 1, xOffSetOnPress: 1 }} />
          </View>
          <View style={s.rightSideBar}>
            <ScrollView style={s.leftPlayersWrapper}>
              <Text style={s.leftPlayers}>
                {/*{leftPlayersIndexes.map((playerName, index) => `${playerName}\n`)}*/}
                {nonKickedPlayers.map((player: Player, index: number) => `${player.number} ${player.profession.name}\n`)}
              </Text>
            </ScrollView>
            <View style={s.endingWrapper}>
              <Image source={require('@/assets/images/gamescreen/koncovka.png')} resizeMode={'contain'}
                     style={s.endingImage} />
              <Image resizeMode={'contain'} style={s.ending}
                     source={require('@/assets/images/gamescreen/skresti.png')} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </Animated.View>
  );
}

const leftSideBarWidth = 370;
const helpButtonSize = 36;
const sideBarIconSize = 48;
const s = StyleSheet.create({
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
    width: leftSideBarWidth,
    height: Dimensions.get('window').height,
  },
  rightSideBar: {
    width: leftSideBarWidth - 54,
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