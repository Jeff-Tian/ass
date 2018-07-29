import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'

const Header = ({ siteTitle }) => (
  <Menu inverted fluid widths={3}>
    <Menu.Item name='' active={false}/>`
    <Menu.Item name={siteTitle} active={true} color={'red'}/>
    <Menu.Item as='a' href='https://github.com/Jeff-Tian/ass' target="_blank" name='源代码' active={false}><Icon
      name="github alternate"/></Menu.Item>
  </Menu>
)

export default Header
