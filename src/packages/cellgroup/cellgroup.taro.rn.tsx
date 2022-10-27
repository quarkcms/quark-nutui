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

  return (
    <View className={b(null, [classPrefix])}>
      {titleSlot || (
        <>{title ? <View className={b('title')}>{title}</View> : null}</>
      )}
      {descSlot || (
        <>{title ? <View className={b('desc')}>{desc}</View> : null}</>
      )}

      <View className={b('wrap')}>
        {Array.isArray(children)
          ? children.map((o: any, i: any) => {
              return React.cloneElement(o, {
                key: i,
                cellGroup: true,
                isLast: i + 1 == children.length,
              })
            })
          : children}
      </View>
    </View>
  )
}

CellGroup.defaultProps = defaultProps
CellGroup.displayName = 'NutCellGroup'
