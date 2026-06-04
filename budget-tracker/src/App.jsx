import { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import ImportCSV from './components/ImportCSV'

function App() {
  const [transactions, setTransactions] = useState([])

  function handleAdd(transaction) {
    setTransactions([...transactions, transaction])
  }

  function handleDelete(id) {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const [transactions, setTransactions] = useState([]);

  const handleImport = (newTx) => {
    setTransactions(prev => [...prev, ...newTx]);
  };

  return (
    <div>
      <h1>Budget Tracker</h1>
      <Summary transactions={transactions} />
      <TransactionForm onSubmit={handleAdd} />
      <ImportCSV onImport={handleImport} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
    </div>
  )
}

export default App