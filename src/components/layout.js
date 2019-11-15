import React from 'react'
import Helmet from 'react-helmet'

import Header from '../components/header'
import './index.css'

import { getCurrentLangKey, getLangs, getUrlForLang } from 'ptz-i18n'
import { IntlProvider } from 'react-intl'
import 'intl'
import { StaticQuery, graphql } from 'gatsby'

const Layout = ({ children, location, i18nMessages }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              languages {
                defaultLangKey
                langs
              }
            }
          }
        }
      `}
      render={data => {
        const url = (location || {}).pathname || '/'
        const { langs, defaultLangKey } = data.site.siteMetadata.languages
        const langKey = getCurrentLangKey(langs, defaultLangKey, url)
        const homeLink = `/${langKey}/`
        const langsMenu = getLangs(langs, langKey, getUrlForLang(homeLink, url))

        return (
          <IntlProvider locale={langKey} messages={i18nMessages}>
            <div>
              <Helmet
                title={i18nMessages.onlineAssEditor}
                meta={[
                  {
                    name: 'description',
                    content: i18nMessages.onlineAssEditor,
                  },
                  {
                    name: 'keywords',
                    content: 'ass, subtitle, video, 字幕, 视频',
                  },
                ]}
              />
              <Header
                siteTitle={data.site.siteMetadata.title}
                langs={langsMenu}
              />
              <div
                style={{
                  margin: '0 auto',
                  padding: '0px 1.0875rem 1.45rem',
                  paddingTop: 0,
                }}
              >
                {children}
              </div>
            </div>
          </IntlProvider>
        )
      }}
    />
  )
}

export default Layout
