import React from 'react'
import axios from 'axios'

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
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                this.setState({
                    persons: response.data
                })
            })
    }

    addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber,
            id: this.state.persons.length + 1
        }

        if (!this.state.persons.map(p => p.name).includes(this.state.newName)) {
            const persons = this.state.persons.concat(personObject)

            this.setState({
                persons,
                newName: '',
                newNumber: ''

            })
        } else {
            alert('Henkilö jo lisätty')
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
                    <Persons persons={filteredPersons} />
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

const Persons = ({ persons }) => {
    return (
        <table>
            <tbody>
                {persons.map(p => <Person key={p.id} person={p} />)}
            </tbody>
        </table>
    )
}

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

export default App