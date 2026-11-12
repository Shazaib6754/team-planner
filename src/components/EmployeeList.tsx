
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
  const [searchName, setSearchName] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const roles = [...new Set(employees.map((employee) => employee.role))]

  const filteredEmployees = employees.filter((employee) => {
    const matchesName = employee.name
      .toLowerCase()
      .includes(searchName.trim().toLowerCase())

    const matchesRole =
      selectedRole === '' || employee.role === selectedRole

    return matchesName && matchesRole
  })

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

      {employees.length > 0 && (
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <input
            type="search"
            value={searchName}
            onChange={(event) => setSearchName(event.target.value)}
            placeholder="Zoek op naam..."
            aria-label="Zoek medewerkers op naam"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />

          <select
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value)}
            aria-label="Filter medewerkers op functie"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="">Alle functies</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      )}

      {employees.length === 0 ? (
        <p className="text-sm text-slate-500">
          Er zijn nog geen medewerkers toegevoegd.
        </p>
      ) : filteredEmployees.length === 0 ? (
        <p className="text-sm text-slate-500">
          Geen medewerkers gevonden met deze filters.
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredEmployees.map((employee) => (
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
