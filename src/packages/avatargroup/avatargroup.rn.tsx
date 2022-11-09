import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import { AvatarContext } from './AvatarContext'
import { View, Text } from '@tarojs/components'
// import { Text, View, TextInput, ScrollView, SafeAreaView } from 'react-native';
import bem from '@/utils/bem'
import { useConfig } from '@/packages/configprovider'

import '@/packages/avatargroup/avatargroup.rn.scss'
import { update } from '@react-spring/web'

export interface AvatarGroupProps {
  maxContent: string
  maxCount: string | number
  maxBgColor: string
  maxColor: string
  size: string
  shape: string
  span: string
  zIndex: string
  className: string
  style: React.CSSProperties
}
const defaultProps = {
  maxContent: '',
  maxCount: '',
  maxBgColor: '#eee',
  maxColor: '#666',
  size: '',
  shape: '',
  span: '-8',
  zIndex: 'left',
} as AvatarGroupProps
export const AvatarGroup: FunctionComponent<
  Partial<AvatarGroupProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { locale } = useConfig()
  const propAvatarGroup = { ...defaultProps, ...props }
  const { className, style, children } = propAvatarGroup

  const avatarGroupRef = useRef(null)
  const [cloneChildren, setChildren] = useState(children)

  const b = bem('avatar-group')
  const cls = classNames(b(''), className)

  const updateChildren: any = () => {
    if (Array.isArray(cloneChildren)) {
      let getChildren = cloneChildren.map((o: any, i: any) => {
        return React.cloneElement(o, {
          key: i,
          dataIndex: i + 1,
        })
      })
      setChildren(getChildren)
    }
  }

  const parentAvatar = {
    propAvatarGroup,
    avatarGroupRef,
    updateChildren,
  }
  return (
    <AvatarContext.Provider value={parentAvatar}>
      <View className={cls} style={style} ref={avatarGroupRef}>
        {cloneChildren}
      </View>
    </AvatarContext.Provider>
  )
}

AvatarGroup.defaultProps = defaultProps
AvatarGroup.displayName = 'NutAvatarGroup'
