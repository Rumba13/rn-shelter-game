import { Alert, Dimensions, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useModal } from '@/src/shared/lib/use-modal';

type PropsType = {
  children: React.ReactNode;
};

export function AppLayout(props: PropsType) {
  let { children } = props;

  useEffect(() => {
    setTimeout(() => {
      StatusBar.setTranslucent(true); //TODO find component that overriding the properties
      StatusBar.setBackgroundColor('#c3b5a8');
    }, 100);
  });

  return (
    <View style={s.root}>
      <ImageBackground
        source={require('../../../../assets/images/mainscreen/background.png')}
        style={s.background}
        resizeMode={'stretch'}>
        {children}
      </ImageBackground>
    </View>
  );
}

const s = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  root: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

//borderWidth:3,
//borderColor: "#000000",
