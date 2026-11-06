import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Task } from '../types'
import Button from './Button'
import TaskFormFields from './TaskFormFields'

type TaskFormProps = {
  task?: Task
  onAdd?: (
    title: string,
    description: string,
    duration: number,
    maxEmployees: number
  ) => void
  onEdit?: (
    id: number,
    title: string,
    description: string,
    duration: number,
    maxEmployees: number
  ) => boolean
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
  const [maxEmployees, setMaxEmployees] = useState(
    task?.maxEmployees.toString() ?? '1'
  )
  const [error, setError] = useState('')

  const isEditing = task !== undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsedDuration = Number(duration)
    const parsedMaxEmployees = Number(maxEmployees)

    if (!title.trim()) {
      setError('Vul een titel in.')
      return
    }

    if (!description.trim()) {
      setError('Vul een beschrijving in.')
      return
    }

    if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
      setError('Vul een geldig aantal minuten in.')
      return
    }

    if (
      !Number.isInteger(parsedMaxEmployees) ||
      parsedMaxEmployees <= 0
    ) {
      setError('Vul een geldig maximumaantal medewerkers in.')
      return
    }

    if (isEditing) {
      const updated = onEdit?.(
        task.id,
        title.trim(),
        description.trim(),
        parsedDuration,
        parsedMaxEmployees
      )

      if (!updated) {
        setError(
          'Het maximum kan niet lager zijn dan het aantal ingeplande medewerkers.'
        )
        return
      }

      onCancel?.()
    } else {
      onAdd?.(
        title.trim(),
        description.trim(),
        parsedDuration,
        parsedMaxEmployees
      )

      setTitle('')
      setDescription('')
      setDuration('')
      setMaxEmployees('1')
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

      <TaskFormFields
        title={title}
        description={description}
        duration={duration}
        maxEmployees={maxEmployees}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onDurationChange={setDuration}
        onMaxEmployeesChange={setMaxEmployees}
      />

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