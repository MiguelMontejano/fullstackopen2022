import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  //estados
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewphone ] = useState('')
  const [ nameSearched, setNameSearched] = useState('')
  const [ showAll, setshowAll] = useState(true)

  //controladores de eventos
  useEffect(() => {
      personService
        .getAll()
        .then(initialPhones => {
          setPersons(initialPhones)
        })
  }, []) //El objeto vacio para que solo se realice la primera vez que se renderiza el componente y no todas

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewphone(event.target.value)
  }

  const handleSearchedChange = (event) => {
    if(event.target.value !== ''){
      setshowAll(false)
    }
    else{
      setshowAll(true)
    }
    setNameSearched(event.target.value)
  }

  //funciones
  const addPerson = (event) => {
    event.preventDefault(); //Para evitar que se refresque la pagina que se hace por defecto al enviar un form
    let exists = false;
    let id, name, phone;
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name.toLowerCase() === newName.toLowerCase()){ //You cant add 2 equal names but you can add Arto Hellas and Arto for example
        exists = true;
        //obtengo los valores que me interesan
        id = persons[i].id
        name = persons[i].name
      }
    }

    if(exists === true){
      const result = window.confirm(`${name} is already added to your phonebook, replace the old number with a new one?`)
      if(result === true){ //El usuario acepta el popup
        const person = persons.find(p => p.id === id)
        const changedPerson = { ...person, number: newPhone }
  
        personService
          .update(id, changedPerson)
          .then(returnedPhone => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPhone))
          })
      }

    }else{
      const personObject = {
        name:newName,
        number:newPhone
      }

      personService
        .create(personObject)
        .then(returnedPhone => {
          setPersons(persons.concat(returnedPhone))
        })
  
    }
    setNewName('') //Siempre reseteamos el input
    setNewphone('') //Siempre reseteamos el input
  }

  const deletePerson = (id, name) =>{
    const result = window.confirm(`Are you sure do you want to delete ${name} from your phonebook?`)
    if(result === true){ //El usuario acepta el popup
      personService
      .remove(id)
      .then( () => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }

  }

  //constantes y variables
  const phonesToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(nameSearched.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameSearched} onChange={handleSearchedChange} />
      <h3>add a new phone</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />
      <h3>Numbers</h3>
      <Content persons={phonesToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
