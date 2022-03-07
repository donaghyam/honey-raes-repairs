import React from "react"
import { Route } from "react-router-dom"
import { CustomerList } from "./customers/CustomerList"
import { EmployeeForm } from "./employees/EmployeeForm"
import { EmployeeList } from "./employees/EmployeeList"
import { TicketForm } from "./serviceTickets/TicketForm"
import { TicketList } from "./serviceTickets/ticketList"

//The purpose of this component is to set up the individual routes, and which component should be displayed
//when a particular browser route has been changed in the URL

//ApplicationViews will be listening for the change event from when the URL was changed in NavBar

export const ApplicationViews = () => {
    return (
        <>
            {/* These routes are listening for the event from NavBar */}
            <Route path="/customers">
                {/* When the URL changes to /customers, display CustomerList component to the user */}
                <CustomerList />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/hire">
                <EmployeeForm />
            </Route>
            <Route path="/serviceTickets">
                <TicketList />
            </Route>
            <Route exact path="/tickets/create">
                <TicketForm />
            </Route>
        </>
    )
}

//Application views will be implemented in Repairs.js