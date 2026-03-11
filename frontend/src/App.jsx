import { useState } from "react";
import "./App.css";

function App() {
  const [description, setDescription] = useState(null);
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState("");
  const [submittedTransaction, setSubmittedTransaction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      setError("Please enter a transaction description.");
      return;
    }

    if (amount === null || Number.isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    const transaction = {
      description,
      amount,
    };

    try {
      const response = await fetch("/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.message || "Request failed.");
        return;
      }

      setSubmittedTransaction(data.transaction);
      setError("");
    } catch {
      setError("Could not connect to backend.");
    }
  };

  return (
    <main className="container">
      <h1>Transaction Form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="description">Transaction Description</label>
        <input
          id="description"
          type="text"
          value={description ?? ""}
          onChange={(e) =>
            setDescription(e.target.value.trim() === "" ? null : e.target.value)
          }
        />

        <label htmlFor="amount">Transaction Amount</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setAmount(value === "" ? null : Number(value));
          }}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>
      </form>

      {submittedTransaction && (
        <section className="result">
          <h2>Transaction details</h2>
          <p>
            <strong>Description:</strong> {submittedTransaction.description}
          </p>
          <p>
            <strong>Amount:</strong> {submittedTransaction.amount}
          </p>
        </section>
      )}
    </main>
  );
}

export default App;
