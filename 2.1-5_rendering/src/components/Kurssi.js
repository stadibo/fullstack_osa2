import React from 'react'

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
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
        osat.map(osa => <Osa key={osa.id} content={osa} />)
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

export default Kurssi 