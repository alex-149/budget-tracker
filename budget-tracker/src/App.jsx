import { useState, useEffect } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Summary from './components/Summary'
import ImportCSV from './components/ImportCSV'
 
const STORAGE_KEY = 'budget-tracker-transactions'
const BUDGET_STORAGE_KEY = 'budget-tracker-budget'
 
function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (err) {
    console.error('Failed to load transactions from localStorage:', err)
    return []
  }
}
 
function loadBudget() {
  try {
    const saved = localStorage.getItem(BUDGET_STORAGE_KEY)
    const parsed = saved ? Number(saved) : 0
    return isNaN(parsed) ? 0 : parsed
  } catch (err) {
    console.error('Failed to load budget from localStorage:', err)
    return 0
  }
}
 
function App() {
  const [transactions, setTransactions] = useState(loadTransactions)
  const [editingId, setEditingId] = useState(null)
  const [budget, setBudget] = useState(loadBudget)
 
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch (err) {
      console.error('Failed to save transactions to localStorage:', err)
    }
  }, [transactions])
 
  useEffect(() => {
    try {
      localStorage.setItem(BUDGET_STORAGE_KEY, String(budget))
    } catch (err) {
      console.error('Failed to save budget to localStorage:', err)
    }
  }, [budget])
 
  function handleAdd(transaction) {
    setTransactions([...transactions, transaction])
  }
 
  function handleDelete(id) {
    setTransactions(transactions.filter(t => t.id !== id))
    if (id === editingId) {
      setEditingId(null)
    }
  }
 
  const handleImport = (newTx) => {
    setTransactions(prev => [...prev, ...newTx]);
  };
 
  function handleEdit(id) {
    setEditingId(id)
  }
 
  function handleCancelEdit() {
    setEditingId(null)
  }
 
  function handleSubmit(transaction) {
    if (editingId) {
      setTransactions(transactions.map(t =>
        t.id === editingId ? { ...transaction, id: editingId } : t
      ))
      setEditingId(null)
    } else {
      handleAdd(transaction)
    }
  }
 
  const editingTransaction = transactions.find(t => t.id === editingId)
 
  return (
    <div>
      <h1>Budget Tracker</h1>
      <Summary transactions={transactions} budget={budget} setBudget={setBudget} />
      <TransactionForm
        key={editingId || 'new'}
        onSubmit={handleSubmit}
        existing={editingTransaction}
        onCancel={handleCancelEdit}
      />
      <ImportCSV onImport={handleImport} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  )
}
 
export default App