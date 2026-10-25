
import { useState } from 'react'
import './App.css'
import {
  employees as initialEmployees,
  tasks as initialTasks,
  schedule,
} from './data/mockData'
import type { Employee, Task } from './types'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import WeekView from './components/WeekView'

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  function handleAddEmployee(name: string, role: string) {
    const newEmployee: Employee = {
      id: Math.max(0, ...employees.map((employee) => employee.id)) + 1,
      name,
      role,
    }

    setEmployees((currentEmployees) => [...currentEmployees, newEmployee])
  }

  function handleDeleteEmployee(id: number) {
    setEmployees((currentEmployees) =>
      currentEmployees.filter((employee) => employee.id !== id)
    )
  }

  function handleEditEmployee(id: number, name: string, role: string) {
    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === id
          ? { ...employee, name, role }
          : employee
      )
    )
  }

  function handleAddTask(
    title: string,
    description: string,
    duration: number
  ) {
    const newTask: Task = {
      id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
      title,
      description,
      duration,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  function handleDeleteTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  function handleEditTask(
    id: number,
    title: string,
    description: string,
    duration: number
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, duration }
          : task
      )
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
        schedule={schedule}
      />
    </main>
  )
}

export default App
