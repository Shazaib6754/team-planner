
import type { Employee } from '../types'

type EmployeeListProps = {
  employees: Employee[]
  onDelete: (id: number) => void
}

function EmployeeList({ employees, onDelete }: EmployeeListProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Medewerkers
      </h2>

      <ul className="space-y-3">
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3"
          >
            <div>
              <p className="font-medium text-slate-800">
                {employee.name}
              </p>

              <p className="text-sm text-slate-500">
                {employee.role}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onDelete(employee.id)}
              className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
            >
              Verwijderen
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default EmployeeList
