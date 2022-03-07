import React, { useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"

//The purpose of this component is to display the list of employees

export const EmployeeList = () => {
    //employees variable holds initial state
    //changeEmployee() is a function to modify said state
    const [employees, changeEmployee] = useState([])
    const [specialties, setSpecial] = useState("")
    const history = useHistory() //-????????????????????????????????????????????????????

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //Get data from API to pull into application state of employees
            fetch("http://localhost:8088/employees")
                //Convert JSON encoded string into Javascript
                .then(res => res.json())
                //Invoke changeEmployee() to set value of employees
                .then((data) => {
                    changeEmployee(data)
                })
        },
        []
    )

    //This hook will watch when employee state changes, then display employee specialties
    useEffect(() => {
                //Define variable to store new array of employee specialites
                //Use .map() method to create new array 
                const justSpecialities = employees.map(emp => emp.specialty)
                //Invoke setSpecial() to update state of specialties
                setSpecial(justSpecialities.join(", "))
            }, 
            //The above function will run when the employees state changes
            [employees]) 

    return (
        <>
            <div>
                <button onClick={() => history.push("/employees/hire")}>Enter New Employee</button>
            </div>
            <div>
                Specialties: { specialties }
            </div>
            {
                employees.map(
                    (employee) => {
                        return <p key={`employee--${employee.id}`}>
                                {/* Create link to access selected employee details */}
                                    <Link to={`/employees/${employee.id}`}>
                                        {employee.name}
                                    </Link>
                                </p>
                    }
                )
            }
        </>
    )
}