import React, { FunctionComponent } from 'react'
import classNames from 'classnames'
import Icon from '@/packages/icon/index.rn'
import bem from '@/utils/bem'
import { View, Text } from '@tarojs/components'
import '@/packages/navbar/navbar.rn.scss'
import { IComponent, ComponentDefaults } from '@/utils/typings'

export interface NavBarProps extends IComponent {
  leftShow: boolean
  title: string
  titIcon: string
  leftText: string
  desc: string
  className: string
  fixed: boolean
  safeAreaInsetTop: boolean
  border: boolean
  placeholder: boolean
  zIndex: number | string
  style: React.CSSProperties
  onClickTitle: (e: React.MouseEvent<HTMLDivElement>) => void
  onClickIcon: (e: React.MouseEvent<HTMLDivElement>) => void
  onClickBack: (e: React.MouseEvent<HTMLElement>) => void
  onClickRight: (e: React.MouseEvent<HTMLDivElement>) => void
  children?: React.ReactNode
}

const defaultProps = {
  ...ComponentDefaults,
  title: '',
  desc: '',
  leftShow: true,
  titIcon: '',
  className: '',
  leftText: '',
  fixed: false,
  safeAreaInsetTop: false,
  border: false,
  placeholder: false,
  zIndex: 10,
  style: {},
} as NavBarProps
export const NavBar: FunctionComponent<Partial<NavBarProps>> = (props) => {
  const {
    desc,
    title,
    titIcon,
    leftShow,
    className,
    style,
    leftText,
    fixed,
    safeAreaInsetTop,
    border,
    placeholder,
    zIndex,
    onClickTitle,
    onClickIcon,
    onClickBack,
    onClickRight,
    iconClassPrefix,
    iconFontClassName,
  } = {
    ...defaultProps,
    ...props,
  }
  const b = bem('navbar')

  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]

  const slot = children.reduce((slot: any, item: React.ReactElement) => {
    const data = slot
    if (item && item.props) {
      data[item.props.slot] = item
    }
    return data
  }, {})

  const styles = () => {
    return {
      ...style,
      zIndex,
    }
  }

  console.log(`${b('text')}`)

  const renderLeft = () => {
    return (
      <View className={`${b('left')}`} onClick={(e) => onClickBack(e)}>
        {leftShow && (
          <Icon
            classPrefix={iconClassPrefix}
            fontClassName={iconFontClassName}
            name="left"
            color="#979797"
          />
        )}
        {leftText && <View className={`${b('text')}`}>{leftText}</View>}
        {slot.left}
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View className={`${b('title')}`}>
        {title && (
          <View className="title" onClick={(e) => onClickTitle(e)}>
            {title}
          </View>
        )}
        {titIcon && (
          <View onClick={(e) => onClickIcon(e)}>
            <Icon
              classPrefix={iconClassPrefix}
              fontClassName={iconFontClassName}
              name={titIcon}
            />
          </View>
        )}
        {slot.content}
      </View>
    )
  }

  const renderRight = () => {
    return (
      <View className={`${b('right')}`} onClick={(e) => onClickRight(e)}>
        {desc && <View className={`${b('text')}`}>{desc}</View>}
        {slot.right}
      </View>
    )
  }

  const renderWrapper = () => {
    return (
      <View className={cls} style={styles()}>
        {renderLeft()}
        {renderContent()}
        {renderRight()}
      </View>
    )
  }

  const classes = classNames({
    [`nut-navbar--border`]: border,
    [`nut-navbar--fixed`]: fixed,
    [`nut-navbar--safe-area-inset-top`]: safeAreaInsetTop,
  })

  const cls = classNames(b(''), classes, className)

  return (
    <>
      {fixed && placeholder ? (
        <View className={`${b('')}--placeholder`}>{renderWrapper()}</View>
      ) : (
        renderWrapper()
      )}
    </>
  )
}

NavBar.defaultProps = defaultProps
NavBar.displayName = 'NutNavBar'
