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

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      let result = await axios.post(`http://localhost:3001/transactions/`, {
        id: uuidv4(),
        itemName: itemNameState,
        amount: Number(amountState),
        from: fromState,
        date: dateState,
      });

      console.log(result);

      setItemNameState("");
      setAmountState(0);
      setDateState("");
      setFromState("");

      navigate("/transactions");
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
        <div>
          <label>Date</label>
          <br />
          <input
            type="date"
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
            required
          />
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

        <button>Create New Item</button>
      </form>
    </div>
  );
}

export default AddTransaction;
