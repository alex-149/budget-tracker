function Summary({ transactions }) {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = income + expenses

  const categoryTotals = transactions.reduce((totals, t) => {
    if (!totals[t.category]) {
      totals[t.category] = 0
    }
    totals[t.category] += t.amount
    return totals
  }, {})  

  return (
    <div>
      <h2>Summary</h2>
      <p>Balance: ${balance.toFixed(2)}</p>
      <p>Income: ${income.toFixed(2)}</p>
      <p>Expenses: ${Math.abs(expenses).toFixed(2)}</p>
      <h3>Category Totals</h3>
      <ul>
        {Object.entries(categoryTotals).map(([category, total]) => (
          <li key={category}>
            {category}: ${total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Summary