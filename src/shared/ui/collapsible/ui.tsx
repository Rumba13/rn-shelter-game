import React, { useState } from 'react';
import { LayoutChangeEvent, View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

type PropsType = {
  children: React.ReactNode;
  isCollapsed: boolean;
  style?: StyleProp<ViewStyle>;
};

const animationDuration = 170;

export const Collapsible = ({ children, isCollapsed, style: collapsibleStyle }: PropsType) => {
  const [contentHeight, setContentHeight] = useState(0);

  const _setContentHeight = (event: LayoutChangeEvent) => {
    const newContentHeight = event.nativeEvent.layout.height;

    if (newContentHeight > 0 && newContentHeight !== contentHeight) {
      setContentHeight(newContentHeight);
    }
  };

  const collapsibleAnimatedStyle = useAnimatedStyle(() => {
    const animatedHeight = withTiming(isCollapsed ? 0 : contentHeight, {
      easing: Easing.out(Easing.sin),
      duration: animationDuration,
    });

    return {
      height: animatedHeight,
    };
  }, [isCollapsed]);

  return (
    <Animated.View style={[s.collapsible, collapsibleStyle, collapsibleAnimatedStyle]}>
      <View style={s.collapsibleContent} onLayout={_setContentHeight}>{children}</View>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  collapsible: {
    overflow: 'hidden',
  },
  collapsibleContent: {
    position: 'absolute',
    maxWidth: '100%',
  },
});
