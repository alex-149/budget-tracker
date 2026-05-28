function Summary({ transactions }) {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income + expenses

  return (
    <div>
      <h2>Summary</h2>
      <p>Balance: ${balance.toFixed(2)}</p>
      <p>Income: ${income.toFixed(2)}</p>
      <p>Expenses: ${Math.abs(expenses).toFixed(2)}</p>
    </div>
  )
}

export default Summary