import { useState } from 'react'
import './App.css'
import {
  employees as initialEmployees,
  tasks as initialTasks,
  schedule as initialSchedule,
} from './data/mockData'
import type { Employee, Task, ScheduledTask } from './types'
import { isTaskFull } from './utils/scheduleRules'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import WeekView from './components/WeekView'

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [scheduledTasks, setScheduledTasks] =
    useState<ScheduledTask[]>(initialSchedule)

  function handleAddEmployee(name: string, role: string): boolean {
    const normalizedName = name.trim().toLowerCase()

    const employeeExists = employees.some(
      (employee) =>
        employee.name.trim().toLowerCase() === normalizedName
    )

    if (employeeExists) {
      return false
    }

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

    setScheduledTasks((currentSchedule) =>
      currentSchedule.filter((item) => item.employeeId !== id)
    )
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

    if (employeeExists) {
      return false
    }

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

    setScheduledTasks((currentSchedule) =>
      currentSchedule.filter((item) => item.taskId !== id)
    )
  }

  function handleEditTask(
    id: number,
    title: string,
    description: string,
    duration: number,
    maxEmployees: number
  ): boolean {
    const hasTooManyEmployees = scheduledTasks.some((item) => {
      if (item.taskId !== id) {
        return false
      }

      return isTaskFull(
        scheduledTasks.filter(
          (scheduledItem) =>
            scheduledItem.id !== item.id
        ),
        id,
        maxEmployees,
        item.day,
        item.weekStart
      )
    })

    if (hasTooManyEmployees) {
      return false
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, duration, maxEmployees }
          : task
      )
    )

    return true
  }

  function handleRemoveScheduledTask(id: number) {
    setScheduledTasks((currentSchedule) =>
      currentSchedule.filter((item) => item.id !== id)
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Team Planner
        </h1>

        <p className="mt-2 text-slate-600">
          Plan medewerkers en taken voor de werkweek.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <EmployeeForm onAdd={handleAddEmployee} />

          <EmployeeList
            employees={employees}
            onDelete={handleDeleteEmployee}
            onEdit={handleEditEmployee}
          />
        </section>

        <section>
          <TaskForm onAdd={handleAddTask} />

          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </section>
      </div>

      <WeekView
        employees={employees}
        tasks={tasks}
        schedule={scheduledTasks}
        onRemoveScheduledTask={handleRemoveScheduledTask}
      />
    </main>
  )
}

export default App