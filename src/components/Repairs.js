import React from "react"
import { CustomerList } from "./customers/CustomerList.js"
import { EmployeeList } from "./employees/EmployeeList.js"
import { TicketList } from "./serviceTickets/ticketList.js"

export const Repairs = () => {
    return (

        <>

            <h2>Customer List</h2>
            <CustomerList />
             
             <h2>Employee List</h2>
             <EmployeeList />

             <h2>Service Tickets</h2>
             <TicketList />
        </>
    )
}