import React, { FunctionComponent } from 'react'
import { View } from '@tarojs/components'
import { DataContext } from './UserContext'
import '@/packages/row/row.rn.scss'

type EventType = 'row' | 'col'
export interface RowProps {
  type: string
  justify: string
  align: string
  wrap: string
  gutter: string | number
  onClick: (e: any, type: EventType) => void
}
const defaultProps = {
  type: '',
  justify: 'start',
  align: 'flex-start',
  wrap: 'nowrap',
  gutter: '0',
} as RowProps
export const Row: FunctionComponent<
  Partial<RowProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>
> = (props) => {
  const { children, type, justify, align, wrap, gutter, onClick } = {
    ...defaultProps,
    ...props,
  }
  const prefixCls = 'nut-row'
  const getClass = (prefix: string, type: string) => {
    const classType = type ? `nut-row-${prefix}-${type}` : ''
    const className = prefix ? classType : `nut-row-${type}`
    return className
  }
  const getClasses = () => {
    return `${getClass('', type)} ${getClass('justify', justify)} ${getClass(
      'align',
      align
    )} ${getClass('flex', wrap)} ${prefixCls}`
  }
  const getParentClasses = () => {
    return `${getClass('', type)} ${getClass('justify', justify)} ${getClass(
      'align',
      align
    )} ${getClass('flex', wrap)}`
  }

  const parentRow = {
    gutter,
  }

  let cloneChildren: any = children
  if (
    Array.isArray(cloneChildren) ||
    Object.prototype.toString.call(cloneChildren) === '[object Object]'
  ) {
    if (Array.isArray(cloneChildren)) {
      cloneChildren = cloneChildren.map((o: any, i: any) => {
        return React.cloneElement(o, {
          key: i,
          rowClassName: getParentClasses(),
        })
      })
    } else {
      cloneChildren = React.cloneElement(cloneChildren, {
        rowClassName: getParentClasses(),
      })
    }
  }

  return (
    <DataContext.Provider value={parentRow}>
      <View
        className={getClasses()}
        onClick={(e: any) => {
          onClick && onClick(e, 'row')
        }}
      >
        {cloneChildren}
      </View>
    </DataContext.Provider>
  )
}

Row.defaultProps = defaultProps
Row.displayName = 'NutRow'
