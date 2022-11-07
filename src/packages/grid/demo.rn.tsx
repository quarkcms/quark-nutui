import React from 'react'
import Taro from '@tarojs/taro'
import { useTranslate } from '@/sites/assets/locale/taro'
import { Avatar, Grid, GridItem } from '@/packages/nutui.react.rn'
import { View, Text } from '@tarojs/components'

interface T {
  basic: string
  text: string
  columnNum: string
  square: string
  gutter: string
  reverse: string
  horizontal: string
  iconStyle: string
  customContent: string
}
const GridDemo = () => {
  const [translated] = useTranslate<T>({
    'zh-CN': {
      basic: '基本用法',
      text: '文字',
      columnNum: '自定义列数',
      square: '正方形格子',
      gutter: '格子间距',
      reverse: '内容翻转',
      horizontal: '内容横向',
      iconStyle: '图标颜色/大小',
      customContent: '自定义内容',
    },
    'zh-TW': {
      basic: '基本用法',
      text: '文字',
      columnNum: '自定義列數',
      square: '正方形格子',
      gutter: '格子間距',
      reverse: '內容翻轉',
      horizontal: '內容橫向',
      iconStyle: '圖標顏色/大小',
      customContent: '自定義內容',
    },
    'en-US': {
      basic: 'Basic Usage',
      text: 'text',
      columnNum: 'Column Num',
      square: 'Square',
      gutter: 'Gutter',
      reverse: 'Reverse',
      horizontal: 'Horizontal',
      iconStyle: 'Icon Style',
      customContent: 'Custom Content',
    },
  })

  const handleClick = () => {
    Taro.showToast({ title: '点击了第几个' })
  }
  return (
    <>
      <View className="demo">
        <Text className="demo-h2-bm10">{translated.basic}</Text>
        <Grid>
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
        </Grid>

        <Text className="demo-h2-bm10">{translated.columnNum}</Text>
        <Grid columnNum={3}>
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
        </Grid>

        <Text className="demo-h2-bm10">{translated.square}</Text>
        <Grid columnNum={3} square>
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
        </Grid>

        <Text className="demo-h2-bm10">{translated.gutter}</Text>
        <Grid gutter={3}>
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
        </Grid>

        <Text className="demo-h2-bm10">{translated.reverse}</Text>
        <Grid reverse>
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
        </Grid>

        <Text className="demo-h2-bm10">{translated.horizontal}</Text>
        <Grid direction="horizontal">
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
          <GridItem icon="dongdong" text={translated.text} />
        </Grid>

        <Text className="demo-h2-bm10">{translated.iconStyle}</Text>
        <Grid columnNum="3" iconColor="#fa2c19">
          <GridItem icon="dongdong" text={translated.text} iconSize="40" />
          <GridItem
            icon="dongdong"
            text={translated.text}
            iconColor="#478EF2"
            iconSize="40"
          />
          <GridItem icon="dongdong" text={translated.text} iconSize="40" />
        </Grid>

        <Text className="demo-h2-bm10">{translated.customContent}</Text>
        <Grid border={false}>
          <GridItem icon="dongdong" text={<Text>More</Text>} />
          <GridItem
            text={
              <Avatar
                className="demo-avatar"
                icon="my"
                color="#fff"
                bgColor="#FA2C19"
              />
            }
            onClick={handleClick}
          />
          <GridItem
            icon={
              <Avatar
                className="demo-avatar"
                icon="my"
                color="#fff"
                bgColor="#FA2C19"
              />
            }
          />
          <GridItem>
            <Avatar
              size="large"
              icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
            />
          </GridItem>
        </Grid>
      </View>
    </>
  )
}

export default GridDemo
