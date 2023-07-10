import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditTransaction() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [itemNameState, setItemNameState] = useState("");
  const [amountState, setAmountState] = useState(0);
  const [dateState, setDateState] = useState("");
  const [fromState, setFromState] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [transactionType, setTransactionType] = useState(-1);

  useEffect(() => {
    handleFetch();
  }, []);

  async function handleFetch() {
    try {
      let result = await axios.get(`http://localhost:3001/transactions/${id}`);

      console.log(result.data);

      const { itemName, amount, date, from, category } = result.data;

      setAmountState(amount);
      setDateState(date);
      setFromState(from);
      setItemNameState(itemName);
      setCategoryState(category);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      let result = await axios.put(`http://localhost:3001/transactions/${id}`, {
        itemName: itemNameState,
        amount: Number(amountState) * transactionType,
        from: fromState,
        date: dateState,
        category: categoryState,
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
        <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            onClick={() => setTransactionType(1)}
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio1"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="btnradio1">
            Income
          </label>

          <input
            onClick={() => setTransactionType(-1)}
            type="radio"
            class="btn-check"
            name="btnradio"
            id="btnradio3"
            autocomplete="off"
          />
          <label class="btn btn-outline-danger" for="btnradio3">
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
          />
        </div>{" "}
        <div>
          <label>Amount:</label>
          <br />
          <input
            type="number"
            step={".01"}
            min={0}
            value={amountState}
            onChange={(e) => setAmountState(e.target.value)}
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
          <label>Category:</label>
          <br />
          <select
            value={categoryState}
            onChange={(e) => setCategoryState(e.target.value)}
          >
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
        <button className="mt-3">Submit</button>
      </form>
    </div>
  );
}

export default EditTransaction;
