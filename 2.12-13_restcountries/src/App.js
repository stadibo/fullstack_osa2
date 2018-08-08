import React from 'react'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countries = response.data
        this.setState({ countries })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleClick = (country) => () => {
    this.setState({ filter: country })
  }

  render() {
    const filteredCountries = (
      this.state.countries
        .filter(p => p.name.toLowerCase()
          .includes(this.state.filter.toLowerCase()))
    )
    return (
      <div>
        <div>
          <h2>COUNTRY DATA</h2>
        </div>
        <div>
          <InputField
            text="Find countries"
            value={this.state.filter}
            handler={this.handleFilterChange}
          />
        </div>
        <Countries countries={filteredCountries} handleCountry={this.handleClick} />
      </div>
    )
  }
}

const InputField = ({ handler, value, text }) => {
  return (
    <div className="field">
      {text}: <input
        value={value}
        onChange={handler}
      />
    </div>
  )
}

const Countries = ({ countries, handleCountry }) => {
  if (1 < countries.length && countries.length <= 10)
    return countries.map(c => <Country key={c.numericCode} country={c} handler={handleCountry} />)
  else if (countries.length === 1) {
    let country = countries[0]
    console.log(country.name)
    return (
      <div>
        <div>
          <h3>{country.name} - {country.nativeName}</h3>
        </div>
        <div>
          <p>capital: {country.capital}</p>
        </div>
        <div>
          <p>population: {country.population}</p>
        </div>
        <div>
          <img alt={`${country.name} flag`} src={country.flag} width="300" height="200"/>
        </div>
      </div>
    )
  } else {
    return <p>Too many matches, be more specific</p>
  }
}

const Country = ({ country, handler }) => {
  return (
    <div>
      <p key={country.numericCode} onClick={handler(country.name)}>
        {country.name}
      </p>
    </div>
  )
}

export default App;
