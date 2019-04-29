const languages = require('./src/data/languages')

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Online ASS Editor 在线视频字幕编辑器',
    languages,
  },
  plugins: ['gatsby-plugin-react-helmet', {
    resolve: 'gatsby-plugin-i18n',
    options: {
      langKeyForNull: 'any',
      langKeyDefault: languages.defaultLangKey,
      useLangKeyLayout: true,
    },
  }],
}
