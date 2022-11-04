import React, { FunctionComponent } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import bem from '@/utils/bem'
import '@/packages/divider/divider.rn.scss'

export type ContentPositionType = 'left' | 'center' | 'right'
export type DirectionType = 'horizontal' | 'vertical'
export interface DividerProps {
  contentPosition: ContentPositionType
  dashed: boolean
  hairline: boolean
  styles?: React.CSSProperties
  className?: string
  direction?: DirectionType
}
const defaultProps = {
  contentPosition: 'center',
  dashed: false,
  hairline: true,
  direction: 'horizontal',
} as DividerProps
export const Divider: FunctionComponent<
  Partial<DividerProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    contentPosition,
    dashed,
    hairline,
    styles,
    className,
    direction,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const dividerBem = bem('divider')
  const classes =
    direction === 'horizontal'
      ? classNames({
          [dividerBem()]: true,
          [dividerBem('dashed')]: dashed,
          [dividerBem('hairline')]: hairline,
        })
      : classNames({
          [dividerBem()]: true,
          [dividerBem('vertical')]: direction === 'vertical',
        })
  const positionClasses =
    direction === 'horizontal'
      ? classNames({
          [dividerBem('center')]: true,
          [dividerBem('left')]: contentPosition === 'left',
          [dividerBem('right')]: contentPosition === 'right',
        })
      : classNames({
          [dividerBem()]: true,
          [dividerBem('vertical')]: direction === 'vertical',
        })
  return (
    <View className={`${classes} ${className || ''}`} style={styles}>
      {children ? (
        <Text className={`${positionClasses}`} style={styles}>
          {children}
        </Text>
      ) : null}
    </View>
  )
}

Divider.defaultProps = defaultProps
Divider.displayName = 'NutDivider'
