import React from "react";
import Person from './Person'

const Content = ({persons, deletePerson}) => {
    return(
        persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson} />)
    )
}


export default Content