import {  ImageBackground, Text, View } from 'react-native';
import {  useState } from 'react';
import { QuestionButton } from '@/src/shared/ui/question-button/ui';
import { Collapsible } from '@/src/shared/ui/collapsible/ui';
import { Image } from 'expo-image';

type PropsType = {
  children: any;
  title: string;
  descriptionHeight: number;
  description: string;
};

//TODO fix background flash when toggle collapsible
export function GameOptionBase({ title, children, description }: PropsType) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <View style={s.gameOption}>
      <ImageBackground source={require('@/assets/images/gamecreationscreen/create_back.webp')} resizeMode={'stretch'}>
        <View style={{ margin: 10 }}>
          <QuestionButton onPress={() => setIsCollapsed(!isCollapsed)} />
          <View>
            <Text style={s.gameOptionTitle}>{title}</Text>
          </View>
          {children}

          <Collapsible isCollapsed={isCollapsed} style={{ ...s.collapsible }}>
            <View style={{ flex: 1, height: 'auto', padding: 10 }}>
              <Text style={s.gameOptionDescription}>{description}</Text>
            </View>
          </Collapsible>
        </View>
        <Image style={s.separator} source={require('@/assets/images/gamecreationscreen/razdelenije.webp')} />
      </ImageBackground>
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
    fontSize: 20,
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
