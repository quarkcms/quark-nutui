import React, { FunctionComponent, ReactNode } from 'react'
import { View } from '@tarojs/components'
import '@/packages/cellgroup/cellgroup.rn.scss'

import bem from '@/utils/bem'

export interface CellGroupProps {
  title: ReactNode
  desc: ReactNode
  titleSlot: ReactNode
  descSlot: ReactNode
  classPrefix: string
  children?: ReactNode
}
const defaultProps = {
  title: '',
  desc: '',
  titleSlot: null,
  descSlot: null,
  classPrefix: 'nutui-cell-group',
} as CellGroupProps
export const CellGroup: FunctionComponent<Partial<CellGroupProps>> = (
  props
) => {
  const { children, classPrefix, title, desc, titleSlot, descSlot } = {
    ...defaultProps,
    ...props,
  }
  const b = bem('cell-group')

  let cloneChildren: any = children
  if (
    Array.isArray(cloneChildren) ||
    Object.prototype.toString.call(cloneChildren) === '[object Object]'
  ) {
    if (Array.isArray(cloneChildren)) {
      cloneChildren = cloneChildren.map((o: any, i: any) => {
        return React.cloneElement(o, {
          key: i,
          cellGroup: true,
          isLast: i + 1 == cloneChildren.length,
        })
      })
    } else {
      cloneChildren = React.cloneElement(cloneChildren, {
        cellGroup: true,
        isLast: true,
      })
    }
  }

  return (
    <View className={b(null, [classPrefix])}>
      {titleSlot || (
        <>{title ? <View className={b('title')}>{title}</View> : null}</>
      )}
      {descSlot || (
        <>{desc ? <View className={b('desc')}>{desc}</View> : null}</>
      )}

      <View className={b('wrap')}>{cloneChildren}</View>
    </View>
  )
}

CellGroup.defaultProps = defaultProps
CellGroup.displayName = 'NutCellGroup'
