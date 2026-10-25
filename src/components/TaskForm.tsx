
import { useState } from 'react'
import type { FormEvent } from 'react'

type TaskFormProps = {
  onAdd: (
    title: string,
    description: string,
    duration: number
  ) => void
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsedDuration = Number(duration)

    if (
      !title.trim() ||
      !description.trim() ||
      !Number.isFinite(parsedDuration) ||
      parsedDuration <= 0
    ) {
      return
    }

    onAdd(title.trim(), description.trim(), parsedDuration)

    setTitle('')
    setDescription('')
    setDuration('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 space-y-3 rounded-lg border border-slate-200 p-4"
    >
      <h3 className="font-semibold text-slate-800">
        Taak toevoegen
      </h3>

      <div>
        <label
          htmlFor="task-title"
          className="mb-1 block text-sm text-slate-600"
        >
          Titel
        </label>

        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Bijvoorbeeld onderhoud uitvoeren"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="task-description"
          className="mb-1 block text-sm text-slate-600"
        >
          Beschrijving
        </label>

        <textarea
          id="task-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Beschrijf wat er moet gebeuren"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label
          htmlFor="task-duration"
          className="mb-1 block text-sm text-slate-600"
        >
          Duur in minuten
        </label>

        <input
          id="task-duration"
          type="number"
          min="1"
          step="1"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
          placeholder="Bijvoorbeeld 60"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
      >
        Taak toevoegen
      </button>
    </form>
  )
}

export default TaskForm
