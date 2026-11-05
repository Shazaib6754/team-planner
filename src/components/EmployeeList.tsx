
import { useState } from 'react'
import type { Employee } from '../types'
import EmployeeForm from './EmployeeForm'
import Button from './Button'

type EmployeeListProps = {
  employees: Employee[]
  onDelete: (id: number) => void
  onEdit: (id: number, name: string, role: string) => boolean
}

function EmployeeList({ employees, onDelete, onEdit }: EmployeeListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)

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
                  onCancel={() => setEditingId(null)}
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
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setEditingId(employee.id)}
                    >
                      Bewerken
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDelete(employee)}
                    >
                      Verwijderen
                    </Button>
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
