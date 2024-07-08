// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { MaterialIcons } from "@expo/vector-icons"

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof MaterialIcons>['name']>) {
  return (
    <MaterialIcons
      {...rest}
      size={24}
      style={[{ marginBottom: -3 }, style]}
    />
  )
}
