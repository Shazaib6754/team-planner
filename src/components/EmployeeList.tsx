
import { useState } from 'react'
import type { Employee } from '../types'
import EmployeeForm from './EmployeeForm'

type EmployeeListProps = {
  employees: Employee[]
  onDelete: (id: number) => void
  onEdit: (id: number, name: string, role: string) => boolean
}

function EmployeeList({ employees, onDelete, onEdit }: EmployeeListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)

  function handleStartEdit(employee: Employee) {
    setEditingId(employee.id)
  }

  function handleCancelEdit() {
    setEditingId(null)
  }

  function handleDelete(employee: Employee) {
    const confirmed = window.confirm(
      `Weet je zeker dat je ${employee.name} wilt verwijderen?`
    )

    if (confirmed) {
      onDelete(employee.id)
    }
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Medewerkers
      </h2>

      {employees.length === 0 ? (
        <p className="text-sm text-slate-500">
          Er zijn nog geen medewerkers toegevoegd.
        </p>
      ) : (
        <ul className="space-y-3">
          {employees.map((employee) => (
            <li
              key={employee.id}
              className="rounded-lg border border-slate-200 p-3"
            >
              {editingId === employee.id ? (
                <EmployeeForm
                  key={employee.id}
                  employee={employee}
                  onEdit={onEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">
                      {employee.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {employee.role}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(employee)}
                      className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Bewerken
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(employee)}
                      className="rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default EmployeeList
