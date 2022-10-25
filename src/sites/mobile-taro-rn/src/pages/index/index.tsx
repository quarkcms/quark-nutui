import React from 'react'
import Taro from '@tarojs/taro'
import bem from '@/utils/bem'

const Index = () => {
  const b = bem('address')

  return <>{b('header__title')}</>
}

export default Index
