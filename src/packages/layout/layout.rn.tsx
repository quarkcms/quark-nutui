import React, { FunctionComponent } from 'react'
import { View } from '@tarojs/components'

export interface LayoutProps {}
const defaultProps = {} as LayoutProps
export const Layout: FunctionComponent<
  Partial<LayoutProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { children } = { ...defaultProps, ...props }
  return <View className="nut-layout">Layout</View>
}

Layout.defaultProps = defaultProps
Layout.displayName = 'NutLayout'
