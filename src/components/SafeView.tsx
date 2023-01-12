import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const SafeView = ({ isSafe, style, children }: any) => {
  const insets = useSafeAreaInsets()

  if (isSafe) {
    return (
      <View style={{ paddingTop: insets.top, ...style }}>{children}</View>
    )
  }

  return <View style={StyleSheet.flatten(style)}>{children}</View>
}