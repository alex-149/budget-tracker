import { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'

function App() {
  const [transactions, setTransactions] = useState([])

  function handleAdd(transaction) {
    setTransactions([...transactions, transaction])
  }

  function handleDelete(id) {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  return (
    <div>
      <h1>Budget Tracker</h1>
      <Summary transactions={transactions} />
      <TransactionForm onSubmit={handleAdd} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  )
}

export default App