import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14
            },
            {
                nimi: 'Scrubs',
                tehtavia: 11
            },
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi}/>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

const Otsikko = ({ nimi }) => {
    return (
        <h1>{nimi}</h1>
    )
}

const Sisalto = ({ osat }) => {
    return (
        osat.map((osa, i) => <Osa key={i} content={osa}/>)
    )
}

const Osa = ({ content }) => {
    return (
        <p>{content.nimi} {content.tehtavia}</p>
    )
}

const Yhteensa = ({ osat }) => {
    let maara = osat.reduce((tot, osa) => tot + osa.tehtavia, 0)
    return (
        <p>yhteensä {maara} tehtävää</p>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

