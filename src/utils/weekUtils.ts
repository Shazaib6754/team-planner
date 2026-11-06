export function getMondayDateString(date: Date = new Date()): string {
  const monday = new Date(date)

  const day = monday.getDay()
  const difference = day === 0 ? -6 : 1 - day

  monday.setDate(monday.getDate() + difference)

  const year = monday.getFullYear()
  const month = String(monday.getMonth() + 1).padStart(2, '0')
  const dayOfMonth = String(monday.getDate()).padStart(2, '0')

  return `${year}-${month}-${dayOfMonth}`
}

export function changeWeek(
  weekStart: string,
  amount: number
): string {
  const [year, month, day] = weekStart.split('-').map(Number)

  const date = new Date(year, month - 1, day)

  date.setDate(date.getDate() + amount * 7)

  const newYear = date.getFullYear()
  const newMonth = String(date.getMonth() + 1).padStart(2, '0')
  const newDay = String(date.getDate()).padStart(2, '0')

  return `${newYear}-${newMonth}-${newDay}`
}