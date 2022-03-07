import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Tickets.css" 
export const TicketList = () => {
    //When you invoke useState, it returns an array
    //Variable on left captures initial value of state
    //Variable on right holds function whose job it is to modify state
    const [tickets, updateTickets] = useState([])
    const history = useHistory()

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes. - It's an event listener.
    //useEffect hook always takes in a function, and an array
    useEffect(
        () => {
            //Get data from API to pull into application state of tickets
            //Expanding allows us to access the customer data via the service ticket
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                //Convert JSON encoded string into Javascript
                .then(res => res.json())
                //Invoke updateTickets() to set value of tickets
                .then((data) => {
                    updateTickets(data)
                })
        },
        //This array isn't watching any state - it runs when the component is rendered, and never again
        []
    )

    return (
        <>
        <div>
            {/* Create a new button to allow user to get to create a new ticket
            Use history mechanism from react-router-dom
            This allows us to change the browser URL to create tickets 
            ??????????????????????????????????????????????????????????*/}
            <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
        </div>
            {
                tickets.map(
                    (ticket) => {
                        //React NEEDS a new key attribute with a unique value on each element
                        //  - uses the key attribute to do its internal rendering of the DOM to know which element is which 
                        return <div className={`${ticket.emergency ? 'emergency' : ""}`} key={`ticket--${ticket.id}`}>
                                    <p >
                                        {ticket.emergency ? "🚑" : ""} {ticket.description} submitted by {ticket.customer.name} and worked on by {ticket.employee.name}
                                    </p>                        
                                </div>
                    }
                )
            }
        </>
    )
}