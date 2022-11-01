import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
  TouchableOpacity,
} from 'react-native'
import { View, Text } from '@tarojs/components'
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
    lock()
  }, [visible])

  useEffect(() => {
    return () => {
      clearTimeout(intervalRef.current)
      // document.body.classList.remove('nut-overflow-hidden')
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
    animationDuration: `${props.duration}s`,
    ...overlayStyle,
  }

  const lock = () => {
    // if (lockScroll && visible) {
    //   document.body.classList.add('nut-overflow-hidden')
    // } else {
    //   document.body.classList.remove('nut-overflow-hidden')
    // }
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

  return (
    <Animated.View
      className={classes}
      style={{
        ...styles,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
    >
      <TouchableOpacity
        className={'nut-overlay-warp'}
        onPress={handleClick}
        style={{
          ...styles,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  )
}

Overlay.defaultProps = defaultOverlayProps
Overlay.displayName = 'NutOverlay'
