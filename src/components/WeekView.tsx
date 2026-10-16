
import type { Employee, Task, ScheduledTask, Weekday } from '../types'

type WeekViewProps = {
  employees: Employee[]
  tasks: Task[]
  schedule: ScheduledTask[]
}

const weekdays: Weekday[] = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
]

function WeekView({ employees, tasks, schedule }: WeekViewProps) {
  return (
    <section className="mt-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Weekplanning
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {weekdays.map((day) => (
          <div
            key={day}
            className="rounded-lg border border-slate-200 p-3"
          >
            <h3 className="mb-3 font-semibold text-slate-800">
              {day}
            </h3>

            <div className="space-y-3">
              {schedule
                .filter((item) => item.day === day)
                .map((item) => {
                  const task = tasks.find(
                    (task) => task.id === item.taskId,
                  )

                  const employee = employees.find(
                    (employee) => employee.id === item.employeeId,
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
                    </div>
                  )
                })}

              {schedule.filter((item) => item.day === day).length ===
                0 && (
                <p className="text-sm text-slate-400">
                  Geen taken gepland
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WeekView
