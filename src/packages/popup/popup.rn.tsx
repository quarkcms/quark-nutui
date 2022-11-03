import React, {
  FunctionComponent,
  useState,
  useEffect,
  MouseEvent,
  ReactElement,
  ReactPortal,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import classNames from 'classnames'
import { Animated, Easing } from 'react-native'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  OverlayProps,
  defaultOverlayProps,
} from '@/packages/overlay/overlay.rn'
import Icon from '@/packages/icon/index.rn'
import Overlay from '@/packages/overlay/index.rn'
import bem from '@/utils/bem'
import { ComponentDefaults, IComponent } from '@/utils/typings'
import Portal from 'react-native-root-portal'
import '@/packages/popup/popup.rn.scss'

type Teleport = HTMLElement | (() => HTMLElement) | null

export interface PopupProps extends OverlayProps, IComponent {
  position: string
  transition: string
  style: React.CSSProperties
  popClass: string
  closeable: boolean
  closeIconPosition: string
  closeIcon: string
  destroyOnClose: boolean
  teleport: Teleport
  overlay: boolean
  round: boolean
  onOpen: () => void
  onClose: () => void
  onClick: (e: MouseEvent) => void
  onOpened: (e: HTMLElement) => void
  onClosed: (e: HTMLElement) => void
  onClickOverlay: (e: MouseEvent) => void
  onClickCloseIcon: (e: MouseEvent) => void
}

const defaultProps = {
  ...ComponentDefaults,
  position: 'center',
  transition: '',
  style: {},
  popClass: '',
  closeable: false,
  closeIconPosition: 'top-right',
  closeIcon: 'close',
  destroyOnClose: true,
  teleport: null,
  overlay: true,
  round: false,
  onOpen: () => {},
  onClose: () => {},
  onClick: (e: MouseEvent) => {},
  onOpened: (e: HTMLElement) => {},
  onClosed: (e: HTMLElement) => {},
  onClickOverlay: (e: MouseEvent) => {},
  onClickCloseIcon: (e: MouseEvent) => {},
  ...defaultOverlayProps,
} as PopupProps

let _zIndex = 2000

