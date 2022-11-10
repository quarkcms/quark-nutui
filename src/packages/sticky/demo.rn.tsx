import React, { useRef } from 'react'
import { Cell, Button, Sticky } from '@/packages/nutui.react.rn'
import { View, Text } from '@tarojs/components'

const StickyDemo = () => {
  const containerTopRef = useRef(null)
  const containerRef = useRef(null)
  const handleChange = (val: boolean) => {
    console.log('吸顶状态发生了改变,当前fixed为', val)
  }
  return (
    <>
      <View className="demo">
        <Text className="demo-h2">基础用法</Text>
        <Cell>
          <Sticky top={57} onChange={handleChange}>
            <Button type="primary">吸顶</Button>
          </Sticky>
        </Cell>

        <Text className="demo-h2">吸顶距离</Text>
        <Cell>
          <Sticky top={120}>
            <Button type="primary">距离顶部120px</Button>
          </Sticky>
        </Cell>

        <Text className="demo-h2">指定容器内吸顶</Text>
        <Cell>
          <View
            className="sticky-container"
            ref={containerTopRef}
            style={{ height: '300px' }}
          >
            <Sticky container={containerTopRef} top={57}>
              <Button style={{ marginLeft: '100px' }} type="info">
                指定容器内吸顶
              </Button>
            </Sticky>
          </View>
        </Cell>

        <Text className="demo-h2">指定容器吸底</Text>
        <Cell>
          <View
            className="sticky-container"
            ref={containerRef}
            style={{ height: '300px' }}
          >
            <Sticky position="bottom" container={containerRef} bottom={0}>
              <Button style={{ marginLeft: '100px' }} type="info">
                指定容器吸底
              </Button>
            </Sticky>
          </View>
        </Cell>

        <Text className="demo-h2">吸底距离</Text>
        <Cell style={{ height: 64 }}>
          <Sticky top={0} position="bottom">
            <Button type="primary">距离底部0px</Button>
          </Sticky>
        </Cell>
      </View>
    </>
  )
}

export default StickyDemo
