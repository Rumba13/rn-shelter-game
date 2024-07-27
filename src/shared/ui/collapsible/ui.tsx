import React, { useState } from 'react';
import { LayoutChangeEvent, View, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

type PropsType = {
  children: React.ReactNode;
  isCollapsed: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Collapsible = ({ children, isCollapsed, style }: PropsType) => {
  const [height, setHeight] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    const animatedHeight = withTiming(isCollapsed ? 0 : height, {
      easing: Easing.out(Easing.sin),
      duration: 170,
    });

    return {
      height: animatedHeight,
    };
  }, [isCollapsed, height]);

  return (
    <Animated.View style={[collapsableStyle, style, { overflow: 'hidden' }]}>
      <View onLayout={onLayout} style={{ position: 'absolute', maxWidth: '100%' }}>
        {children}
      </View>
    </Animated.View>
  );
};
