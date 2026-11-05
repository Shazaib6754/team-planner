
export type Employee = {
  id: number
  name: string
  role: string
}

export type Task = {
  id: number
  title: string
  description: string
  duration: number
}

export type Weekday =
  | 'Maandag'
  | 'Dinsdag'
  | 'Woensdag'
  | 'Donderdag'
  | 'Vrijdag'

export type ScheduledTask = {
  id: number
  taskId: number
  employeeId: number
  day: Weekday
}
