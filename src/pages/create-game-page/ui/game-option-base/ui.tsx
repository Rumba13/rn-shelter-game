import { Image, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { ImageButton } from '@/src/shared/ui/image-button/ui';

type PropsType = {
  children: any;
  title: string;
  descriptionHeight: number;
  description: string;
};

//TODO fix background flash when toggle collapsible
export function GameOptionBase({ title, children, description }: PropsType) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    RobotoSlabSemiBold: require('@/assets/fonts/RobotoSlab-SemiBold.ttf'),
  });

  useEffect(() => {
  }, [fontsLoaded]);


  return (
    <View style={s.gameOption}>
      <View style={{ margin: 10 }}>
        <ImageButton
          onPress={() => setIsCollapsed(!isCollapsed)}
          style={s.optionHelpButton}
          options={{
            xOffset: 2,
            yOffset: 2,
            xOffSetOnPress: 1,
            yOffsetOnPress: 1,
          }}
          buttonImage={require('@/assets/images/core/vopros_icon.png')}
          shadowImage={require('@/assets/images/gameconnectionscreen/info_icon_shadow.png')}
        />
        <View>
          <Text style={s.gameOptionTitle}>{title}</Text>

        </View>
        {children}

        <Collapsible key={String(isCollapsed)} style={{ ...s.collapsible }} duration={700}
                     collapsed={isCollapsed}>
          <View style={{ flex: 1, height: 'auto' }}>
            <Text style={s.gameOptionDescription}>{description}</Text>
          </View>
        </Collapsible>
      </View>
      <Image style={s.separator} source={require('@/assets/images/gamecreationscreen/razdelenije.png')} />
    </View>
  );
}

const helpButtonSize = 35;

const s: any = {
  gameOption: {
    position: 'relative',
  },
  collapsible: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.31)',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  optionHelpButton: {
    position: 'absolute',
    minWidth: helpButtonSize,
    height: helpButtonSize,
    zIndex: 1000,
    right: 0,
    top: 0,
  },
  gameOptionDescription: {
    height: '100%',
    width: '100%',
    letterSpacing: 1.2,
    lineHeight: 18,
  },
  gameOptionTitle: {
    fontSize: 18,
    color: '#232322',
    fontWeight: 600,
    fontFamily: 'RobotoSlabSemiBold',
    letterSpacing: 1,
    marginRight: helpButtonSize + 5,
  },
  separator: {
    maxWidth: '100%',
    height: 6,
  },
};
