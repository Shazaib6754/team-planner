import type { Employee, Task, Weekday } from '../types'

type ScheduleFormFieldsProps = {
  employees: Employee[]
  tasks: Task[]
  employeeId: string
  taskId: string
  day: Weekday
  onEmployeeChange: (value: string) => void
  onTaskChange: (value: string) => void
  onDayChange: (value: Weekday) => void
}

const weekdays: Weekday[] = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
]

function ScheduleFormFields({
  employees,
  tasks,
  employeeId,
  taskId,
  day,
  onEmployeeChange,
  onTaskChange,
  onDayChange,
}: ScheduleFormFieldsProps) {
  return (
    <>
      <div>
        <label
          htmlFor="employee"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Medewerker
        </label>

        <select
          id="employee"
          value={employeeId}
          onChange={(event) => onEmployeeChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 p-2"
          required
        >
          <option value="">Kies een medewerker</option>

          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="task"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Taak
        </label>

        <select
          id="task"
          value={taskId}
          onChange={(event) => onTaskChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 p-2"
          required
        >
          <option value="">Kies een taak</option>

          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title} (max. {task.maxEmployees} medewerkers)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="day"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Weekdag
        </label>

        <select
          id="day"
          value={day}
          onChange={(event) =>
            onDayChange(event.target.value as Weekday)
          }
          className="w-full rounded-lg border border-slate-300 p-2"
        >
          {weekdays.map((weekday) => (
            <option key={weekday} value={weekday}>
              {weekday}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default ScheduleFormFields