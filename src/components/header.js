import React from 'react'
import {Icon, Menu} from 'semantic-ui-react'
import SelectLanguage from './select-language'
import {FormattedMessage} from 'react-intl'

const Header = ({siteTitle, langs}) => (
    <Menu inverted fluid widths={3}>
        <Menu.Item as='a' href='https://github.com/Jeff-Tian/ass' target="_blank" name='源代码' active={false}><Icon
            name="github alternate"/></Menu.Item>
        <Menu.Item name={siteTitle} active={true} color={'red'}>
            <FormattedMessage id="onlineAssEditor"/>
        </Menu.Item>
        <Menu.Item name='' active={false}>
            <SelectLanguage langs={langs}/>
        </Menu.Item>
        <Menu.Item as='a' name={'登录'} active={false} href='https://uniheart.pa-ca.me/keycloak/login' target="_blank">
            <FormattedMessage id="login"/>
            <Icon name="sign in"/>
        </Menu.Item>
    </Menu>
)

export default Header
