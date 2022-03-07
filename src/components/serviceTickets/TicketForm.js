import React, { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//This component produces the ticket form

export const TicketForm = () => {
    //Define state variable
    const [ticket, updateTicket] = useState({
        //Create intial values for each service ticket object
        description: "",
        emergency: false
    });

    const history = useHistory()

    //Function to use the state variable to create an object to post to the API
    const saveTicket = (event) => {
        //Prevent default behavior of the browser, which is to submit the form
        //This allows us to see the POST in our Network tab of the debugger
        event.preventDefault()
        //Define variable to store new ticket object
        const newTicket = {
            description: ticket.description,
            emergency: ticket.emergency,
            //The customer's ID is being stored in localStorage, NOT our API
            //By default, this is a string, so the integer must be parsed
            customerId: parseInt(localStorage.getItem("honey_customer")),
            //JSON server will delete an ENTIRE object if there is an invalid foreign key 
            //(such as 0, or any other key that doesn't exist)
            employeeId: 1,
            dateCompleted: ""
        }

        //Define variable to send object to API
        const fetchOption = {
            //Sending an object = POST - create new
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            //Send body of service ticket request - This must be a string for JSON 
            body: JSON.stringify(newTicket)
        }

        //Write fetch call and pass in fetchOption
        //When this operation has completed and something new has been added to the API,
        // we want to send the user back to the list of service tickets.
        return fetch("http://localhost:8088/serviceTickets", fetchOption)
            .then(response => response.json())
            .then(() => {
                //Use history mechanism from react-router-dom
                //This allows us to push to our browser history (this looks like an array method, but is not)
                //When this triggers, the user will be redirected to the service tickets page
                history.push("/serviceTickets")
            })
    }

    return (
        // The data the user enters will be transient state until the button is clicked and it will be sent to the API
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        //Create an event listner for when state changes
                        onChange={
                            //Capture event passed to us as an argument by the browser
                            (event) => {
                                //Since you cannot directly modify state in React, 
                                //you must first copy the existing state.
                                //Use object spread operator to copy of the current state
                                //The copy variable will be a brand new object with all of the values
                                //copied from state
                                const copy = {...ticket}
                                //Modify the copy and update the description to user input
                                copy.description = event.target.value
                                //Make the copy the new state via updateTicket() function
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        onChange={
                            (event) => {
                                //Since you cannot directly modify state in React, 
                                //you must first copy the existing state.
                                //Use object spread operator to copy of the current state
                                //The copy variable will be a brand new object with all of the values
                                //copied from state
                                const copy = {...ticket}
                                //Modify the copy and update the emegency key/value to 
                                //whether or not the user checked it
                                copy.emergency = event.target.checked
                                //Make the copy the new state via updateTicket() function
                                updateTicket(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveTicket}>
                Submit Ticket
            </button>
        </form>
    )
}