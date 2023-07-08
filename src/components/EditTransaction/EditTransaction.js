import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { v4: uuidv4 } = require("uuid");

function EditTransaction() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [itemNameState, setItemNameState] = useState("");
  const [amountState, setAmountState] = useState(0);
  const [dateState, setDateState] = useState("");
  const [fromState, setFromState] = useState("");

  useEffect(() => {
    handleFetch();
  }, []);

  async function handleFetch() {
    try {
      let result = await axios.get(`http://localhost:3001/transactions/${id}`);

      console.log(result.data);

      const { itemName, amount, date, from } = result.data;

      setAmountState(amount);
      setDateState(date);
      setFromState(from);
      setItemNameState(itemName);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      let result = await axios.put(`http://localhost:3001/transactions/${id}`, {
        itemName: itemNameState,
        amount: Number(amountState),
        from: fromState,
        date: dateState,
      });

      alert("Updated!");

      navigate("/transactions");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="mx-3">
      <div>
        <h1>Edit</h1>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label>Item Name:</label>
          <br />
          <input
            type="text"
            value={itemNameState}
            onChange={(e) => setItemNameState(e.target.value)}
          />
        </div>

        <div>
          <label>From:</label>
          <br />
          <input
            type="text"
            value={fromState}
            onChange={(e) => setFromState(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <br />
          <input
            type="date"
            value={dateState}
            onChange={(e) => setDateState(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <br />
          <input
            type="number"
            value={amountState}
            onChange={(e) => setAmountState(e.target.value)}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditTransaction;
