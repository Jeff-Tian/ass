import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FormattedMessage } from 'react-intl'
import { Flag } from 'semantic-ui-react'

const countryLangMapping = {
  zh: 'cn',
  en: 'us',
}

const SelectLanguage = props => {
  const links = props.langs.map(lang => (
    <Link to={lang.link} key={lang.langKey}>
      <span
        style={{
          marginRight: '15px',
          display: 'inline-block',
          color: 'white',
          fontWeight: lang.selected ? 'bold' : 'normal',
        }}
      >
        <Flag name={countryLangMapping[lang.langKey]} />
        <FormattedMessage id={lang.langKey} />
      </span>
    </Link>
  ))

  return (
    <div>
      <FormattedMessage id="selectLanguage" />
      {links}
    </div>
  )
}

SelectLanguage.propTypes = {
  langs: PropTypes.array,
}

export default SelectLanguage
