const languages = require('./src/data/languages')

module.exports = {
  pathPrefix: '/ass',
  siteMetadata: {
    title: 'Online ASS Editor',
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
