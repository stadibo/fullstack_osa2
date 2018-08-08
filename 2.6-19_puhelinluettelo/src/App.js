import React from 'react'
import personService from './services/persons'


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            message: null,
            errorType: null
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

        if (this.state.persons.map(p => p.name).includes(this.state.newName)) {
            let toReplace = window.confirm('Henkilö jo luettelossa, korvataanko vanha numero uudella?')
            if (toReplace) {
                this.updatePerson()
            }
        } else {
            this.addNewPerson(personObject)
        }

    }

    addNewPerson = (person) => {
        personService
            .create(person)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: '',
                    newNumber: '',
                    errorType: "success",
                    message: `lisättiin ${newPerson.name}`
                })
                setTimeout(() => {
                    this.setState({ errorType: null })
                }, 5000)
            })
    }

    updatePerson = () => {
        const person = this.state.persons.find(p => p.name === this.state.newName)
        const changedPerson = { ...person, number: this.state.newNumber }
        const id = person.id

        personService
            .update(id, changedPerson)
            .then(updatedPerson => {
                this.setState({
                    persons: this.state.persons.map(p => p.id !== id ? p : updatedPerson),
                    newName: '',
                    newNumber: '',
                    errorType: "success",
                    message: `päivitettiin ${updatedPerson.name}`
                })
                setTimeout(() => {
                    this.setState({ errorType: null })
                }, 5000)
            }).catch(error => {
                let toAdd = window.confirm('Henkilö jo poistettu luettelosta, lisäätäänkö henkilö?')
                if (toAdd) {
                    this.setState({ persons: this.state.persons.filter(p => p.id !== id) })
                    this.addNewPerson(changedPerson)
                }
            })
    }

    removePerson = (id) => () => {
        let pers = this.state.persons.find(p => p.id === id)
        let toDelete = window.confirm(`Poistetaanko ${pers.name}`)
        if (toDelete) {
            personService
                .del(id)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(p => p.id !== id),
                        errorType: "success",
                        message: `poistettiin ${pers.name}`
                    })
                    setTimeout(() => {
                        this.setState({ errorType: null })
                    }, 5000)
                }).catch(error => {

                })
        }

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
                <h1>Puhelinluettelo</h1>

                <Notification
                    message={this.state.message}
                    type={this.state.errorType}
                />

                <div>
                    <InputField
                        text="Rajaa näytettäviä"
                        value={this.state.filter}
                        handler={this.handleFilterChange}
                    />
                </div>

                <h2>Lisää uusi</h2>
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
        <div className="field">
            {text}: <input
                value={value}
                onChange={handler}
            />
        </div>
    )
}

const Persons = ({ persons, handlePerson }) => {
    return (
        <table className="persons">
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

const Notification = ({ message, type }) => {
    if (type === null) {
        return null
    }
    return (
        <div className={type}>
            {message}
        </div>
    )
}

export default App