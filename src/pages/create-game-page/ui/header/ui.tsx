import { Text, View } from 'react-native';
import { Range } from '@/src/shared/ui/range/ui';
import { gameSettingsStore } from '@/src/entities/game/model/game-settings-store';
import { observer } from 'mobx-react';
import { Image, ImageBackground } from 'expo-image';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';
import { useEffect } from 'react';

export const Header = observer(() => {
  const { playersCount } = gameSettingsStore.settings;

  useEffect(() => {
  }, []);

  return (
    <ImageBackground source={require('@/assets/images/gamecreationscreen/create-background.webp')} contentFit={'fill'}>
      <View style={s.contentHeader}>
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <View style={s.headerImageWrapper}>
            <Image style={s.headerImage} source={require('@/assets/images/gamecreationscreen/players-icon.webp')} />
            <View style={[s.playersCountWrapper, { transform: [{ translateX: playersCount > 9 ? 20 : 32 }] }]}>
              <Text style={s.playersCount}>{playersCount}</Text>
            </View>
          </View>
          <Text style={s.headerTitle}>Выберите {'\n'}количество {'\n'}даунов(4)</Text>
        </View>

        <Range
          min={4}
          max={22}
          defaultValue={4}
          onValueChanged={(playersCount: number) =>
            gameSettingsStore.setSettings(options => (options.playersCount = playersCount))
          }
        />
        <Text style={s.headerSubTitle}>Рекомендуемый IQ: 20-93</Text>
      </View>
    </ImageBackground>
  );
});

const s: any = {
  modal: {
    position: 'absolute',
    margin: 20,
    padding: 20,
    paddingRight: 30,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: adaptiveValue(20),
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: -10,
    width: 30,
    height: 30,
  },
  headerImageWrapper: {
    position: 'relative',
    marginRight: 10,
    width: 100,
    height: 100,
  },
  playersCountWrapper: {
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    backgroundColor: 'white',
  },
  playersCount: {
    position: 'absolute',
    top: 0,
    fontSize: adaptiveValue(49),
    fontFamily: 'RobotoSlab',
    fontWeight: 600,
    textAlign: 'center',
    color: '#21272e',
  },
  contentHeader: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  headerTitle: {
    fontSize: adaptiveValue(18),
    lineHeight: adaptiveValue(25),
    fontFamily: 'RobotoSlab',
    fontWeight: 600,
    letterSpacing: 1.5,
    color: '#21272e',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerSubTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 600,
    textAlign: 'center',
    color: '#6f586c',
  },
};
