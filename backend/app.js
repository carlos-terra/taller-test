import express from "express";

const app = express();
const transactions = [];

app.use(express.json());

app.post("/transactions", (req, res) => {
  const { amount, description } = req.body ?? {};

  const validDescription = String(description ?? "").trim();
  const validAmount = Number(amount);
  const isValidAmount =
    Number.isFinite(validAmount) &&
    validAmount > 0 &&
    /^\d+(\.\d{1,2})?$/.test(String(amount));

  // Server-side validation prevents invalid direct calls to this endpoint.
  if (!validDescription) {
    return res.status(400).json({
      message: "Transaction description is required.",
    });
  }

  if (!isValidAmount) {
    return res.status(400).json({
      message:
        "Transaction amount must be greater than zero with up to 2 decimal places.",
    });
  }

  const transactionAlreadyExists = transactions.some(
    (transaction) =>
      transaction.description.toLowerCase() === validDescription.toLowerCase(),
  );

  if (transactionAlreadyExists) {
    return res.status(409).json({ message: "Transaction already exists." });
  }

  const transaction = {
    id: transactions.length + 1,
    amount: validAmount,
    description: validDescription,
    createdAt: new Date().toISOString(),
  };

  transactions.push(transaction);
  return res.status(201).json({
    message: "Transaction created successfully.",
    transaction,
  });
});

app.get("/transactions", (_req, res) => {
  res.json(transactions);
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON body." });
  }

  return res.status(500).json({ message: "Internal server error." });
});

export { app, transactions };
