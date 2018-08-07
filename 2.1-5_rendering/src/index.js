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
            }
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
        <div>
            <Osa osa={osat[0]} />
            <Osa osa={osat[1]} />
            <Osa osa={osat[2]} />
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// const Yhteensa = (props) => {
//     return (
//         <p>yhteensä {props.osat[0].tehtavia + 
//             props.osat[1].tehtavia + 
//             props.osat[2].tehtavia} tehtävää</p>
//     )
// }

//<Yhteensa osat={kurssi.osat} />