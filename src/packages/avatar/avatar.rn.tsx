import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  useContext,
} from 'react'
import classNames from 'classnames'
import { AvatarContext } from '@/packages/avatargroup/AvatarContext'
import bem from '@/utils/bem'
import Icon from '@/packages/icon/index.rn'
import { View, Text, Image } from '@tarojs/components'
import '@/packages/avatar/avatar.rn.scss'
import { IComponent, ComponentDefaults } from '@/utils/typings'

export interface AvatarProps extends IComponent {
  size: string
  icon: string
  shape: AvatarShape
  bgColor: string
  color: string
  prefixCls: string
  url: string
  className: string
  alt: string
  dataIndex: number
  style: React.CSSProperties
  activeAvatar: (e: MouseEvent) => void
  onActiveAvatar: (e: MouseEvent) => void
  onError: (e: any) => void
}

export type AvatarShape = 'round' | 'square'

const defaultProps = {
  ...ComponentDefaults,
  size: '',
  icon: '',
  bgColor: '#eee',
  color: '#666',
  prefixCls: 'nut-avatar',
  url: '',
  alt: '',
  dataIndex: 0,
} as AvatarProps
export const Avatar: FunctionComponent<
  Partial<AvatarProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    prefixCls,
    size,
    shape,
    bgColor,
    color,
    url,
    alt,
    dataIndex,
    icon,
    className,
    style,
    activeAvatar,
    onActiveAvatar,
    onError,
    iconClassPrefix,
    iconFontClassName,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }

  const [maxSum, setMaxSum] = useState(0) // avatarGroup里的avatar的个数
  const [showMax, setShowMax] = useState(false) // 是否显示的最大头像个数
  const [avatarIndex, setAvatarIndex] = useState(1) // avatar的索引
  const avatarRef = useRef<any>(null)
  const parent: any = useContext(AvatarContext)

  const b = bem('avatar')
  const classes = classNames({
    [`nut-avatar-${size || parent?.propAvatarGroup?.size || 'normal'}`]: true,
    [`nut-avatar-${shape || parent?.propAvatarGroup?.shape || 'round'}`]: true,
  })
  const cls = classNames(b(''), classes, className)
  const sizeValue = ['large', 'normal', 'small']
  const pxCheck = (value: string | number): number => {
    let getValue: any = value
    if (Number.isNaN(Number(value)) || typeof value === 'string') {
      getValue = parseInt(String(value))
    }
    if (!getValue || getValue == '') {
      getValue = 'auto'
    }
    return getValue
  }
  let styles: React.CSSProperties = {
    backgroundColor: `${bgColor}`,
    color: `${color}`,
    zIndex:
      parent?.propAvatarGroup?.zIndex === 'right'
        ? Math.abs(maxSum - avatarIndex)
        : 0,
    ...style,
  }

  if (avatarIndex !== 1 && parent?.propAvatarGroup?.span) {
    styles['marginLeft'] =
      avatarIndex !== 1 && parent?.propAvatarGroup?.span
        ? parseInt(parent?.propAvatarGroup?.span)
        : 'auto'
  }

  if (size != '' && size) {
    styles['width'] = sizeValue.indexOf(size) > -1 ? 'auto' : pxCheck(size)
    styles['height'] = sizeValue.indexOf(size) > -1 ? 'auto' : pxCheck(size)
  }

  const maxStyles: React.CSSProperties = {
    backgroundColor: `${parent?.propAvatarGroup?.maxBgColor}`,
    color: `${parent?.propAvatarGroup?.maxColor}`,
  }

  const iconStyles = icon || ''

  useEffect(() => {
    const avatarChildren = parent?.propAvatarGroup?.children
    if (avatarChildren) {
      parent?.updateChildren?.()
      avatarLength(avatarChildren)
    }
  }, [])

  const avatarLength = (children: any) => {
    const maxCount = parent?.propAvatarGroup?.maxCount

    setMaxSum(children.length)
    setAvatarIndex(dataIndex)
    if (
      dataIndex === children.length &&
      dataIndex !== maxCount &&
      children.length > maxCount
    ) {
      setShowMax(true)
    }
  }

  const errorEvent = (e: any) => {
    if (props.onError) {
      props.onError(e)
    }
  }

  const clickAvatar: any = (e: any) => {
    activeAvatar && activeAvatar(e)
    onActiveAvatar && onActiveAvatar(e)
  }

  return (
    <>
      {(showMax ||
        !parent?.propAvatarGroup?.maxCount ||
        avatarIndex <= parent?.propAvatarGroup?.maxCount) && (
        <View
          className={`${cls} ${
            parent?.propAvatarGroup ? 'nut-avatar-group-item' : ''
          }`}
          style={!showMax ? styles : maxStyles}
          onClick={clickAvatar}
          ref={avatarRef}
        >
          {(!parent?.propAvatarGroup?.maxCount ||
            avatarIndex <= parent?.propAvatarGroup?.maxCount) && (
            <>
              {url && <Image className={cls} src={url} onError={errorEvent} />}
              {icon && (
                <Icon
                  className={cls}
                  classPrefix={iconClassPrefix}
                  fontClassName={iconFontClassName}
                  color={!showMax ? styles?.color : maxStyles?.color}
                  name={iconStyles}
                />
              )}
              {children && (
                <Text
                  className="text"
                  style={{ color: !showMax ? styles?.color : maxStyles?.color }}
                >
                  {children}
                </Text>
              )}
            </>
          )}
          {showMax && parent?.propAvatarGroup?.maxCount ? (
            <View
              className="text"
              style={{ color: !showMax ? styles?.color : maxStyles?.color }}
            >
              {parent?.propAvatarGroup?.maxContent
                ? parent?.propAvatarGroup?.maxContent
                : `+ ${avatarIndex - parent?.propAvatarGroup?.maxCount}`}
            </View>
          ) : null}
        </View>
      )}
    </>
  )
}

Avatar.defaultProps = defaultProps
Avatar.displayName = 'NutAvatar'
