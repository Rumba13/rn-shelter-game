import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { adaptiveValue } from '@/src/shared/ui/adaptive-value/adaptive-value';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: adaptiveValue(16),
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: adaptiveValue(16),
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: adaptiveValue(32),
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: adaptiveValue(20),
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: adaptiveValue(16),
    color: '#0a7ea4',
  },
});
