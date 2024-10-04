export default function Dashboard_Records({ customers }){

    const displayCustomers = customers && customers.map((customer, i) => {
        const { customer_name, loan_amount, interest_rate, start_date, due_date, reason } = customer

        const start_date_str = new Date(start_date).toDateString()
        const due_date_str = new Date(due_date).toDateString()

        return (
            <tr
                key={i}
            >
                <th scope="row">{i+1}</th>
                <td className="txt-000 txt-15 font-family-workSans fw-500">{customer_name}</td>
                <td className="txt-000 txt-15 font-family-workSans fw-500">{loan_amount}</td>
                <td className="txt-000 txt-15 font-family-workSans fw-500">{interest_rate}</td>
                <td className="txt-000 txt-15 font-family-workSans fw-500">{start_date_str}</td>
                <td className="txt-000 txt-15 font-family-workSans fw-500">{due_date_str}</td>
                <td className="txt-000 txt-15 font-family-workSans fw-500">{reason}</td>
            </tr>
        )
    })

    return (
        <div className="">
            <div class="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">#</th>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">Full Name</th>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">Loan Amount</th>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">Interest Rate {'(%)'}</th>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">Start date</th>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">Due date</th>
                            <th className="txt-000 txt-17 font-family-workSans fw-600" scope="col">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        { displayCustomers }
                    </tbody>
                </table>              
            </div>
        </div>
    )
}