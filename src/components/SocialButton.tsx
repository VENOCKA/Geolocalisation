import * as React from "react"
import {
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType,
  StyleSheet,
} from "react-native"

import { theme } from '../configs/theme';

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomImageStyleProp = StyleProp<ImageStyle> | Array<StyleProp<ImageStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export interface ISocialButtonProps {
  text: string
  style?: CustomStyleProp
  textStyle?: CustomTextStyleProp
  imageSource?: ImageSourcePropType
  textContainerStyle?: CustomStyleProp
  iconImageStyle?: CustomImageStyleProp
  onPress: () => void
}

const SocialButton: React.FC<ISocialButtonProps> = ({
  style,
  text,
  textStyle,
  iconImageStyle,
  textContainerStyle,
  imageSource,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image
        resizeMode="contain"
        source={imageSource}
        style={[styles.iconImageStyle, iconImageStyle]}
      />
      <View style={[styles.textContainer, textContainerStyle]}>
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SocialButton

interface Style {
  container: ViewStyle
  iconImageStyle: ImageStyle
  textContainer: ViewStyle
  textStyle: TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    height: 45,
    borderRadius: 8,
    width: '100%',
    paddingLeft: '20%',
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e9eef4",
  },
  iconImageStyle: {
    width: 20,
    height: 20,
  },
  textContainer: {
    marginLeft: 16,
  },
  textStyle: {
    color: theme.colors.secondary,
    fontWeight: "500",
  },
})