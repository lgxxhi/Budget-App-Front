import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { v4: uuidv4 } = require("uuid");

function AddTransaction() {
  let navigate = useNavigate();

  const [itemNameState, setItemNameState] = useState("");
  const [amountState, setAmountState] = useState(0);
  const [dateState, setDateState] = useState("");
  const [fromState, setFromState] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [transactionType, setTransactionType] = useState(-1);

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      let result = await axios.post(
        `https://budget-backend-mafr.onrender.com/transactions/`,
        {
          id: uuidv4(),
          itemName: itemNameState,
          amount: Number(amountState) * transactionType,
          from: fromState,
          date: dateState,
          category: categoryState,
        }
      );

      // console.log(result);

      setItemNameState("");
      setAmountState(0);
      setDateState("");
      setFromState("");

      navigate(`/transactions/${result.data[result.data.length - 1].id}`);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="mx-3">
      <div>
        <h1>Add a new item</h1>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div
          className="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            onClick={() => setTransactionType(1)}
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            autoComplete="off"
          />
          <label className="btn btn-outline-primary" htmlFor="btnradio1">
            Income
          </label>

          <input
            onClick={() => setTransactionType(-1)}
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            autoComplete="off"
          />
          <label className="btn btn-outline-danger" htmlFor="btnradio3">
            Expense
          </label>
        </div>

        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={itemNameState}
            onChange={(e) => setItemNameState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <br />
          <input
            type="number"
            step={".01"}
            min={0}
            value={amountState}
            onChange={(e) => setAmountState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>From:</label>
          <br />
          <input
            type="text"
            value={fromState}
            onChange={(e) => setFromState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <br />
          <input
            type="date"
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <br />
          <select onChange={(e) => setCategoryState(e.target.value)}>
            <option value=""></option>
            <option value="Income">Income</option>
            <option value="Groceries">Groceries</option>
            <option value="Food">Food</option>
            <option value="Pets">Pets</option>
            <option value="Medical">Medical</option>
            <option value="Recreation">Recreation</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button className="mt-3 btn btn-outline-dark">Create New Item</button>
      </form>
    </div>
  );
}

export default AddTransaction;
