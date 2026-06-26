function Summary({ transactions, budget, setBudget }) {
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

  const now = new Date()
  const currentMonthExpenses = transactions
    .filter(t => {
      const d = new Date(t.date)
      return (
        t.amount < 0 &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      )
    })
    .reduce((sum, t) => sum + t.amount, 0)

  const spentSoFar = Math.abs(currentMonthExpenses)
 
  const daysElapsed = now.getDate()
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const projectedSpending = daysElapsed > 0
    ? (spentSoFar / daysElapsed) * daysInMonth
    : 0

  const hasBudget = budget > 0
  const percentUsed = hasBudget ? (spentSoFar / budget) * 100 : 0

  let warningLevel = 'ok'
  if (hasBudget) {
    if (percentUsed >= 100) warningLevel = 'over'
    else if (percentUsed >= 80) warningLevel = 'warning'
  }

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
            {category}: ${Math.abs(total).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>This Month</h3>
      <p>Spent so far: ${spentSoFar.toFixed(2)}</p>
      <p>Projected by month end: ${projectedSpending.toFixed(2)}</p>

      <h3>Monthly Budget</h3>
      <label>
        Set budget: $
        <input
          type="number"
          min="0"
          step="0.01"
          value={budget || ''}
          onChange={e => setBudget(parseFloat(e.target.value) || 0)}
        />
      </label>

      {hasBudget && (
        <p style={{
          color: warningLevel === 'over' ? 'red' : warningLevel === 'warning' ? 'orange' : 'green'
        }}>
          {warningLevel === 'over' && `Over budget! Spent ${percentUsed.toFixed(0)}% of $${budget.toFixed(2)}.`}
          {warningLevel === 'warning' && `Warning: ${percentUsed.toFixed(0)}% of your $${budget.toFixed(2)} budget used.`}
          {warningLevel === 'ok' && `${percentUsed.toFixed(0)}% of your $${budget.toFixed(2)} budget used.`}
        </p>
      )}
    </div>
  )
} 

export default Summary