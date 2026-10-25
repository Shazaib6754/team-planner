
import { useState } from 'react'
import type { FormEvent } from 'react'

type EmployeeFormProps = {
  onAdd: (name: string, role: string) => void
}

function EmployeeForm({ onAdd }: EmployeeFormProps) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim() || !role.trim()) {
      return
    }

    onAdd(name.trim(), role.trim())

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
          required
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
          required
        />
      </div>

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
