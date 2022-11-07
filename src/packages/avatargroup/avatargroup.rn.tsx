import React, { FunctionComponent, useRef } from 'react'
import classNames from 'classnames'
import { AvatarContext } from './AvatarContext'
import { View } from '@tarojs/components'
import bem from '@/utils/bem'
import { useConfig } from '@/packages/configprovider'

import '@/packages/avatargroup/avatargroup.rn.scss'

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

  const b = bem('avatar-group')
  const cls = classNames(b(''), className)

  const parentAvatar = {
    propAvatarGroup,
    avatarGroupRef,
  }
  return (
    <AvatarContext.Provider value={parentAvatar}>
      <View className={cls} style={style} ref={avatarGroupRef}>
        {children}
      </View>
    </AvatarContext.Provider>
  )
}

AvatarGroup.defaultProps = defaultProps
AvatarGroup.displayName = 'NutAvatarGroup'
