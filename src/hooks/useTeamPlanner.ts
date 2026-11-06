
import { useRef, useState } from 'react'
import {
  employees as initialEmployees,
  tasks as initialTasks,
  schedule as initialSchedule,
} from '../data/mockData'
import type {
  Employee,
  Task,
  ScheduledTask,
  Weekday,
} from '../types'
import {
  hasEmployeeConflict,
  isTaskFull,
} from '../utils/scheduleRules'
import {
  getMondayDateString,
  changeWeek,
} from '../utils/weekUtils'

export function useTeamPlanner() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [scheduledTasks, setScheduledTasks] =
    useState<ScheduledTask[]>(initialSchedule)

  const scheduleRef = useRef<ScheduledTask[]>(initialSchedule)

  const [activeWeekStart, setActiveWeekStart] =
    useState<string>(getMondayDateString())

  function handlePreviousWeek() {
    setActiveWeekStart((currentWeek) => changeWeek(currentWeek, -1))
  }

  function handleNextWeek() {
    setActiveWeekStart((currentWeek) => changeWeek(currentWeek, 1))
  }

  function handleAddEmployee(name: string, role: string): boolean {
    const normalizedName = name.trim().toLowerCase()

    const employeeExists = employees.some(
      (employee) =>
        employee.name.trim().toLowerCase() === normalizedName
    )

    if (employeeExists) return false

    setEmployees((currentEmployees) => {
      const newEmployee: Employee = {
        id:
          Math.max(
            0,
            ...currentEmployees.map((employee) => employee.id)
          ) + 1,
        name: name.trim(),
        role: role.trim(),
      }

      return [...currentEmployees, newEmployee]
    })

    return true
  }

  function handleDeleteEmployee(id: number) {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((employee) => employee.id !== id)
    )

    const updatedSchedule = scheduleRef.current.filter(
      (item) => item.employeeId !== id
    )

    scheduleRef.current = updatedSchedule
    setScheduledTasks(updatedSchedule)
  }

  function handleEditEmployee(
    id: number,
    name: string,
    role: string
  ): boolean {
    const normalizedName = name.trim().toLowerCase()

    const employeeExists = employees.some(
      (employee) =>
        employee.id !== id &&
        employee.name.trim().toLowerCase() === normalizedName
    )

    if (employeeExists) return false

    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === id
          ? { ...employee, name: name.trim(), role: role.trim() }
          : employee
      )
    )

    return true
  }

  function handleAddTask(
    title: string,
    description: string,
    duration: number,
    maxEmployees: number
  ) {
    setTasks((currentTasks) => {
      const newTask: Task = {
        id:
          Math.max(0, ...currentTasks.map((task) => task.id)) + 1,
        title,
        description,
        duration,
        maxEmployees,
      }

      return [...currentTasks, newTask]
    })
  }

  function handleDeleteTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )

    const updatedSchedule = scheduleRef.current.filter(
      (item) => item.taskId !== id
    )

    scheduleRef.current = updatedSchedule
    setScheduledTasks(updatedSchedule)
  }

  function handleEditTask(
    id: number,
    title: string,
    description: string,
    duration: number,
    maxEmployees: number
  ): boolean {
    const currentSchedule = scheduleRef.current

    const hasTooManyEmployees = currentSchedule.some((item) => {
      if (item.taskId !== id) return false

      return isTaskFull(
        currentSchedule.filter(
          (scheduledItem) => scheduledItem.id !== item.id
        ),
        id,
        maxEmployees,
        item.day,
        item.weekStart
      )
    })

    if (hasTooManyEmployees) return false

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, duration, maxEmployees }
          : task
      )
    )

    return true
  }

  function handleAddScheduledTask(
    employeeId: number,
    taskId: number,
    day: Weekday
  ): string | null {
    const employeeExists = employees.some(
      (employee) => employee.id === employeeId
    )

    if (!employeeExists) {
      return 'Deze medewerker bestaat niet meer.'
    }

    const selectedTask = tasks.find((task) => task.id === taskId)

    if (!selectedTask) {
      return 'Deze taak bestaat niet meer.'
    }

    const currentSchedule = scheduleRef.current

    if (
      hasEmployeeConflict(
        currentSchedule,
        employeeId,
        day,
        activeWeekStart
      )
    ) {
      return 'Deze medewerker heeft op deze dag al een taak.'
    }

    if (
      isTaskFull(
        currentSchedule,
        taskId,
        selectedTask.maxEmployees,
        day,
        activeWeekStart
      )
    ) {
      return 'Deze taak heeft op deze dag het maximale aantal medewerkers bereikt.'
    }

    const newScheduledTask: ScheduledTask = {
      id:
        Math.max(
          0,
          ...currentSchedule.map((item) => item.id)
        ) + 1,
      employeeId,
      taskId,
      day,
      weekStart: activeWeekStart,
    }

    const updatedSchedule = [...currentSchedule, newScheduledTask]

    scheduleRef.current = updatedSchedule
    setScheduledTasks(updatedSchedule)

    return null
  }

  function handleRemoveScheduledTask(id: number) {
    const updatedSchedule = scheduleRef.current.filter(
      (item) => item.id !== id
    )

    scheduleRef.current = updatedSchedule
    setScheduledTasks(updatedSchedule)
  }

  return {
    employees,
    tasks,
    scheduledTasks,
    activeWeekStart,
    handlePreviousWeek,
    handleNextWeek,
    handleAddEmployee,
    handleDeleteEmployee,
    handleEditEmployee,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleAddScheduledTask,
    handleRemoveScheduledTask,
  }
}
