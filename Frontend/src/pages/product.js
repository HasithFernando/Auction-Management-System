import React from "react";


const product = () => {
    return(
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-6">
                
                <img src="https://via.placeholder.com/400" alt="Product Image" className="img-fluid rounded"/>
            </div>
            <div className="col-md-6">

                <h1 className="display-5">Antique Vase</h1>
                <p className="text-muted">by <strong>John Doe</strong></p>
                <p className="lead">An exquisite antique vase from the 18th century. A fine piece of history, perfect for collectors and antique enthusiasts.</p>

                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Start Bid:</strong> $100.00
                    </li>
                    <li className="list-group-item">
                        <strong>Start Time:</strong> 2024-10-07 09:00:00
                    </li>
                    <li className="list-group-item">
                        <strong>End Time:</strong> 2024-10-10 18:00:00
                    </li>
                </ul>

  
                <div className="mt-4">
                    <form>
                        <div className="mb-3">
                            <label for="bidAmount" className="form-label">Your Bid</label>
                            <input type="number" className="form-control" id="bidAmount" placeholder="Enter your bid" min="100" step="0.01"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Place Bid</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    )

}

export default product;