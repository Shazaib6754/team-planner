import './App.css'
import EmployeeList from './components/EmployeeList'
import EmployeeForm from './components/EmployeeForm'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import ScheduleForm from './components/ScheduleForm'
import WeekView from './components/WeekView'
import { useTeamPlanner } from './hooks/useTeamPlanner'

function App() {
  const {
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
  } = useTeamPlanner()

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

      <div className="mt-6">
        <ScheduleForm
          employees={employees}
          tasks={tasks}
          onAdd={handleAddScheduledTask}
        />
      </div>

      <WeekView
        employees={employees}
        tasks={tasks}
        schedule={scheduledTasks}
        activeWeekStart={activeWeekStart}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        onRemoveScheduledTask={handleRemoveScheduledTask}
      />
    </main>
  )
}

export default App