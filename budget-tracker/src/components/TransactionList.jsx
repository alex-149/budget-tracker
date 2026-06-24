function TransactionList({ transactions, onDelete, onEdit }) {
  if (transactions.length === 0) {
    return <p>No transactions yet.</p>
  }

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.map(t => (
        <div key={t.id}>
          <span>{t.date}</span>
          <span>{t.description}</span>
          <span>{t.category}</span>
          <span>${t.amount.toFixed(2)}</span>
          <button onClick={() => onEdit(t.id)}>Edit</button>
          <button onClick={() => onDelete(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default TransactionList