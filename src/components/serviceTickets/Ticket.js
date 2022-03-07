import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

//The purpose of this module is to display information regarding the ticket
//that the user has clicked on in ticketList

export const Ticket = () => {
    const [ticket, assignTicket] = useState({})  // State variable for current ticket object
    const [employees, syncEmployees] = useState([])  // State variable for array of employees
    //useParams returns an object of key/value pairs of URL parameters. 
    //Use it to access match.params of the current <Route>.
    const { ticketId } = useParams()  // Variable storing the route parameter
    const history = useHistory()


    // Fetch the individual ticket when the parameter value changes
    useEffect(
        () => {
            // get the individual ticket and corresponding data from the API
            // expand customer and employee so we can access all the data needed to display
            return fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
                //Convert JSON encoded string into Javascript
                .then(response => response.json())
                //Send the fetched data to setTicket() function
                .then((data) => {
                    assignTicket(data)
                })

        },
        [ ticketId ]  // Above function runs when the value of ticketId change
    )

    // Fetch all employees
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees`)
                //Convert JSON encoded string into Javascript
                .then(res => res.json())
                //Send the fetched data to syncEmployees() function
                .then(syncEmployees)
        },
        []  // Empty dependency array only reacts to JSX initial rendering
    )

    // Function to invoke when an employee is chosen from <select> element
    const assignEmployee = (event) => {

        // Construct a new object to replace the existing one in the API
        const updatedTicket = {
            //Do not add a primary id, since JSON will assign one automatically
            customerId: ticket.customerId,
            employeeId: parseInt(event.target.value),
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ticket.dateCompleted
        }

        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            //PUT method - insert/replace
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            //Send body of service ticket request - This must be a string for JSON 
            body: JSON.stringify(updatedTicket)
        })
            .then(() => {
                history.push("/serviceTickets")
            })
    }

    return (
        <>
            <section className="ticket">
                <h3 className="ticket__description">{ticket.description}</h3>
                <div className="ticket__customer">Submitted by {ticket.customer?.name}</div>
                <div className="ticket__employee">Assigned to
                {/* Add dropdown menu with options of employees to assign to a ticket  */}
                    <select
                        value={ ticket.employeeId }
                        onChange={ assignEmployee }>
                        {/* Optional chaining - place ? before each property
                            ONLY if the customer exists, display the name property 
                            - this is necessary since the initial state is an empty object*/}
                        {
                            employees.map(
                                employee => 
                                // When user selects an employee, a brand new object will be created for the ticket
                                // this new object will have the id of the selected employee
                                <option key={`employee--${employee.id}`} value={employee.id}>{employee.name}</option>)
                        }
                    </select>
                </div>
            </section>
        </>
    )
}