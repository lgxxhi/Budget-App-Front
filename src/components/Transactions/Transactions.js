import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function Transactions() {
  let navigate = useNavigate();

  const [transactionArray, setTransactionArray] = useState([]);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    try {
      let result = await axios.get("http://localhost:3001/transactions");
      for (let i of result.data) {
        setTotal((total += i.amount));
      }

      setTransactionArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleColor(amount) {
    if (amount <= 0) {
      return "text-danger";
    } else {
      return "text-primary";
    }
  }

  function handleTotalColor(total) {
    if (total < 0) {
      return "text-danger";
    } else if (total <= 100) {
      return "text-warning";
    } else {
      return "text-success";
    }
  }

  return (
    <div>
      <div>
        <h2>
          Bank Account Total:{" "}
          <span className={handleTotalColor(total)}>{total}</span>
        </h2>
      </div>
      <table className="table caption-top container">
        <tbody>
          {transactionArray.map(({ itemName, date, amount, id }) => {
            return (
              <tr
                className="cursor-pointer"
                onClick={() => navigate(`/transactions/${id}`)}
                key={id}
              >
                <td>{moment(date).format("LL")}</td>
                <td>{itemName}</td>
                <td></td>
                <td>
                  <span className={handleColor(amount)}>{amount}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
