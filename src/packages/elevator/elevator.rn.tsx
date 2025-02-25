import React, {
  FunctionComponent,
  useRef,
  useEffect,
  useState,
  createContext,
} from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import '@/packages/elevator/elevator.rn.scss'
import bem from '@/utils/bem'

export const elevatorContext = createContext({} as ElevatorData)

export interface ElevatorProps {
  height: number | string
  acceptKey: string
  indexList: any[]
  isSticky: boolean
  spaceHeight: number
  titleHeight: number
  className: string
  style: React.CSSProperties
  children: React.ReactNode
  onClickItem: (key: string, item: ElevatorData) => void
  onClickIndex: (key: string) => void
}
const defaultProps = {
  height: '200px',
  acceptKey: 'title',
  indexList: [] as any[],
  isSticky: false,
  spaceHeight: 23,
  titleHeight: 35,
  className: 'weapp-elevator',
} as ElevatorProps
interface ElevatorData {
  name: string
  id: number | string
  [key: string]: string | number
}
export const Elevator: FunctionComponent<
  Partial<ElevatorProps> & React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const {
    height,
    acceptKey,
    indexList,
    isSticky,
    spaceHeight,
    titleHeight,
    className,
    onClickItem,
    onClickIndex,
    children,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  }
  const b = bem('elevator')
  const listview = useRef<HTMLDivElement>(null)
  const initData = {
    anchorIndex: 0,
    listHeight: [] as number[],
    listGroup: [] as any[],
    scrollY: 0,
    diff: -1,
    fixedTop: 0,
  }
  const touchState = useRef({
    y1: 0,
    y2: 0,
  })
  const [scrollY, setScrollY] = useState(0)
  const [currentData, setCurrentData] = useState<ElevatorData>(
    {} as ElevatorData
  )
  const [currentKey, setCurrentKey] = useState('')
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [codeIndex, setCodeIndex] = useState<number>(0)
  const [scrollStart, setScrollStart] = useState<boolean>(false)
  const state = useRef(initData)
  const [scrollTop, setScrollTop] = useState(0)
  const pxCheck = (value: string | number): number => {
    let getValue: any = value
    if (Number.isNaN(Number(value)) || typeof value === 'string') {
      getValue = parseInt(String(value))
    }
    if (!getValue || getValue == '') {
      getValue = 200
    }

    return getValue
  }

  // 重置滚动参数
  const resetScrollState = () => {
    setScrollStart(false)
  }

  const clientHeight = () => {
    return listview.current ? listview.current.clientHeight : 0
  }

  const getData = (el: HTMLElement): string | void => {
    if (!el.dataset.index) {
      return '0'
    }
    return el.dataset.index as string
  }

  const calculateHeight = () => {
    let height = 0

    state.current.listHeight.push(height)
    for (let i = 0; i < state.current.listGroup.length; i++) {
      // const query = Taro.createSelectorQuery()
      // query
      //   .selectAll(`.${className} .elevator__item__${i}`)
      //   .boundingClientRect()
      // // eslint-disable-next-line no-loop-func
      // query.exec((res: any) => {
      //   height += res[0].height
      //   state.current.listHeight.push(height)
      // })
    }
  }

  const scrollTo = (index: number) => {
    if (!index && index !== 0) {
      return
    }

    if (!state.current.listHeight.length) {
      calculateHeight()
    }
    let cacheIndex = index
    if (index < 0) {
      cacheIndex = 0
    }

    if (index > state.current.listHeight.length - 2) {
      cacheIndex = state.current.listHeight.length - 2
    }

    setCodeIndex(cacheIndex)
    setScrollTop(state.current.listHeight[cacheIndex])
  }

  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const firstTouch = e.touches[0]
    touchState.current.y2 = firstTouch.pageY
    const delta =
      (touchState.current.y2 - touchState.current.y1) / spaceHeight || 0
    const cacheIndex = state.current.anchorIndex + Math.floor(delta)

    setCodeIndex(cacheIndex)
    scrollTo(cacheIndex)
  }

  const touchEnd = () => {
    resetScrollState()
  }

  const touchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setScrollStart(true)
    const index = Number(getData(e.target as HTMLElement))

    const firstTouch = e.touches[0]
    touchState.current.y1 = firstTouch.pageY
    state.current.anchorIndex = +index
    setCodeIndex((codeIndex) => {
      // console.log(codeIndex + index, 'touchStart')
      return codeIndex + index
    })

    scrollTo(index)
  }

  const handleClickItem = (key: string, item: ElevatorData) => {
    onClickItem && onClickItem(key, item)
    setCurrentData(item)
    setCurrentKey(key)
  }

  const handleClickIndex = (key: string) => {
    onClickIndex && onClickIndex(key)
  }

  const setListGroup = () => {
    // console.log(Taro.createSelectorQuery().selectAll(`.${className}`))
    // if (listview.current) {
    //   Taro.createSelectorQuery()
    //     .selectAll(`.${className} .nut-elevator__list__item`)
    //     .node((el) => {
    //       console.log(el, 'el')
    //       state.current.listGroup = [...Object.keys(el)]
    //       calculateHeight()
    //     })
    //     .exec()
    // }
  }

  const listViewScroll = (e: any) => {
    const { listHeight } = state.current
    if (!listHeight.length) {
      calculateHeight()
    }
    const target = e.target as Element
    const { scrollTop } = target
    state.current.scrollY = Math.floor(scrollTop)
    setScrollY(scrollTop)
    for (let i = 0; i < listHeight.length - 1; i++) {
      const height1 = listHeight[i]
      const height2 = listHeight[i + 1]
      if (state.current.scrollY >= height1 && state.current.scrollY < height2) {
        setCurrentIndex(i)
        state.current.diff = height2 - state.current.scrollY
        return
      }
    }

    setCurrentIndex(listHeight.length - 2)
  }

  useEffect(() => {
    if (listview.current) {
      setListGroup()
    }
  }, [listview])

  useEffect(() => {
    const { listHeight, diff, scrollY } = state.current
    let fixedTop = diff > 0 && diff < titleHeight ? diff - titleHeight : 0
    if (scrollY + clientHeight() === listHeight[listHeight.length - 1]) {
      if (fixedTop !== 0) {
        fixedTop = 0
      }
    }
    if (state.current.fixedTop === fixedTop) return
    state.current.fixedTop = fixedTop
  }, [state.current.diff, titleHeight])
  console.log(currentIndex, 'currentIndex')
  return (
    <View className={`${b()} ${className} `}>
      {isSticky && scrollY > 0 ? (
        <View className={b('list__fixed')}>
          <View className="fixed-title">
            {indexList[currentIndex][acceptKey]}
          </View>
        </View>
      ) : null}
      <View className={b('list')} style={{ height: pxCheck(height) }}>
        <View className={b('list__inner')} ref={listview}>
          {indexList.map((item: any, idx: number) => {
            return (
              <View className={b('list__item')} key={idx}>
                <View className={b('list__item__code')}>{item[acceptKey]}</View>
                <>
                  {item.list.map((subitem: ElevatorData) => {
                    return (
                      <View
                        className={b('list__item__name', {
                          highcolor:
                            currentData.id === subitem.id &&
                            currentKey === item[acceptKey],
                        })}
                        key={subitem.id}
                        onClick={() =>
                          handleClickItem(item[acceptKey], subitem)
                        }
                      >
                        {children ? (
                          <>
                            <elevatorContext.Provider value={subitem}>
                              {children}
                            </elevatorContext.Provider>
                          </>
                        ) : (
                          subitem.name
                        )}
                      </View>
                    )
                  })}
                </>
              </View>
            )
          })}
        </View>
      </View>
      {indexList.length && scrollStart ? (
        <View className={b('code--current', { current: true })}>
          {indexList[codeIndex][acceptKey]}
        </View>
      ) : null}
      <View className={b('bars')}>
        <ScrollView
          className={b('bars__inner')}
          onTouchStart={(event) => touchStart(event)}
          onTouchMove={(event) => touchMove(event)}
          onTouchEnd={touchEnd}
          style={{ touchAction: 'pan-y' }}
          onScroll={listViewScroll}
        >
          {indexList.map((item: any, index: number) => {
            return (
              <View
                className={`${b('bars__inner__item', {
                  active:
                    item[acceptKey] === indexList[currentIndex][acceptKey],
                })} elevator__item__${index}`}
                data-index={index}
                key={index}
                onClick={() => handleClickIndex(item[acceptKey])}
              >
                {item[acceptKey]}
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
  )
}

Elevator.defaultProps = defaultProps
Elevator.displayName = 'NutElevator'
