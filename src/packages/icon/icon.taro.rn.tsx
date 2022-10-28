import React, { ReactElement } from 'react'
import { Image } from '@tarojs/components'
import bem from '@/utils/bem'
import ICONS from './icons.rn'
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
  color: '#666666',
  tag: 'i',
  onClick: (e: MouseEvent) => {},
  className: '',
} as IconProps

function pxCheck(value: string | number): number {
  let getValue: any = value
  if (Number.isNaN(Number(value))) {
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
  const type = isImage ? Image : ICONS[name]
  const b = bem('icon')

  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e)
    }
  }
  const hasSrc = () => {
    if (isImage) return { src: name }
    return {}
  }

  return React.createElement<any>(
    type,
    {
      className: isImage
        ? `${b('img')} ${className || ''} `
        : `${fontClassName} ${b(null)} ${classPrefix}-${name} ${
            className || ''
          }`,
      width: pxCheck(size),
      height: pxCheck(size),
      fill: color ? color : '#666666',
      style: {
        ...style,
      },
      ...rest,
      onClick: handleClick,
      ...hasSrc(),
    },
    children
  )
}

Icon.defaultProps = defaultProps
Icon.displayName = 'NutIcon'
