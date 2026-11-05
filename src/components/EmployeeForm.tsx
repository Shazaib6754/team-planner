
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Employee } from '../types'

type EmployeeFormProps = {
  employee?: Employee
  onAdd?: (name: string, role: string) => boolean
  onEdit?: (id: number, name: string, role: string) => boolean
  onCancel?: () => void
}

function EmployeeForm({
  employee,
  onAdd,
  onEdit,
  onCancel,
}: EmployeeFormProps) {
  const [name, setName] = useState(employee?.name ?? '')
  const [role, setRole] = useState(employee?.role ?? '')
  const [error, setError] = useState('')

  const isEditing = employee !== undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) {
      setError('Vul een naam in.')
      return
    }

    if (!role.trim()) {
      setError('Vul een functie in.')
      return
    }

    const success = isEditing
      ? onEdit?.(employee.id, name.trim(), role.trim())
      : onAdd?.(name.trim(), role.trim())

    if (!success) {
      setError('Deze medewerker bestaat al. Gebruik een andere naam.')
      return
    }

    setError('')

    if (isEditing) {
      onCancel?.()
    } else {
      setName('')
      setRole('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 rounded-lg border border-slate-200 p-4"
    >
      <h3 className="font-semibold text-slate-800">
        {isEditing ? 'Medewerker bewerken' : 'Medewerker toevoegen'}
      </h3>

      <div>
        <label className="mb-1 block text-sm text-slate-600">
          Naam
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Naam van medewerker"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-600">
          Functie
        </label>

        <input
          type="text"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          placeholder="Bijvoorbeeld monteur"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          {isEditing ? 'Wijzigingen opslaan' : 'Medewerker toevoegen'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-100 px-4 py-2 font-medium text-slate-700 hover:bg-slate-200"
          >
            Annuleren
          </button>
        )}
      </div>
    </form>
  )
}

export default EmployeeForm
