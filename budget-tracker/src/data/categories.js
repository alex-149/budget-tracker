export const CATEGORIES = [
  { name: 'Food' },
  { name: 'Transport' },
  { name: 'Entertainment' },
  { name: 'Shopping' },
  { name: 'Bills' },
  { name: 'Income' },
  { name: 'Other' },
]

export function categorise(description) {
  const d = description.toLowerCase()
  if (d.includes('uber') || d.includes('bus') || d.includes('petrol')) return 'Transport'
  if (d.includes('countdown') || d.includes('pak n save') || d.includes('food')) return 'Food'
  if (d.includes('netflix') || d.includes('spotify') || d.includes('cinema')) return 'Entertainment'
  if (d.includes('power') || d.includes('internet') || d.includes('rent')) return 'Bills'
  if (d.includes('salary') || d.includes('wage') || d.includes('pay') || d.includes('income')) return 'Income'
  return 'Other'
}
