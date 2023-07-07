import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Transactions from "./components/Transactions/Transactions";
import ShowTransaction from "./components/ShowTransaction/ShowTransaction";
import AddTransaction from "./components/AddTransaction/AddTransaction";
import EditTransaction from "./components/EditTransaction/EditTransaction";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<ShowTransaction />} />
          <Route
            path="/transactions/new-transaction"
            element={<AddTransaction />}
          />
          <Route
            path="transactions/edit-transaction/:id"
            element={<EditTransaction />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
