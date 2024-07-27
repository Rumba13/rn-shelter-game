import { Image, ImageBackground, Text, View } from 'react-native';
import { Range } from '@/src/shared/ui/range/ui';
import { OverlayModal } from '@/src/shared/ui/overlay-modal/ui';
import { ImageButton } from '@/src/shared/ui/image-button/ui';
import { useState } from 'react';
import Slider from 'rn-range-slider';
import { gameSettingsStore } from '@/src/entities/game/model/game-settings';
import { observer } from 'mobx-react';
import { Separator } from '@/src/pages/create-game-page/ui/separator/ui';

export const Header = observer(() => {
  const { playersCount } = gameSettingsStore.settings;

  return (
    <ImageBackground source={require('@/assets/images/gamecreationscreen/create_back.png')} resizeMode={'stretch'}>
      <View style={s.contentHeader}>


        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <View style={s.headerImageWrapper}>
            <Image style={s.headerImage} source={require('@/assets/images/gamecreationscreen/igroki.png')} />
            <View style={{ ...s.playersCountWrapper, transform: [{ translateX: playersCount > 9 ? 20 : 32 }] }}>
              <Text style={s.playersCount}>{playersCount}</Text>
            </View>
          </View>
          <Text style={s.headerTitle}>
            Выберите {'\n'}количество {'\n'}даунов(4)
          </Text>
        </View>

        <View>
          <Range
            min={4}
            max={22}
            defaultValue={4}
            onValueChanged={(playersCount: number) =>
              gameSettingsStore.setSettings(options => (options.playersCount = playersCount))
            }
          />
        </View>
        <Text style={s.headerSubTitle}>Рекомендуемый IQ: 20-93</Text>
      </View>
    </ImageBackground>
  );
});

const s: any = {
  modal: {
    position: 'absolute',
    margin: 20,
    backgroundColor: 'white',
    padding: 20,
    paddingRight: 30,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  modalClose: {
    position: 'absolute',
    right: -10,
    top: 10,
    width: 30,
    height: 30,
  },
  headerImageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    marginRight: 10,
  },
  playersCountWrapper: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100,
    width: '100%',
  },
  playersCount: {
    position: 'absolute',
    fontSize: 49,
    top: 0,
    color: '#21272e',
    fontFamily: 'RobotoSlab',
    fontWeight: 600,
    textAlign: 'center',
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 25,
    color: '#21272e',
    fontFamily: 'RobotoSlab',
    fontWeight: 600,
    letterSpacing: 1.5,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerSubTitle: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    color: '#6f586c',
    fontWeight: 600,
  },
};
