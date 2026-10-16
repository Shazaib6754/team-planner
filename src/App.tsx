
import './App.css'
import { employees, tasks } from './data/mockData'
import EmployeeList from './components/EmployeeList'
import TaskList from './components/TaskList'

function App() {
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
        <EmployeeList employees={employees} />

        <TaskList tasks={tasks} />
      </div>
    </main>
  )
}

export default App
