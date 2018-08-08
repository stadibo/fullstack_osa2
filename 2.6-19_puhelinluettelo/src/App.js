import React from 'react'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentDidMount() {
        personService
            .getAll()
            .then(persons => {
                this.setState({
                    persons
                })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber,
        }

        if (!this.state.persons.map(p => p.name).includes(this.state.newName)) {
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: ''
                    })
                })
        } else {
            alert('Henkilö jo lisätty')
        }
    }

    removePerson = (id) => () => {
        let pers = this.state.persons.find(p => p.id === id)
        let toDelete = window.confirm(`Poistetaanko ${pers.name}`)
        if (toDelete)
            personService
                .del(id)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(p => p.id !== id)
                    })
                })
        console.log('deleted')
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        const filteredPersons = (
            this.state.persons
                .filter(p => p.name.toLowerCase()
                    .includes(this.state.filter.toLowerCase()))
        )
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <div>
                    <InputField
                        text="Rajaa näytettäviä"
                        value={this.state.filter}
                        handler={this.handleFilterChange}
                    />
                </div>
                <form onSubmit={this.addPerson}>
                    <div>
                        <InputField
                            text="Nimi"
                            value={this.state.newName}
                            handler={this.handleNameChange}
                        />
                    </div>
                    <div>
                        <InputField
                            text="Numero"
                            value={this.state.newNumber}
                            handler={this.handleNumberChange}
                        />
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <div>
                    <h2>Numerot</h2>
                    <Persons persons={filteredPersons} handlePerson={this.removePerson} />
                </div>
            </div>
        )
    }
}

const InputField = ({ handler, value, text }) => {
    return (
        <div>
            {text}: <input
                value={value}
                onChange={handler}
            />
        </div>
    )
}

const Persons = ({ persons, handlePerson }) => {
    return (
        <table>
            <tbody>
                {persons.map(p => <Person key={p.id} person={p} handler={handlePerson(p.id)} />)}
            </tbody>
        </table>
    )
}

const Person = ({ person, handler }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={handler}>poista</button></td>
        </tr>
    )
}

export default App