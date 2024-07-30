import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { useState } from 'react';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { Footer } from '@/src/shared/ui/footer/ui';
import { SelectPlayerSlider } from '@/src/pages/select-player-page/ui/select-player-slider/ui';
import QRCode from 'react-native-qrcode-svg';
import { gameStore } from '@/src/entities/game';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { translate } from '@shopify/react-native-skia';
import Constants from 'expo-constants';

type PropsType = {
  navigation: any;
};

const ticketHiddenAtPx = -500;
const ticketHeight = 715; // TODO add real ticket height
const ticketShowedAtPx = -20;

export function SelectPlayerPage({ navigation }: PropsType) {
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState(0);
  const [isTicketShowed, setIsTicketShowed] = useState<boolean>(false);
  const translateYAnim = useSharedValue(ticketHiddenAtPx);

  const showTicket = () => (translateYAnim.value = ticketShowedAtPx);
  const hideTicket = () => (translateYAnim.value = ticketHiddenAtPx);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateYAnim.value, {
          easing: Easing.inOut(Easing.quad),
          duration: 300,
        }),
      },
      {
        translateX: ticketWrapperWidth / 2,
      },
    ],
  }));

  return (
    <Animated.View style={s.selectPlayerPage}>
      <Animated.View style={[s.ticketWrapper, animatedStyles]}>
        <Image
          resizeMode={'cover'}
          style={s.ticket}
          source={require('@/assets/images/playerselectionscreen/ticket/ticket(gay_people).png')}
        />
        <View style={s.QRCodeWrapper}>
          <QRCode value={gameStore.createGameCode()} size={QRCodeSize} backgroundColor={'transparent'} />
        </View>
        <ImageButton
          width={100}
          style={s.ticketButton}
          buttonImage={require('@/assets/images/playerselectionscreen/ticket/arrow_ticket.png')}
          shadowImage={require('@/assets/images/playerselectionscreen/ticket/arrow_ticket(shadow).png')}
          onPress={() => {
            setIsTicketShowed(!isTicketShowed);
            isTicketShowed ? hideTicket() : showTicket();
          }}
          options={{ yOffset: -4, xOffset: -4, yOffsetOnPress: -2, xOffSetOnPress: -2 }}
        />
      </Animated.View>

      <View style={s.maxWidthWrapper}>

        <View style={{ flex: 1 }}>
          <Text style={s.selectPlayerPageTitle} adjustsFontSizeToFit>
            Выбери номер своего персонажа
          </Text>
          <View style={s.separatorWrapper}>
            <Image
              style={s.separator}
              resizeMode={'contain'}
              source={require('@/assets/images/playerselectionscreen/main/decal_vibor_igroka.png')}
            />
          </View>
          <Text style={s.selectPlayerPageSubTitle} adjustsFontSizeToFit>
            Два дауна не могут иметь один и тот же номер
          </Text>
          <SelectPlayerSlider selectedPlayerIndex={selectedPlayerIndex}
                              setSelectedPlayerIndex={setSelectedPlayerIndex} />
        </View>
      </View>

      <Footer
        styles={{ marginHorizontal: 35 }}
        onNextButtonPress={() => {
          gameStore.setCurrentPlayerNumber(selectedPlayerIndex);
          navigation.navigate('game-page');
        }}
      />
    </Animated.View>
  );
}

const maxContentWidth = 320;
const ticketWrapperWidth = maxContentWidth + 60;
const ticketButtonWidth = 100;
const QRCodeSize = 145;
const s = StyleSheet.create({
  ticketWrapper: {
    position: 'absolute',
    width: ticketWrapperWidth,
    right: '50%',
    zIndex: 3000,
    top: 0,
  },
  maxWidthWrapper: {
    marginTop: 200,
    marginHorizontal: 45,
    flex: 1,
  },
  QRCodeWrapper: {
    position: 'absolute',
    left: '50%',
    top: 0,
    transform: [{ translateX: -(QRCodeSize / 2) }, { translateY: QRCodeSize / 2 + 30 }],
  },
  ticket: {
    maxWidth: '100%',
    height: ticketHeight, //TODO remove fixed height
  },
  ticketButton: {
    position: 'absolute',
    width: ticketButtonWidth,
    height: 60,
    marginHorizontal: 'auto',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -(ticketButtonWidth / 2) }],
  },
  selectPlayerPage: {
    position: 'relative',
    flex: 1,
  },
  selectPlayerPageTitle: {
    marginBottom: 10,
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'RobotoSlab',
    letterSpacing: 1,
  },
  selectPlayerPageSubTitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#664e64',
    letterSpacing: 1.4,
    fontFamily: 'RobotoSlabSemiBold',
  },

  separatorWrapper: {},
  separator: {
    maxWidth: '100%',
    height: 26,
  },
});
