
import { useState } from 'react'
import type { FormEvent } from 'react'

type EmployeeFormProps = {
  onAdd: (name: string, role: string) => boolean
}

function EmployeeForm({ onAdd }: EmployeeFormProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

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

    const added = onAdd(name.trim(), role.trim())

    if (!added) {
      setError('Deze medewerker bestaat al. Gebruik een andere naam.')
      return
    }

    setError('')
    setName('')
    setRole('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 space-y-3 rounded-lg border border-slate-200 p-4"
    >
      <h3 className="font-semibold text-slate-800">
        Medewerker toevoegen
      </h3>

      <div>
        <label
          htmlFor="employee-name"
          className="mb-1 block text-sm text-slate-600"
        >
          Naam
        </label>

        <input
          id="employee-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Naam van medewerker"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="employee-role"
          className="mb-1 block text-sm text-slate-600"
        >
          Functie
        </label>

        <input
          id="employee-role"
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

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Medewerker toevoegen
      </button>
    </form>
  )
}

export default EmployeeForm
