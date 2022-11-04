import React, {
  FunctionComponent,
  useEffect,
  useState,
  CSSProperties,
  useContext,
} from 'react'
import { View } from '@tarojs/components'
import { DataContext } from '@/packages/row/UserContext'
import '@/packages/col/col.rn.scss'
import '@/packages/row/row.rn.scss'

type EventType = 'row' | 'col'
export interface ColProps {
  span: string | number
  offset: string | number
  gutter: string | number
  rowClassName: string
  onClick: (e: any, type: EventType) => void
}
const defaultProps = {
  span: '24',
  offset: '0',
  gutter: '0',
  rowClassName: '',
} as ColProps

export const Col: FunctionComponent<
  Partial<ColProps> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>
> = (props) => {
  const { span, offset, children, rowClassName, onClick } = {
    ...defaultProps,
    ...props,
  }
  const [colName, setColName] = useState('')
  const [colStyle, setColStyle] = useState({})
  const { gutter } = useContext(DataContext) as any

  const classs = () => {
    // 定义col的class类
    const prefixCls = 'nut-col'
    return `${prefixCls} ${prefixCls}-${span} ${
      gutter ? `${prefixCls}-gutter` : ''
    } ${prefixCls}-${offset}`
  }
  const getStyle = () => {
    // 定义col的style类
    const style: CSSProperties = {}
    style.paddingLeft = (gutter as number) / 2
    style.paddingRight = (gutter as number) / 2
    return style
  }
  useEffect(() => {
    setColName(classs)
    setColStyle(getStyle)
  }, [span, offset, gutter])

  console.log(`${colName} ${rowClassName}`)

  return (
    <View
      className={`${colName} ${rowClassName}`}
      style={{ ...colStyle }}
      onClick={(e) => {
        onClick && onClick(e, 'col')
      }}
    >
      {children}
    </View>
  )
}

Col.defaultProps = defaultProps
Col.displayName = 'NutCol'
