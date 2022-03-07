import React, { useEffect, useState } from "react"

//The purpose of this component is to display the list of customers

export const CustomerList = () => {
    //Customers variable holds initial state
    //setCustomers() is a function to modify said state
    const [customers, setCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState([])


    //This hook's main purpose is to observe one, or more, 
    //state variables, and then run code when that state changes.
    useEffect(
        () => {
            //Get data from API to pull into application state of tickets
            fetch("http://localhost:8088/customers")
                //Convert JSON encoded string into Javascript
                .then(res => res.json())
                //Invoke setCustomers() to set value of tickets
                .then((data) => {
                    setCustomers(data)
                })
        },
        //This array isn't watching any state - it runs when the component is rendered, and never again
        []
    )

    useEffect(
        () => {
            if (customers.length === 1) {
                updateMessage("You have 1 customer")
            }
            else {
                updateMessage(`You have ${customers.length} customers`)
            }
        },
        //The above function will run when the customers state changes
        [customers]
    )

    return (
        <>
            {/* Display customer message */}
            <div>{totalCustomerMessage}</div>
            {
                customers.slice(0,5).map(
                    (customerObject) => {
                        //React NEEDS a new key attribute with a unique value on each element
                        //  - uses the key attribute to do its internal rendering of the DOM to know which element is which 
                        return <p key={`customer--${customerObject.id}`}>{customerObject.name}</p>
                    }
                )
            }
        </>
    )
}