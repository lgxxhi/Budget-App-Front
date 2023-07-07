import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ShowTransaction() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [transactionArray, setTransactionArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let result = await axios.get(`http://localhost:3001/transactions/${id}`);

      setTransactionArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteById(id) {
    try {
      let result = await axios.delete(
        `http://localhost:3001/transactions/${id}`
      );

      setTransactionArray(result.data);

      navigate("/transactions");
    } catch (e) {
      console.log(e.response);
    }
  }

  function handleEdit(id) {
    navigate(`/transactions/edit-transaction/${id}`);
  }

  return (
    <div>
      <div>
        <h1>Show</h1>
      </div>
      <div className="card mb-3 container">
        <div className="card-body">
          <h2 className="card-title">
            {transactionArray.itemName} - {transactionArray.from}
          </h2>
          <h5>{transactionArray.amount}</h5>
          <p className="card-text">
            <small>
              <strong>Days since last crisis: </strong>
              {transactionArray.date}
            </small>
          </p>
        </div>
      </div>
      <div className="text-center ">
        <button onClick={() => navigate("/transactions")}>Back</button>
        <button className="mx-5" onClick={() => handleEdit(id)}>
          Edit
        </button>
        <button onClick={() => handleDeleteById(id)}>Delete</button>
      </div>
    </div>
  );
}

export default ShowTransaction;
