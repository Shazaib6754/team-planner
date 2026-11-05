
import { useState } from 'react'
import type { Employee } from '../types'

type EmployeeListProps = {
  employees: Employee[]
  onDelete: (id: number) => void
  onEdit: (id: number, name: string, role: string) => boolean
}

function EmployeeList({ employees, onDelete, onEdit }: EmployeeListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editRole, setEditRole] = useState('')
  const [error, setError] = useState('')

  function handleStartEdit(employee: Employee) {
    setEditingId(employee.id)
    setEditName(employee.name)
    setEditRole(employee.role)
    setError('')
  }

  function handleCancelEdit() {
    setEditingId(null)
    setEditName('')
    setEditRole('')
    setError('')
  }

  function handleSaveEdit(id: number) {
    if (!editName.trim()) {
      setError('Vul een naam in.')
      return
    }

    if (!editRole.trim()) {
      setError('Vul een functie in.')
      return
    }

    const updated = onEdit(id, editName.trim(), editRole.trim())

    if (!updated) {
      setError('Deze medewerker bestaat al. Gebruik een andere naam.')
      return
    }

    handleCancelEdit()
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
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor={`edit-name-${employee.id}`}
                      className="mb-1 block text-sm text-slate-600"
                    >
                      Naam
                    </label>

                    <input
                      id={`edit-name-${employee.id}`}
                      type="text"
                      value={editName}
                      onChange={(event) => {
                        setEditName(event.target.value)
                        setError('')
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`edit-role-${employee.id}`}
                      className="mb-1 block text-sm text-slate-600"
                    >
                      Functie
                    </label>

                    <input
                      id={`edit-role-${employee.id}`}
                      type="text"
                      value={editRole}
                      onChange={(event) => {
                        setEditRole(event.target.value)
                        setError('')
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(employee.id)}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Opslaan
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                    >
                      Annuleren
                    </button>
                  </div>
                </div>
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
