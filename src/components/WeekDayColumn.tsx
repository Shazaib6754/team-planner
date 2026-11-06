import type { Employee, Task, ScheduledTask, Weekday } from '../types'

type WeekDayColumnProps = {
  day: Weekday
  dailyTasks: ScheduledTask[]
  employees: Employee[]
  tasks: Task[]
  onRemoveScheduledTask: (id: number) => void
}

function WeekDayColumn({
  day,
  dailyTasks,
  employees,
  tasks,
  onRemoveScheduledTask,
}: WeekDayColumnProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-3">
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

          const assignedCount = dailyTasks.filter(
            (scheduledItem) => scheduledItem.taskId === task.id
          ).length

          const isFull = assignedCount >= task.maxEmployees

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

              <p className="mt-1 text-xs text-slate-600">
                {assignedCount} / {task.maxEmployees} medewerkers
              </p>

              {isFull && (
                <p className="mt-1 text-xs font-semibold text-red-600">
                  Taak is vol
                </p>
              )}

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
}

export default WeekDayColumn