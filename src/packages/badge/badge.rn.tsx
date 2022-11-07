import React, { CSSProperties, FunctionComponent, ReactNode } from 'react'

import Icon from '@/packages/icon/index.rn'
import { View, Text } from '@tarojs/components'
import '@/packages/badge/badge.rn.scss'

import { IComponent, ComponentDefaults } from '@/utils/typings'

export interface BadgeProps extends IComponent {
  value: any
  dot: boolean
  max: number
  top: string
  right: string
  zIndex: string
  color: string
  icons: any
  children?: ReactNode
}

export type BadgeType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

const defaultProps = {
  ...ComponentDefaults,
  value: '',
  dot: false,
  max: 10000,
  top: '0',
  right: '0',
  zIndex: '0',
  color: '',
  icons: '',
} as BadgeProps
export const Badge: FunctionComponent<Partial<BadgeProps>> = (props) => {
  const {
    children,
    dot,
    top,
    right,
    zIndex,
    color,
    icons,
    iconClassPrefix,
    iconFontClassName,
  } = {
    ...defaultProps,
    ...props,
  }
  function content() {
    if (dot) return undefined
    const { value } = props
    const { max } = props
    if (typeof value === 'number' && typeof max === 'number') {
      return max < value ? `${max}+` : value
    }
    return value
  }
  const getStyle = () => {
    const style: CSSProperties = {}
    style.top = Number(top) || parseFloat(top) || 0
    style.right = Number(right) || parseFloat(right) || 0
    style.zIndex = Number(zIndex) || parseFloat(zIndex) || 0
    if (color) {
      style.backgroundColor = color
    }

    const getContent = content() // todo:精度有待处理
    if (getContent) {
      let translate: any = [
        { translateY: -12 },
        { translateX: 10 * getContent.length + 10 },
      ]
      style.transform = translate
    } else {
      let translate: any = [{ translateY: -5 }, { translateX: 8 }]
      style.transform = translate
    }
    return style
  }

  return (
    <View className="nut-badge">
      {icons !== '' && (
        <View className="slot-icons">
          <Icon
            classPrefix={iconClassPrefix}
            fontClassName={iconFontClassName}
            className="_icon"
            name={icons}
            color="#ffffff"
            size="12"
          />
        </View>
      )}
      <View>{children}</View>
      <View
        className={`nut-badge__content sup ${dot ? 'is-dot' : ''}`}
        style={getStyle()}
      >
        {content()}
      </View>
    </View>
  )
}

Badge.defaultProps = defaultProps
Badge.displayName = 'NutBadge'
