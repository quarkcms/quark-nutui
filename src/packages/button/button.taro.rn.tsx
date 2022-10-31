import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { View, Text } from '@tarojs/components'
import Icon from '@/packages/icon/index.taro.rn'
import { IComponent, ComponentDefaults } from '@/utils/typings'
import '@/packages/button/button.rn.scss'

export interface ButtonProps extends IComponent {
  className: string
  color: string
  shape: ButtonShape
  plain: boolean
  loading: boolean
  disabled: boolean
  style: React.CSSProperties
  type: ButtonType
  size: ButtonSize
  block: boolean
  icon: string
  children: any
  onClick: (e: MouseEvent) => void
}

export type ButtonType =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
export type ButtonSize = 'large' | 'normal' | 'small'
export type ButtonShape = 'square' | 'round'

const defaultProps = {
  ...ComponentDefaults,
  className: '',
  color: '',
  shape: 'round',
  plain: false,
  loading: false,
  disabled: false,
  type: 'default',
  size: 'normal',
  block: false,
  icon: '',
  style: {},
  children: undefined,
  onClick: (e: MouseEvent) => {},
} as ButtonProps
export const Button: FunctionComponent<Partial<ButtonProps>> = (props) => {
  const {
    color,
    shape,
    plain,
    loading,
    disabled,
    type,
    size,
    block,
    icon,
    children,
    onClick,
    className,
    style,
    iconClassPrefix,
    iconFontClassName,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const getStyle = useCallback(() => {
    const style: CSSProperties = {}
    if (color) {
      if (plain) {
        style.color = color
        style.backgroundColor = '#fff'
        if (!color?.includes('gradient')) {
          style.borderColor = color
        }
      } else {
        style.color = '#fff'
        style.backgroundColor = color
      }
    }
    return style
  }, [color, plain])
  const classes = useCallback(() => {
    const prefixCls = 'nut-button'
    return [
      prefixCls,
      `${type ? `${prefixCls}--${type}` : ''}`,
      `${size ? `${prefixCls}--${size}` : ''}`,
      `${shape ? `${prefixCls}--${shape}` : ''}`,
      `${plain ? `${prefixCls}--plain ${prefixCls}--plain--${type}` : ''}`,
      `${block ? `${prefixCls}--block` : ''}`,
      `${disabled ? `${prefixCls}--disabled` : ''}`,
      `${loading ? `${prefixCls}--loading` : ''}`,
    ]
      .filter(Boolean)
      .join(' ')
  }, [block, disabled, loading, plain, shape, size, type])
  const fontClasses = useCallback(() => {
    const prefixCls = 'nut-button__font'
    return [
      prefixCls,
      `${type ? `${prefixCls}--${type}` : ''}`,
      `${plain ? `nut-button--plain--${type}` : ''}`,
    ]
      .filter(Boolean)
      .join(' ')
  }, [type])

  const [btnName, setBtnName] = useState(classes())
  const [btnFontName, setFontName] = useState(fontClasses())
  const [btnStyle, setBtnStyle] = useState(getStyle())
  useEffect(() => {
    setBtnName(classes())
    setFontName(fontClasses())
    setBtnStyle(getStyle())
  }, [
    className,
    color,
    shape,
    plain,
    loading,
    disabled,
    style,
    type,
    size,
    block,
    icon,
    children,
    onClick,
    classes,
    getStyle,
  ])

  const handleClick = (e: any) => {
    if (!loading && !disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <View
      className={`${btnName} ${className}`}
      style={{ ...btnStyle, ...style }}
      {...rest}
      onClick={(e) => handleClick(e)}
    >
      <Text className={`nut-button__warp ${btnFontName}`} style={btnStyle}>
        {loading && (
          <Icon
            classPrefix={iconClassPrefix}
            fontClassName={iconFontClassName}
            name="loading"
            color={'#ffffff'}
          />
        )}
        {!loading && icon ? (
          <Icon
            classPrefix={iconClassPrefix}
            fontClassName={iconFontClassName}
            name={icon}
            color={'#ffffff'}
          />
        ) : (
          ''
        )}
        {children}
      </Text>
    </View>
  )
}

Button.defaultProps = defaultProps
Button.displayName = 'NutButton'
