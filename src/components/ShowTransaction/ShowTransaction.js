import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function ShowTransaction() {
  const { id } = useParams();
  let navigate = useNavigate();

  const [transactionArray, setTransactionArray] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let result = await axios.get(
        `https://budget-backend-mafr.onrender.com/transactions/${id}`
      );

      setTransactionArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleDeleteById(id) {
    try {
      let result = await axios.delete(
        `https://budget-backend-mafr.onrender.com/transactions/${id}`
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
    <div className="container">
      <h2 className="my-3">Transaction Details</h2>

      <div className="card text-center mb-3">
        <div className="card-body">
          <h3 className="card-title">{transactionArray.itemName}</h3>
          <p className="card-text">${transactionArray.amount}</p>
          <p className="card-text">
            <strong>{transactionArray.from}</strong>
          </p>
          <p className="card-text">
            <strong>Transaction Date: </strong>
            {moment(transactionArray.date).format("LL")}{" "}
          </p>
          <p>
            <strong>Category: </strong>
            {transactionArray.category}
          </p>

          <button
            onClick={() => navigate("/transactions")}
            className="btn btn-outline-dark"
          >
            Back
          </button>
          <button
            onClick={() => handleEdit(id)}
            className="btn btn-outline-dark mx-3"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteById(id)}
            className="btn btn-outline-dark"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowTransaction;
