import type { ScheduledTask, Weekday } from '../types'

export function hasEmployeeConflict(
  schedule: ScheduledTask[],
  employeeId: number,
  day: Weekday,
  weekStart: string
): boolean {
  return schedule.some(
    (item) =>
      item.employeeId === employeeId &&
      item.day === day &&
      item.weekStart === weekStart
  )
}

export function isTaskFull(
  schedule: ScheduledTask[],
  taskId: number,
  maxEmployees: number,
  day: Weekday,
  weekStart: string
): boolean {
  const assignedEmployees = schedule.filter(
    (item) =>
      item.taskId === taskId &&
      item.day === day &&
      item.weekStart === weekStart
  )

  return assignedEmployees.length >= maxEmployees
}