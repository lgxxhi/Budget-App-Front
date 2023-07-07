import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/transactions"}>Transactions</Link>
        </li>
        <li>
          <Link to={"/transactions/new-transaction"}>New Transaction</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
