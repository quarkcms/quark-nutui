import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import Portal from 'react-native-root-portal'
import { Animated, Easing, TouchableOpacity } from 'react-native'
import classNames from 'classnames'
import bem from '@/utils/bem'
import '@/packages/overlay/overlay.rn.scss'

export interface OverlayProps {
  zIndex: number
  duration: number
  overlayClass: string
  overlayStyle: React.CSSProperties
  closeOnClickOverlay: boolean
  visible: boolean
  lockScroll: boolean
}
export const defaultOverlayProps = {
  zIndex: 2000,
  duration: 0.3,
  overlayClass: '',
  closeOnClickOverlay: true,
  visible: false,
  lockScroll: true,
  overlayStyle: {},
} as OverlayProps
export const Overlay: FunctionComponent<
  Partial<OverlayProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    children,
    zIndex,
    duration,
    overlayClass,
    closeOnClickOverlay,
    visible,
    lockScroll,
    overlayStyle,
    ...rest
  } = {
    ...defaultOverlayProps,
    ...props,
  }
  const [show, setShow] = useState(visible)
  const renderRef = useRef(true)
  const intervalRef = useRef(0)

  useEffect(() => {
    visible && setShow(visible)
  }, [visible])

  useEffect(() => {
    return () => {
      clearTimeout(intervalRef.current)
    }
  }, [])

  const b = bem('overlay')

  const classes = classNames(
    {
      'overlay-fade-leave-active': !renderRef.current && !visible,
      'overlay-fade-enter-active': visible,
      'first-render': renderRef.current && !visible,
      'hidden-render': !visible,
    },
    overlayClass,
    b('')
  )

  const styles = {
    zIndex,
    ...overlayStyle,
  }

  const handleClick = (e: any) => {
    if (closeOnClickOverlay) {
      props.onClick && props.onClick(e)
      renderRef.current = false
      const id = setTimeout(() => {
        setShow(!visible)
      }, duration * 1000 * 0.8)
      intervalRef.current = id
    }
  }

  const animatedValue = useRef(new Animated.Value(0)).current

  Animated.timing(animatedValue, {
    toValue: visible ? 1 : 0,
    duration: duration * 1000,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start()

  return (
    <Portal.Entry target={'overlay'}>
      <Animated.View
        className={classes}
        style={{
          ...styles,
          opacity: animatedValue,
          width: '100%',
          height: '100%',
        }}
      >
        <TouchableOpacity
          className={'nut-overlay-warp'}
          onPress={handleClick}
          activeOpacity={1}
          style={{
            ...styles,
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </Portal.Entry>
  )
}

Overlay.defaultProps = defaultOverlayProps
Overlay.displayName = 'NutOverlay'
