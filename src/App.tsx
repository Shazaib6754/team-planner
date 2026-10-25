
import { useState } from 'react'
import './App.css'
import { employees as initialEmployees, tasks, schedule } from './data/mockData'
import type { Employee } from './types'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import TaskList from './components/TaskList'
import WeekView from './components/WeekView'

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

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
          />
        </section>

        <TaskList tasks={tasks} />
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
