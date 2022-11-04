import React from 'react'
import { useTranslate } from '@/sites/assets/locale/taro'
import { View, Text } from '@tarojs/components'
import { Row, Col } from '@/packages/nutui.react.rn'
import '@/packages/layout/demo.rn.scss'

type TLayoutDemo = {
  title1: string
  title2: string
  title3: string
}

const LayoutDemo = () => {
  const [translated] = useTranslate<TLayoutDemo>({
    'zh-CN': {
      title1: '基础布局',
      title2: '分栏间隔',
      title3: 'Flex布局',
    },
    'zh-TW': {
      title1: '基礎佈局',
      title2: '分欄間隔',
      title3: 'Flex佈局',
    },
    'en-US': {
      title1: 'Basic layout',
      title2: 'column interval',
      title3: 'Flex layout',
    },
    'id-ID': {
      title1: 'Tata letak dasar',
      title2: 'interval kolom',
      title3: 'Tata letak fleksibel',
    },
  })
  return (
    <>
      <View className="demo full">
        <Text className="demo-h2">{translated.title1}</Text>
        <View className="box-item">
          <Row>
            <Col span="24">
              <View className="flex-content">span:24</View>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <View className="flex-content">span:12</View>
            </Col>
            <Col span="12">
              <View className="flex-content flex-content-light">span:12</View>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <View className="flex-content">span:8</View>
            </Col>
            <Col span="8">
              <View className="flex-content flex-content-light">span:8</View>
            </Col>
            <Col span="8">
              <View className="flex-content">span:8</View>
            </Col>
          </Row>
          <Row>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
          </Row>
        </View>
        <Text className="demo-h2">{translated.title2}</Text>
        <View className="box-item">
          <Row gutter="10">
            <Col span="8">
              <View className="flex-content">span:8</View>
            </Col>
            <Col span="8">
              <View className="flex-content flex-content-light">span:8</View>
            </Col>
            <Col span="8">
              <View className="flex-content">span:8</View>
            </Col>
          </Row>
        </View>
        <Text className="demo-h2">{translated.title3}</Text>
        <View className="box-item">
          <Row type="flex" wrap="nowrap">
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
          </Row>
          <Row type="flex" justify="end">
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content flex-content-light">span:6</View>
            </Col>
            <Col span="6">
              <View className="flex-content">span:6</View>
            </Col>
          </Row>
        </View>
      </View>
    </>
  )
}

export default LayoutDemo
