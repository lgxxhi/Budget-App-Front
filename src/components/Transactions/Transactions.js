import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Transactions() {
  let navigate = useNavigate();

  const [transactionArray, setTransactionArray] = useState([]);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let result = await axios.get("http://localhost:3001/transactions");

      setTransactionArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <table className="table caption-top container">
        <caption>
          <big>
            <strong>Transactions</strong>
          </big>
        </caption>

        <tbody>
          {transactionArray.map(({ itemName, date, amount, id }) => {
            return (
              <tr
                className="cursor-pointer"
                onClick={() => navigate(`/transactions/${id}`)}
                key={id}
              >
                <td>{date}</td>
                <td>{itemName}</td>
                <td></td>
                <td>{amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
