import React, { ReactElement } from 'react'
import { View, Image } from '@tarojs/components'
import bem from '@/utils/bem'
import { Iconfont } from '@/styles/font/iconfont'
import { Svg } from 'react-native-svg'
import { Animated, Easing } from 'react-native'
import '@/packages/icon/icon.rn.scss'

export interface IconProps {
  name: string
  size: string | number
  classPrefix: string
  color: string
  tag: any
  onClick: (e: MouseEvent) => void
  fontClassName: string
  className: string
  style: React.CSSProperties
  children: React.ReactNode
}

const defaultProps = {
  name: '',
  size: '',
  classPrefix: 'nut-icon',
  fontClassName: 'nutui-iconfont',
  color: '#979797',
  tag: 'i',
  onClick: (e: MouseEvent) => {},
  className: '',
} as IconProps

function pxCheck(value: string | number): number {
  let getValue: any = value
  if (Number.isNaN(Number(value)) || typeof value === 'string') {
    getValue = parseInt(String(value))
  }
  if (!getValue || getValue == '') {
    getValue = 20
  }

  return getValue
}

export function Icon<T>(props: Partial<IconProps> & T): ReactElement {
  const {
    name,
    size,
    classPrefix,
    color,
    tag,
    children,
    className,
    fontClassName,
    style,
    onClick,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const isImage = name ? name.indexOf('/') !== -1 : false
  const b = bem('icon')
  let deg = new Animated.Value(0)

  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e)
    }
  }

  // 旋转动画
  if (
    className.indexOf('nut-icon-am-rotate') != -1 ||
    name == 'loading' ||
    name == 'loading1'
  ) {
    Animated.loop(
      Animated.timing(deg, {
        toValue: 360,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }

  if (isImage) {
    return (
      <Image
        className={
          isImage
            ? `${b('img')} ${className || ''} `
            : `${fontClassName} ${b(null)} ${classPrefix}-${name} ${
                className || ''
              }`
        }
        style={{
          color,
          fontSize: pxCheck(size),
          width: pxCheck(size),
          height: pxCheck(size),
          ...style,
        }}
        onClick={handleClick}
        src={name}
      >
        {children}
      </Image>
    )
  }

  return (
    <Animated.View
      className={
        isImage
          ? `${b('img')} ${className || ''} `
          : `${fontClassName} ${b(null)} ${classPrefix}-${name} ${
              className || ''
            }`
      }
      style={[
        {
          transform: [
            {
              rotate: deg.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
          width: pxCheck(size),
          height: pxCheck(size),
        },
        style,
      ]}
      onClick={handleClick}
    >
      <Svg
        width={pxCheck(size)}
        height={pxCheck(size)}
        viewBox="0 0 1024 1024"
        fill={color}
      >
        <Iconfont name={`#${classPrefix}-${name}`} color={color} />
      </Svg>
    </Animated.View>
  )
}

Icon.defaultProps = defaultProps
Icon.displayName = 'NutIcon'
