import { useState } from 'react'
import { CATEGORIES, categorise } from '../data/categories'

function TransactionForm({ onSubmit, existing }) {
  const [date, setDate] = useState(existing?.date || '')
  const [description, setDescription] = useState(existing?.description || '')
  const [amount, setAmount] = useState(existing?.amount || '')
  const [category, setCategory] = useState(existing?.category || '')

  function handleSubmit(e) {
    e.preventDefault()
    const parsedAmount = parseFloat(amount)
    if (!date || !description || isNaN(parsedAmount)) return

    const transaction = {
      id: existing?.id || crypto.randomUUID(),
      date,
      description,
      amount: parsedAmount,
      category: category || categorise(description),
    }

    onSubmit(transaction)
    if (!existing) {
      setDate('')
      setDescription('')
      setAmount('')
      setCategory('')
    }
  }

  return (
    <div>
      <h2>{existing ? 'Edit Transaction' : 'Add Transaction'}</h2>
      <div className="form-row">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (negative for expense)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          step="0.01"
          required
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Auto-detect category</option>
          {CATEGORIES.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>{existing ? 'Save Changes' : 'Add'}</button>
      </div>
    </div>
  )
}

export default TransactionForm