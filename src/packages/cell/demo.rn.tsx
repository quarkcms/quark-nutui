import React from 'react'
import { View, Text, Switch, Image } from '@tarojs/components'

import { useTranslate } from '@/sites/assets/locale/taro'
import { Cell, CellGroup } from '@/packages/nutui.react.rn'

interface T {
  basic: string
  desc: string
  desc1: string
  title: string
  title1: string
  title2: string
  title3: string
  title4: string
  title5: string
  title6: string
  title7: string
  title8: string
  title9: string
  link: string
  urlJump: string
  routerJump: string
  name: string
  image: string
  content: string
  customRight: string
  customLeftIcon: string
  displayIcon: string
}

const CellDemo = () => {
  const [translated] = useTranslate<T>({
    'zh-CN': {
      basic: '基本用法',
      desc: '描述文字',
      desc1: '使用 nut-cell-group 支持 title desc slots',
      title: '我是标题',
      title1: '副标题描述',
      title2: '直接使用插槽(slot)',
      title3: '点击测试',
      title4: '圆角设置 0',
      title5: '链接 | 分组用法',
      title6: '只展示 desc ，可通过 desc-text-align 调整内容位置',
      title7: '垂直居中',
      title8: '直接使用插槽(slot title)',
      title9: '尺寸设置 large',
      link: '链接',
      urlJump: 'URL 跳转',
      routerJump: '路由跳转 ’/‘ ',
      name: '姓名',
      image: '图片',
      content: '自定义内容',
      customRight: '自定义右侧箭头区域',
      customLeftIcon: '自定义左侧 Icon 区域',
      displayIcon: '展示图标',
    },
    'zh-TW': {
      basic: '基本用法',
      desc: '描述文字',
      desc1: '使用 nut-cell-group 支持 title desc slots',
      title: '我是標題',
      title1: '副標題描述',
      title2: '直接使用插槽(slot)',
      title3: '點擊測試',
      title4: '圓角設置 0',
      title5: '鏈接 | 分組用法',
      title6: '只展示 desc ，可通過 desc-text-align 調整內容位置',
      title7: '垂直居中',
      title8: '直接使用插槽(slot title)',
      title9: '尺寸設置 large',
      link: '鏈接',
      urlJump: 'URL 跳轉',
      routerJump: '路由跳轉 』/『 ',
      name: '姓名',
      image: '圖片',
      content: '自定義內容',
      customRight: '自定義右側箭頭區域',
      customLeftIcon: '自定義左側 Icon 區域',
      displayIcon: '展示圖標',
    },
    'en-US': {
      basic: 'Basic Usage',
      desc: 'Description',
      desc1: 'Usage nut-cell-group support title desc slots',
      title: 'Title',
      title1: 'Subtitle Description',
      title2: 'Use Slots',
      title3: 'Click Test',
      title4: 'Round Radius 0',
      title5: 'Link | CellGroup Usage',
      title6:
        'Only display desc , you can adjust the content position through desc-text-align',
      title7: 'Vertical Center',
      title8: 'Use Slots title',
      title9: 'Size setting large',
      link: 'Link',
      urlJump: 'URL Jump',
      routerJump: 'Router Jump ’/‘ ',
      name: 'Name',
      image: 'Image',
      content: 'Content',
      customRight: 'Customize the right arrow area',
      customLeftIcon: 'Customize the left Icon area',
      displayIcon: 'Display Icon',
    },
  })
  const testClick = (event: React.MouseEvent<any, any>) => {
    console.log('点击事件')
  }
  return (
    <>
      <View className="demo">
        <Text className="demo-h2">{translated.basic}</Text>
        <Cell title={translated.title} desc={translated.desc} />
        <Cell
          title={translated.title}
          subTitle={translated.title1}
          desc={translated.desc}
        />
        <Cell
          title={translated.title3}
          onClick={(event: React.MouseEvent<any, any>) => testClick(event)}
        />
        <Cell title={translated.title4} roundRadius="0" />
        <Text className="demo-h2">尺寸设置large</Text>
        <Cell size="large" title={translated.title} desc={translated.desc} />
        <Cell
          size="large"
          title={translated.title}
          subTitle={translated.title1}
          desc={translated.desc}
        />
        <Text className="demo-h2">{translated.title2}</Text>
        <Cell>
          <View>{translated.content}</View>
        </Cell>
        <Text className="demo-h2">{translated.title8}</Text>
        <Cell
          title={
            <Text>
              Title <Text style={{ color: 'red' }}>1</Text>
            </Text>
          }
          desc={translated.desc}
        />
        <CellGroup title={translated.title5} desc={translated.desc1}>
          <Cell title={translated.link} isLink />
          <Cell
            title={translated.urlJump}
            desc="跳转小程序demo库首页"
            isLink
            url="/pages/index/index"
          />
          <Cell title={translated.routerJump} to="/" />
        </CellGroup>
        <CellGroup title={translated.customRight}>
          <Cell title="Switch" linkSlot={<Switch checked />} />
        </CellGroup>
        <CellGroup title={translated.customLeftIcon}>
          <Cell
            title={translated.image}
            iconSlot={
              <Image
                style={{
                  position: 'relative',
                  width: 20,
                  height: 20,
                  lineHeight: 20,
                  textAlign: 'right',
                }}
                src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
              />
            }
          />
        </CellGroup>
        <Text className="demo-h2">{translated.displayIcon}</Text>
        <Cell title={translated.name} icon="my" desc={translated.desc} isLink />
        <Text className="demo-h2">{translated.title6}</Text>
        <Cell descTextAlign="left" desc={translated.desc} />
        <Text className="demo-h2">垂直居中</Text>
        <Cell
          center
          title={translated.title}
          subTitle={translated.title1}
          desc={translated.desc}
        />
      </View>
    </>
  )
}

export default CellDemo
