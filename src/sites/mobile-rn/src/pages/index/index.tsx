import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import pkg from '@/config.json'
import './index.scss'

const navs = pkg.nav
const Index = () => {
  const gotoNext = (name: string, enName: string) => {
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: `/${enName}/pages/${name.toLocaleLowerCase()}/index`,
    })
  }

  return (
    <>
      <View className="index">
        <View className="index-header">
          <Image
            className="img"
            src={`https://img14.360buyimg.com/imagetools/jfs/t1/117879/25/28831/6279/6329723bE66715a2f/5f099b8feca9e8cc.png`}
          />
          <View className="info">
            <Text className="h1">NutUI React</Text>
            <Text className="p">京东风格的轻量级小程序组件库 React 版</Text>
          </View>
        </View>
        <View className="index-components">
          {navs.map((nav) => (
            <View className="ol" key={nav.name}>
              <View className="ol-li">{nav.name}</View>
              <View className="ul">
                {nav.packages.map((com) =>
                  com.show && com.taro ? (
                    <View className="ul-li" key={com.name}>
                      <View
                        className="a"
                        key={com.name}
                        onClick={() => gotoNext(com.name, nav.enName)}
                      >
                        {com.name}
                      </View>
                    </View>
                  ) : null
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  )
}

export default Index
