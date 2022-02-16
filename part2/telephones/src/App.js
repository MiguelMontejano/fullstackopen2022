import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  //estados
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewphone ] = useState('')
  const [ nameSearched, setNameSearched] = useState('')
  const [ showAll, setshowAll] = useState(true)

  //controladores de eventos
  useEffect(() => {
      console.log("effect");
      axios
        .get("http://localhost:3001/persons")
        .then(response => {
          console.log("promise fullfilled");
          setPersons(response.data)
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
    for (let i = 0; i < persons.length; i++) {
      console.log(persons[i].name);
      if(persons[i].name.toLowerCase() === newName.toLowerCase()){ //You cant add 2 equal names but you can add
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
