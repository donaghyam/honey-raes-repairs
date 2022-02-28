import { CustomerList } from "./customers/CustomerList.js"
import { EmployeeList } from "./employees/EmployeeList.js"

export const Repairs = () => {
    return (

        <>

            <h2>Customer List</h2>
            <CustomerList />
             
             <h2>Employee List</h2>
             <EmployeeList />
        </>
    )
}