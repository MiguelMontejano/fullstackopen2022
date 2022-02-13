import React from "react";

const Add = ({parts}) => {
    const total = parts.reduce((suma, part) => suma + part.exercises, 0) //0 is the initial value of suma
    return(
        <p>Total of {total} exercises</p>
    )

}

export default Add