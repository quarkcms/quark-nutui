import React, { useState } from 'react'
import { useTranslate } from '@/sites/assets/locale/taro'
import {
  Button,
  Cell,
  Overlay,
  ConfigProvider,
} from '@/packages/nutui.react.rn'
import { View, Text } from '@tarojs/components'
import '@/packages/overlay/demo.rn.scss'

interface T {
  '84aa6bce': string
  '2a9e4928': string
  abbf9359: string
  ec0d7acf: string
  ce1e18a2: string
}
const OverlayDemo = () => {
  const [translated] = useTranslate<T>({
    'zh-CN': {
      '84aa6bce': '基础用法',
      '2a9e4928': '显示遮罩层',
      abbf9359: '遮罩样式',
      ec0d7acf: '嵌套内容',
      ce1e18a2: '这里是正文',
    },
    'zh-TW': {
      '84aa6bce': '基礎用法',
      '2a9e4928': '顯示遮罩層',
      abbf9359: '遮罩樣式',
      ec0d7acf: '嵌套內容',
      ce1e18a2: '這裡是正文',
    },
    'en-US': {
      '84aa6bce': 'Basic usage',
      '2a9e4928': 'show mask layer',
      abbf9359: 'mask style',
      ec0d7acf: 'nested content',
      ce1e18a2: 'here is the text',
    },
  })

  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)

  const handleToggleShow = () => {
    setVisible(true)
  }
  const handleToggleShow2 = () => {
    setVisible2(true)
  }
  const handleToggleShow3 = () => {
    setVisible3(true)
  }

  const onClose = () => {
    setVisible(false)
  }
  const onClose2 = () => {
    setVisible2(false)
  }
  const onClose3 = () => {
    setVisible3(false)
  }
  return (
    <ConfigProvider>
      <View className="demo demo-overlay">
        <Text className="demo-h2">{translated['84aa6bce']}</Text>
        <Cell>
          <Button type="primary" onClick={handleToggleShow}>
            {translated['2a9e4928']}
          </Button>
          <Overlay visible={visible} onClick={onClose} />
        </Cell>
        <Text className="demo-h2">{translated['abbf9359']}</Text>
        <Cell>
          <Button type="primary" onClick={handleToggleShow2}>
            {translated['2a9e4928']}
          </Button>
          <Overlay
            visible={visible2}
            onClick={onClose2}
            overlayStyle={{
              backgroundColor: '#38333333',
            }}
          />
        </Cell>
        <Text className="demo-h2">{translated['ec0d7acf']}</Text>
        <Cell>
          <Button type="success" onClick={handleToggleShow3}>
            {translated.ec0d7acf}
          </Button>
          <Overlay visible={visible3} onClick={onClose3}>
            <View className="wrapper">
              <View className="content">{translated.ce1e18a2}</View>
            </View>
          </Overlay>
        </Cell>
      </View>
    </ConfigProvider>
  )
}

export default OverlayDemo
