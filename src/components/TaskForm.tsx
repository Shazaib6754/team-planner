
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Task } from '../types'
import Button from './Button'

type TaskFormProps = {
  task?: Task
  onAdd?: (
    title: string,
    description: string,
    duration: number
  ) => void
  onEdit?: (
    id: number,
    title: string,
    description: string,
    duration: number
  ) => void
  onCancel?: () => void
}

function TaskForm({
  task,
  onAdd,
  onEdit,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(
    task?.description ?? ''
  )
  const [duration, setDuration] = useState(
    task?.duration.toString() ?? ''
  )
  const [error, setError] = useState('')

  const isEditing = task !== undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsedDuration = Number(duration)

    if (!title.trim()) {
      setError('Vul een titel in.')
      return
    }

    if (!description.trim()) {
      setError('Vul een beschrijving in.')
      return
    }

    if (
      !Number.isInteger(parsedDuration) ||
      parsedDuration <= 0
    ) {
      setError('Vul een geldig aantal minuten in.')
      return
    }

    if (isEditing) {
      onEdit?.(
        task.id,
        title.trim(),
        description.trim(),
        parsedDuration
      )
      onCancel?.()
    } else {
      onAdd?.(
        title.trim(),
        description.trim(),
        parsedDuration
      )
      setTitle('')
      setDescription('')
      setDuration('')
    }

    setError('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 space-y-3 rounded-lg border border-slate-200 p-4"
    >
      <h3 className="font-semibold text-slate-800">
        {isEditing ? 'Taak bewerken' : 'Taak toevoegen'}
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

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit">
          {isEditing ? 'Wijzigingen opslaan' : 'Taak toevoegen'}
        </Button>

        {isEditing && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Annuleren
          </Button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
