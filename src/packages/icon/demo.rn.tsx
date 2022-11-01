import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { useTranslate } from '@/sites/assets/locale/taro'
import icons from '@/styles/font/config.json'
import { Icon, Cell, CellGroup } from '@/packages/nutui.react.rn'
import Clipboard from '@react-native-community/clipboard'
import '@/packages/icon/demo.rn.scss'

interface T {
  '84aa6bce': string
  dab8a74f: string
  '52c15454': string
  '7aeb5407': string
  f2e6c6d6: string
}
const generateCopyText = (name: string) => {
  return `<Icon name="${name}"></Icon>`
}
const generateAMCopyText = (icon: any) => {
  return `
  <Icon name="${icon.name}"
    className="${`nut-icon-${icon['animation-name']}  nut-icon-${icon['animation-time']}`}"/>`
}
const copyTag = (text: string) => {
  Clipboard.setString(text)
  Taro.showToast({ title: `Copy: ${text}` })
}

const IconDemo = () => {
  const [translated] = useTranslate<T>({
    'zh-CN': {
      '84aa6bce': '基础用法',
      dab8a74f: '图片链接',
      '52c15454': '图标颜色',
      '7aeb5407': '图标大小',
      f2e6c6d6: '基础图标',
    },
    'zh-TW': {
      '84aa6bce': '基礎用法',
      dab8a74f: '圖片連結',
      '52c15454': '圖示顏色',
      '7aeb5407': '圖示大小',
      f2e6c6d6: '基礎圖示',
    },
    'en-US': {
      '84aa6bce': 'Basic Usage',
      dab8a74f: 'Image link',
      '52c15454': 'Icon color',
      '7aeb5407': 'Icon size',
      f2e6c6d6: 'Base Icon',
    },
  })

  return (
    <>
      <View className="demo">
        <Text className="demo-h2">{translated['84aa6bce']}</Text>
        <Cell>
          <Icon name="dongdong" />
          <Icon name="JD" />
        </Cell>
        <Text className="demo-h2">{translated['dab8a74f']}</Text>
        <Cell>
          <Icon
            size="40"
            name="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
          />
        </Cell>
        <Text className="demo-h2">{translated['52c15454']}</Text>
        <Cell>
          <Icon name="dongdong" color="#fa2c19" />
          <Icon name="dongdong" color="#64b578" />
          <Icon name="JD" color="#fa2c19" />
        </Cell>
        <Text className="demo-h2">{translated['7aeb5407']}</Text>
        <Cell>
          <Icon name="dongdong" size="16" />
          <Icon name="dongdong" size="20" />
          <Icon name="dongdong" size="24" />
        </Cell>
        {icons.data.map((item, index) => {
          return (
            <CellGroup key={index} title={item.name}>
              <Cell>
                <View className="h5-ul">
                  {item.icons.map((icon, index) => {
                    return (
                      <View
                        className="h5-li"
                        key={icon + index}
                        onClick={() => copyTag(generateCopyText(icon))}
                      >
                        <Icon name={icon} />
                        <Text className="h5-span">{icon}</Text>
                      </View>
                    )
                  })}
                </View>
              </Cell>
            </CellGroup>
          )
        })}
        {icons.style.map((item, index) => {
          return (
            <CellGroup key={index} title={item.name}>
              <Cell>
                <View className="h5-ul-last">
                  {item.icons.map((icon) => {
                    return (
                      <View
                        className="h5-li"
                        key={icon.name}
                        onClick={() => copyTag(generateAMCopyText(icon))}
                      >
                        <Icon
                          name={icon.name}
                          animationName={`nut-icon-${icon['animation-name']}`}
                          animationTime={`nut-icon-${icon['animation-time']}`}
                        />
                        <Text>{icon['animation-name']}</Text>
                      </View>
                    )
                  })}
                </View>
              </Cell>
            </CellGroup>
          )
        })}
      </View>
    </>
  )
}

export default IconDemo
