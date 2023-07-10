import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar bg-body-tertiary container">
      <div className="container-fluid">
        <Link to={"/transactions"} className="navbar-brand">
          <h1>Budget App</h1>
        </Link>
        <Link to={"/transactions/new-transaction"}>
          <button className="btn btn-outline-dark">New Ttransaction</button>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
