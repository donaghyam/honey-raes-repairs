import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

//The purpose of this module is to display information regarding the employee
//that the user has clicked on in employeeList

export const Employee = () => {
    const [employee, setEmployee] = useState({})  // State variable for current employee object
    //useParams returns an object of key/value pairs of URL parameters. 
    //Use it to access match.params of the current <Route>.
    const { employeeId } = useParams()  // Variable storing the route parameter

    useEffect(
        () => {
            // get the individual employee and corresponding data from the API
            fetch(`http://localhost:8088/employees/${employeeId}`)
                //Convert JSON encoded string into Javascript
                .then(res => res.json())
                //Send the fetched data to setEmployee() function
                .then((data) => {
                    setEmployee(data)
                })
        },
        [ employeeId ]  // Above function runs when the value of employeeId change
    )

    return (
        <>
            <section className="employee">
                <h3 className="employee__name">{employee.name}</h3>
                <div className="employee__specialty">Specialty: {employee.specialty}</div>
            </section>
        </>
    )
}