export const Popup: FunctionComponent<
  Partial<PopupProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    visible,
    overlay,
    closeOnClickOverlay,
    overlayStyle,
    overlayClass,
    zIndex,
    lockScroll,
    duration,
    closeable,
    closeIconPosition,
    closeIcon,
    style,
    transition,
    round,
    position,
    popClass,
    className,
    destroyOnClose,
    teleport,
    onOpen,
    onClose,
    onClickOverlay,
    onClickCloseIcon,
    onOpened,
    onClosed,
    onClick,
    iconClassPrefix,
    iconFontClassName,
  } = props

  const [index, setIndex] = useState(zIndex || _zIndex)
  const [innerVisible, setInnerVisible] = useState(visible)
  const [showChildren, setShowChildren] = useState(true)
  const [transitionName, setTransitionName] = useState('')

  const b = bem('popup')
  const systemInfo = Taro.getSystemInfoSync()

  const baseStyle = {
    zIndex: index,
  }

  const overlayStyles = {
    ...overlayStyle,
    ...baseStyle,
  }

  const popStyles = {
    ...style,
    ...baseStyle,
  }

  const classes = classNames(
    {
      [`popup-${position}`]: true,
      [`popup-${position}__round`]: round,
      [`${popClass}`]: true,
      [`${className}`]: true,
    },
    b('')
  )

  const closeClasses = classNames({
    'nutui-popup__close-icon': true,
    [`nutui-popup__close-icon--${closeIconPosition}`]: true,
  })

  const open = () => {
    if (!innerVisible) {
      setInnerVisible(true)
      setIndex(++_zIndex)
    }
    if (destroyOnClose) {
      setShowChildren(true)
    }
    onOpen && onOpen()
  }

  const close = () => {
    if (innerVisible) {
      setInnerVisible(false)
      if (destroyOnClose) {
        setTimeout(() => {
          setShowChildren(false)
          onClose && onClose()
        }, Number(duration) * 1000)
      }
    }
  }

  const onHandleClickOverlay = (e: MouseEvent) => {
    if (closeOnClickOverlay) {
      onClickOverlay && onClickOverlay(e)
      close()
    }
  }

  const onHandleClick: any = (e: any) => {
    onClick && onClick(e)
  }

  const onHandleClickCloseIcon: any = (e: any) => {
    onClickCloseIcon && onClickCloseIcon(e)
    close()
  }

  const resolveContainer = (getContainer: Teleport | undefined) => {
    const container =
      typeof getContainer === 'function' ? getContainer() : getContainer
    return container || document.body
  }

  const renderToContainer = (getContainer: Teleport, node: ReactElement) => {
    if (getContainer) {
      const container = resolveContainer(getContainer)
      return createPortal(node, container) as ReactPortal
    }

    return node
  }

  const animatedValue = useRef(new Animated.Value(0)).current

  Animated.timing(animatedValue, {
    toValue: innerVisible ? 1 : 0,
    duration: duration ? duration * 1000 : 300,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start()

  const getStyles = () => {
    let styles: any = {}

    switch (position) {
      case 'top':
        styles = {
          top: 0,
          left: 0,
          width: '100%',
        }
        break
      case 'center':
        styles = {
          top:
            (systemInfo.windowHeight -
              44 -
              (systemInfo?.statusBarHeight ? systemInfo.statusBarHeight : 0)) /
              2 -
            (popStyles?.paddingTop
              ? parseInt(String(popStyles.paddingTop))
              : 0),
          left:
            (systemInfo.windowWidth - 10) / 2 -
            (popStyles?.paddingLeft
              ? parseInt(String(popStyles.paddingLeft))
              : 0),
        }
        break
      case 'bottom':
        styles = {
          bottom: 0,
          left: 0,
          width: '100%',
        }
        break
      case 'right':
        styles = {
          bottom: 0,
          right: 0,
        }
        break
      case 'left':
        styles = {
          bottom: 0,
          left: 0,
        }
        break
      default:
        styles = {
          top:
            (systemInfo.windowHeight -
              (systemInfo?.statusBarHeight ? systemInfo.statusBarHeight : 0)) /
              2 -
            (popStyles?.paddingTop
              ? parseInt(String(popStyles.paddingTop))
              : 0),
          left:
            systemInfo.windowWidth / 2 -
            (popStyles?.paddingLeft
              ? parseInt(String(popStyles.paddingLeft))
              : 0),
        }
        break
    }

    return styles
  }

  const renderPop = () => {
    return (
      <Portal.Entry target={'popup'}>
        <Animated.View
          className={classes}
          style={{
            display: innerVisible ? 'flex' : 'none',
            position: 'absolute',
            opacity: animatedValue,
            ...popStyles,
            ...getStyles(),
          }}
          onClick={onHandleClick}
        >
          {showChildren ? <View>{children}</View> : ''}
          {closeable ? (
            <View className={closeClasses} onClick={onHandleClickCloseIcon}>
              <Icon
                classPrefix={iconClassPrefix}
                fontClassName={iconFontClassName}
                name={closeIcon}
                size="18px"
              />
            </View>
          ) : null}
        </Animated.View>
      </Portal.Entry>
    )
  }

  const renderNode = () => {
    return (
      <>
        {overlay ? (
          <>
            <Overlay
              style={overlayStyles}
              overlayClass={overlayClass}
              visible={innerVisible}
              closeOnClickOverlay={closeOnClickOverlay}
              zIndex={zIndex}
              lockScroll={lockScroll}
              duration={duration}
              onClick={onHandleClickOverlay}
            />
            {renderPop()}
          </>
        ) : (
          <>{renderPop()}</>
        )}
      </>
    )
  }

  useEffect(() => {
    visible && open()
    !visible && close()
  }, [visible])

  useEffect(() => {
    setTransitionName(transition || `popup-slide-${position}`)
  }, [position])

  return <>{renderToContainer(teleport as Teleport, renderNode())}</>
}

Popup.defaultProps = defaultProps
Popup.displayName = 'NutPopup'
