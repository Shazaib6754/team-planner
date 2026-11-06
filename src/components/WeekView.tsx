import type { Employee, Task, ScheduledTask, Weekday } from '../types'

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {weekdays.map((day) => {
          const dailyTasks = schedule.filter(
            (item) =>
              item.day === day &&
              item.weekStart === activeWeekStart
          )

          return (
            <div
              key={day}
              className="rounded-lg border border-slate-200 p-3"
            >
              <h3 className="mb-3 font-semibold text-slate-800">
                {day}
              </h3>

              <div className="space-y-3">
                {dailyTasks.map((item) => {
                  const task = tasks.find(
                    (task) => task.id === item.taskId
                  )

                  const employee = employees.find(
                    (employee) => employee.id === item.employeeId
                  )

                  if (!task || !employee) {
                    return null
                  }

                  return (
                    <div
                      key={item.id}
                      className="rounded-lg bg-blue-50 p-3"
                    >
                      <p className="font-medium text-blue-900">
                        {task.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {employee.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {task.duration} minuten
                      </p>

                      <button
                        type="button"
                        onClick={() => onRemoveScheduledTask(item.id)}
                        className="mt-3 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                      >
                        Verwijderen uit planning
                      </button>
                    </div>
                  )
                })}

                {dailyTasks.length === 0 && (
                  <p className="text-sm text-slate-400">
                    Geen taken gepland
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default WeekView