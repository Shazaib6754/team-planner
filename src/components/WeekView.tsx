
import type { Employee, Task, ScheduledTask, Weekday } from '../types'
import WeekDayColumn from './WeekDayColumn'

type WeekViewProps = {
  employees: Employee[]
  tasks: Task[]
  schedule: ScheduledTask[]
  activeWeekStart: string
  onPreviousWeek: () => void
  onNextWeek: () => void
  onRemoveScheduledTask: (id: number) => void
}

const weekdays: Weekday[] = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
]

function WeekView({
  employees,
  tasks,
  schedule,
  activeWeekStart,
  onPreviousWeek,
  onNextWeek,
  onRemoveScheduledTask,
}: WeekViewProps) {
  const monday = new Date(`${activeWeekStart}T00:00:00`)
  const friday = new Date(monday)
  friday.setDate(friday.getDate() + 4)

  const dateFormat: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }

  const weekLabel = `${monday.toLocaleDateString('nl-NL', dateFormat)} - ${friday.toLocaleDateString('nl-NL', dateFormat)}`

  const weeklySchedule = schedule.filter(
    (item) => item.weekStart === activeWeekStart
  )

  const employeeWorkdays = employees.map((employee) => {
    const scheduledDays = new Set(
      weeklySchedule
        .filter((item) => item.employeeId === employee.id)
        .map((item) => item.day)
    )

    return {
      ...employee,
      scheduledDays: scheduledDays.size,
    }
  })

  return (
    <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Weekplanning
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {weekLabel}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPreviousWeek}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Vorige week
          </button>

          <button
            type="button"
            onClick={onNextWeek}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            Volgende week
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-slate-200 p-4">
        <h3 className="mb-3 font-semibold text-slate-800">
          Ingeplande dagen per medewerker
        </h3>

        {employeeWorkdays.length === 0 ? (
          <p className="text-sm text-slate-500">
            Er zijn nog geen medewerkers toegevoegd.
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {employeeWorkdays.map((employee) => (
              <li
                key={employee.id}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <span className="text-sm font-medium text-slate-700">
                  {employee.name}
                </span>

                <span className="text-sm font-semibold text-blue-700">
                  {employee.scheduledDays} {employee.scheduledDays === 1 ? 'dag' : 'dagen'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {weekdays.map((day) => {
          const dailyTasks = schedule.filter(
            (item) =>
              item.day === day &&
              item.weekStart === activeWeekStart
          )

          return (
            <WeekDayColumn
              key={day}
              day={day}
              dailyTasks={dailyTasks}
              employees={employees}
              tasks={tasks}
              onRemoveScheduledTask={onRemoveScheduledTask}
            />
          )
        })}
      </div>
    </section>
  )
}

export default WeekView
