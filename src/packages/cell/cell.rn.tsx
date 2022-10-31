import React, { FunctionComponent, ReactNode } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import bem from '@/utils/bem'
import Icon from '@/packages/icon/index.rn'
import '@/packages/cell/cell.rn.scss'

import { IComponent, ComponentDefaults } from '@/utils/typings'

export interface CellProps extends IComponent {
  title: ReactNode
  subTitle: ReactNode
  desc: string
  descTextAlign: string
  isLink: boolean
  icon: string
  roundRadius: string | number
  url: string
  to: string
  replace: boolean
  center: boolean
  size: string
  className: string
  iconSlot: ReactNode
  linkSlot: ReactNode
  cellGroup: boolean
  isLast: boolean
  click: (event: any) => void
  onClick: (event: any) => void
}

const defaultProps = {
  ...ComponentDefaults,
  title: null,
  subTitle: null,
  desc: '',
  descTextAlign: 'right',
  isLink: false,
  icon: '',
  roundRadius: '6px',
  url: '',
  to: '',
  replace: false,
  center: false,
  size: '',
  className: '',
  iconSlot: null,
  linkSlot: null,
  cellGroup: false,
  isLast: false,
  click: (event: any) => {},
  onClick: (event: any) => {},
} as CellProps

export const Cell: FunctionComponent<Partial<CellProps>> = (props) => {
  const {
    children,
    click,
    onClick,
    title,
    subTitle,
    desc,
    descTextAlign,
    isLink,
    icon,
    roundRadius,
    url,
    to,
    replace,
    center,
    size,
    className,
    iconSlot,
    linkSlot,
    cellGroup,
    isLast,
    iconClassPrefix,
    iconFontClassName,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const b = bem('cell')
  const handleClick = (event: any) => {
    click(event)
    onClick(event)
    if (url) {
      if (
        url.startsWith('https://') ||
        url.startsWith('http://') ||
        url.startsWith('//')
      ) {
        Taro.showToast({
          title: '暂不支持此属性',
          icon: 'error',
          duration: 2000,
        })
      } else {
        Taro.navigateTo({ url })
      }
    }
  }

  const baseStyle = {
    borderRadius: parseInt(String(roundRadius)),
  }

  const styles =
    title || subTitle || icon
      ? {}
      : {
          textAlign: descTextAlign,
          flex: 1,
        }
  return (
    <View
      className={`${b(
        {
          clickable: !!(isLink || to),
          center,
          large: size === 'large',
          cellGroup: cellGroup,
          isLast: isLast,
        },
        [className]
      )} `}
      onClick={(event) => handleClick(event)}
      style={baseStyle}
      {...rest}
    >
      {children || (
        <>
          {iconSlot ? iconSlot : null}
          {icon ? (
            <Icon
              classPrefix={iconClassPrefix}
              fontClassName={iconFontClassName}
              name={icon}
              className="icon"
            />
          ) : null}
          {title || subTitle ? (
            <View className={`${b('title')}`}>
              {title ? (
                <View className={b('maintitle', { large: size === 'large' })}>
                  {title}
                </View>
              ) : null}
              {subTitle ? (
                <View className={b('subtitle', { large: size === 'large' })}>
                  {subTitle}
                </View>
              ) : null}
            </View>
          ) : null}
          {desc ? (
            <View
              className={b('value', {
                alone: !title && !subTitle,
                large: size === 'large',
              })}
              style={styles as React.CSSProperties}
            >
              {desc}
            </View>
          ) : null}
          {!linkSlot && (isLink || to) ? (
            <Icon
              classPrefix={iconClassPrefix}
              fontClassName={iconFontClassName}
              name="right"
              className={b('link')}
            />
          ) : (
            <View className={b('linkSlot')}>{linkSlot}</View>
          )}
        </>
      )}
    </View>
  )
}

Cell.defaultProps = defaultProps
Cell.displayName = 'NutCell'
