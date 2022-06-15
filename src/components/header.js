import React from 'react'
import {Icon, Menu} from 'semantic-ui-react'
import SelectLanguage from './select-language'
import {FormattedMessage} from 'react-intl'

const Header = ({siteTitle, langs}) => (
    <Menu inverted fluid widths={6}>
        <Menu.Item as='a' href='https://github.com/Jeff-Tian/ass' target="_blank" name='源代码' active={false}>
            <Icon
                name="github alternate"/>
            <FormattedMessage id='source'/>
        </Menu.Item>
        <Menu.Item name={siteTitle} active={true} color={'red'}>
            <Icon name="closed captioning"/>
            <FormattedMessage id="onlineAssEditor"/>
        </Menu.Item>
        <Menu.Item as='a' name={'知乎'} active={false} href='https://www.zhihu.com/zvideo/1520077071863099392'
                   target="_blank">
            <Icon name="download" />
            <FormattedMessage id="downloadZhihuVideo"/>
        </Menu.Item>
        <Menu.Item as='a' name={'why'} active={false} href='https://zhuanlan.zhihu.com/p/367033792' target="_blank">
            <Icon name="history" />
            <FormattedMessage id="why"/>
        </Menu.Item>
        <Menu.Item as='a' name={'登录'} active={false} href='https://uniheart.pa-ca.me/keycloak/login' target="_blank">
            <Icon name="sign in"/>
            <FormattedMessage id="login"/>
        </Menu.Item>
        <Menu.Item name='' active={false}>
            <SelectLanguage langs={langs}/>
        </Menu.Item>
    </Menu>
)

export default Header
