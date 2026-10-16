
import type { Employee } from '../types'

type EmployeeListProps = {
  employees: Employee[]
}

function EmployeeList({ employees }: EmployeeListProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Medewerkers
      </h2>

      <ul className="space-y-3">
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 p-3"
          >
            <span className="font-medium text-slate-800">
              {employee.name}
            </span>

            <span className="text-sm text-slate-500">
              {employee.role}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default EmployeeList
