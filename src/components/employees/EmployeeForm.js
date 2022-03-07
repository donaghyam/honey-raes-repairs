import React, { useState } from "react"
import { useHistory } from "react-router-dom";

export const EmployeeForm = () => {
    //employee variable holds initial state
    //updateEmployee() is a function to modify said state
    const [employee, updateEmployee] = useState({
        //Create intial values for each employee object
        name: "",
        specialty: ""
    })

    const history = useHistory()

    //Function to use the state variable to create an object to post to the API
    const saveEmployee = (event) => {
        //Prevent default behavior of the browser, which is to submit the form
        //This allows us to see the POST in our Network tab of the debugger
        event.preventDefault()
        //Define variable to store new employee object
        const newEmployee = {
            name: employee.name,
            specialty: employee.specialty
        }

    //Define variable to send object to API
    const fetchOption = {
        //Sending an object = POST
        method: "POST",
        headers: {
            "Content-Type": "application/JSON"
        },
        //Send body of employee form - This must be a string for JSON 
        body: JSON.stringify(newEmployee)
    }
    //Write fetch call and pass in fetchOption
    //When this operation has completed and something new has been added to the API,
    // we want to send the user back to the list of employees.
    return fetch("http://localhost:8088/employees", fetchOption)
        .then(response => response.json())
        .then(() => {
            //Use history mechanism from react-router-dom
            //This allows us to push to our browser history (this looks like an array method, but is not)
            //When this triggers, the user will be redirected to the employees page
            history.push("/employees")
        })
    }

    return (
        // The data the user enters will be transient state until the button is clicked and it will be sent to the API
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        //Create an event listner for when state changes
                        onChange={
                            //Capture event passed to us as an argument by the browser
                            (event) => {
                                //Since you cannot directly modify state in React, 
                                //you must first copy the existing state.
                                //Use object spread operator to copy of the current state
                                //The copy variable will be a brand new object with all of the values
                                //copied from state
                                const copy = {...employee}
                                //Modify the copy and update the name to user input
                                copy.name = event.target.value
                                //Make the copy the new state via updateEmployee() function
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        onChange={
                            (event) => {
                                //Since you cannot directly modify state in React, 
                                //you must first copy the existing state.
                                //Use object spread operator to copy of the current state
                                //The copy variable will be a brand new object with all of the values
                                //copied from state
                                const copy = {...employee}
                                //Modify the copy and update the specialty key/value to 
                                //whether or not the user checked it
                                copy.specialty = event.target.value
                                //Make the copy the new state via updateTicket() function
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveEmployee}>
                Hire employee
            </button>
        </form>
    )
}