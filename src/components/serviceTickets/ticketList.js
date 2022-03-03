import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import "./Tickets.css" 
export const TicketList = () => {
    const [tickets, updateTickets] = useState([])
    const history = useHistory()

    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                .then(res => res.json())
                .then((data) => {
                    updateTickets(data)
                })
        },
        []
    )

    return (
        <>
        <div>
            <button onClick={() => history.push("/tickets/create")}>Create Ticket</button>
        </div>
            {
                tickets.map(
                    (ticket) => {
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