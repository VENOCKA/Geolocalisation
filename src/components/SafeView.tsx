import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
  isSafe: boolean;
  style?: any;
  children: React.ReactNode;
};

export const SafeView = ({ isSafe, style, children }: Props) => {
  const insets = useSafeAreaInsets()

  if (isSafe) {
    return (
      <View style={{ paddingTop: insets.top, ...style }}>{children}</View>
    )
  }

  return <View style={style}>{children}</View>
}