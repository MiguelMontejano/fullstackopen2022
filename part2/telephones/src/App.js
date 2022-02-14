import React, { useState } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  //estados
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '123456789'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewphone ] = useState('')
  const [ nameSearched, setNameSearched] = useState('')
  const [ showAll, setshowAll] = useState(true)

  //controladores de eventos
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
    for (let i = 0; i < persons.length; i++) {
      if(persons[i].name.includes(newName)){
        exists = true;
      }
    }

    if(exists === true){
      alert(`${newName} is already added to phonebook`)
    }else{
      const personObject = {
        name:newName,
        number:newPhone
      }
  
      setPersons(persons.concat(personObject))

    }
    setNewName('') //Siempre reseteamos el input
    setNewphone('') //Siempre reseteamos el input
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
      <Content persons={phonesToShow}/>
    </div>
  )
}

export default App
