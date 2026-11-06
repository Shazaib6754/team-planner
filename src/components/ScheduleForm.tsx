
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Employee, Task, Weekday } from '../types'
import ScheduleFormFields from './ScheduleFormFields'

type ScheduleFormProps = {
  employees: Employee[]
  tasks: Task[]
  onAdd: (
    employeeId: number,
    taskId: number,
    day: Weekday
  ) => string | null
}

function ScheduleForm({
  employees,
  tasks,
  onAdd,
}: ScheduleFormProps) {
  const [employeeId, setEmployeeId] = useState('')
  const [taskId, setTaskId] = useState('')
  const [day, setDay] = useState<Weekday>('Maandag')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!employeeId || !taskId) {
      setError('Selecteer een medewerker en een taak.')
      return
    }

    const result = onAdd(
      Number(employeeId),
      Number(taskId),
      day
    )

    if (result) {
      setError(result)
      return
    }

    setError('')
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Medewerker inplannen
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <ScheduleFormFields
          employees={employees}
          tasks={tasks}
          employeeId={employeeId}
          taskId={taskId}
          day={day}
          onEmployeeChange={setEmployeeId}
          onTaskChange={setTaskId}
          onDayChange={setDay}
        />

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={employees.length === 0 || tasks.length === 0}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Medewerker inplannen
        </button>
      </form>
    </section>
  )
}

export default ScheduleForm
