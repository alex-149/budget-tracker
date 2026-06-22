import { useState, useEffect } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import ImportCSV from './components/ImportCSV'
 
const STORAGE_KEY = 'budget-tracker-transactions'
 
function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (err) {
    console.error('Failed to load transactions from localStorage:', err)
    return []
  }
}
 
function App() {
  const [transactions, setTransactions] = useState(loadTransactions)
 
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch (err) {
      console.error('Failed to save transactions to localStorage:', err)
    }
  }, [transactions])
 
  function handleAdd(transaction) {
    setTransactions([...transactions, transaction])
  }
 
  function handleDelete(id) {
    setTransactions(transactions.filter(t => t.id !== id))
  }
 
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