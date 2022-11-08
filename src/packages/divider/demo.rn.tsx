import React from 'react'
import Taro from '@tarojs/taro'
import { Divider, Cell } from '@/packages/nutui.react.rn'
import { View, Text } from '@tarojs/components'
import { useTranslate } from '@/sites/assets/locale/taro'

interface T {
  basic: string
  withText: string
  contentPosition: string
  dashed: string
  customStyle: string
  verticalDivider: string
  text: string
  link: string
}
const DividerDemo = () => {
  const [translated] = useTranslate<T>({
    'zh-CN': {
      basic: '基本用法',
      withText: '展示文本',
      contentPosition: '内容位置',
      dashed: '虚线',
      customStyle: '自定义样式',
      verticalDivider: '垂直分割线',
      text: '文本',
      link: '链接',
    },
    'en-US': {
      basic: 'Basic Usage',
      withText: 'With Text',
      contentPosition: 'Content Position',
      dashed: 'Dashed',
      customStyle: 'Custom Style',
      verticalDivider: 'Vertical Divider',
      text: 'Text',
      link: 'Link',
    },
  })
  return (
    <>
      <View className="demo">
        <Text className="demo-h2">{translated.basic}</Text>
        <Cell>
          <Divider />
        </Cell>
        <Text className="demo-h2">{translated.withText}</Text>
        <Cell>
          <Divider>{translated.text}</Divider>
        </Cell>
        <Text className="demo-h2">{translated.contentPosition}</Text>
        <Cell>
          <Divider contentPosition="left">{translated.text}</Divider>
        </Cell>
        <Cell>
          <Divider contentPosition="right">{translated.text}</Divider>
        </Cell>
        <Text className="demo-h2">{translated.dashed}</Text>
        <Cell>
          <Divider dashed>{translated.text}</Divider>
        </Cell>
        <Text className="demo-h2">{translated.customStyle}</Text>
        <Cell>
          <Divider
            styles={{
              color: '#1989fa',
              borderColor: '#1989fa',
              marginRight: 16,
              marginLeft: 16,
            }}
          >
            {translated.text}
          </Divider>
        </Cell>
        <Text className="demo-h2">{translated.verticalDivider}</Text>
        <Cell>
          <View
            style={{
              fontSize: 16,
              marginLeft: 27,
              color: '#909ca4',
              flexDirection: 'row',
            }}
          >
            {translated.text}
            <Divider direction="vertical" />
            <View
              onClick={() => {
                Taro.navigateTo({ url: '/pages/index/index' })
              }}
              style={{ fontSize: 16, color: '#1989fa' }}
            >
              {translated.link}
            </View>
            <Divider direction="vertical" />
            <View
              onClick={() => {
                Taro.navigateTo({ url: '/pages/index/index' })
              }}
              style={{ fontSize: 16, color: '#1989fa' }}
            >
              {translated.link}
            </View>
          </View>
        </Cell>
      </View>
    </>
  )
}

export default DividerDemo
