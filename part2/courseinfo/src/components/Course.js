import React from 'react'
import Content from './Content'
import Header from './Header'
import Add from './Add'

const Course = ({courses}) => {
    return(
        <div>
        <h1>Web development Curriculum</h1>
        {courses.map(course => 
            <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Add parts={course.parts} />
            </div>
            )}
        </div>


    )
}

export default Course