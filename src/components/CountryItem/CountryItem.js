import React from 'react'
import './CountryItem.css'

const CountryItem = ({
  props: { name, flag, borders, expandedBorderNames },
  languageData,
  currentModeIndex,
  style
}) => {
  let borderCountries = []
  let languageComponent
  let displayName = name

  // currentModeIndex 2 === 'most borders'
  if (currentModeIndex === 2) {
    borderCountries = expandedBorderNames.map((country, index) => (
      <div key={`${name}${index}`} className='border-country'>
        {country}
      </div>
    ))
    displayName = `${name} - ${borders.length}`
  }

  // currentModeIndex 3 === 'shared language'
  if (currentModeIndex === 3) {
    const language = languageData.substring(0, languageData.indexOf(' - '))
    languageComponent = <div className='country-language'>{language}</div>
  }

  const flagStyle = {
    backgroundImage: `url(${flag})`
  }

  return (
    <div style={style} className='country-item'>
      <div className='country-item-title'>
        {languageComponent}
        <div className='country-flag' style={flagStyle}></div>
        <div className='country-item-name'>{displayName}</div>
      </div>
      {borderCountries}
    </div>
  )
}

export default CountryItem
