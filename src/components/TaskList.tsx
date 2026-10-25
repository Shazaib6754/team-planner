
import { useState } from 'react'
import type { Task } from '../types'

type TaskListProps = {
  tasks: Task[]
  onDelete: (id: number) => void
  onEdit: (
    id: number,
    title: string,
    description: string,
    duration: number
  ) => void
}

function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDuration, setEditDuration] = useState('')

  function handleStartEdit(task: Task) {
    setEditingId(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditDuration(String(task.duration))
  }

  function handleCancelEdit() {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
    setEditDuration('')
  }

  function handleSaveEdit(id: number) {
    const duration = Number(editDuration)

    if (
      !editTitle.trim() ||
      !editDescription.trim() ||
      !Number.isFinite(duration) ||
      duration <= 0 ||
      !Number.isInteger(duration)
    ) {
      return
    }

    onEdit(
      id,
      editTitle.trim(),
      editDescription.trim(),
      duration
    )

    handleCancelEdit()
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Taken
      </h2>

      {tasks.length === 0 ? (
        <p className="text-sm text-slate-500">
          Er zijn nog geen taken toegevoegd.
        </p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="rounded-lg border border-slate-200 p-3"
            >
              {editingId === task.id ? (
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor={`edit-task-title-${task.id}`}
                      className="mb-1 block text-sm text-slate-600"
                    >
                      Titel
                    </label>

                    <input
                      id={`edit-task-title-${task.id}`}
                      type="text"
                      value={editTitle}
                      onChange={(event) =>
                        setEditTitle(event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`edit-task-description-${task.id}`}
                      className="mb-1 block text-sm text-slate-600"
                    >
                      Beschrijving
                    </label>

                    <textarea
                      id={`edit-task-description-${task.id}`}
                      value={editDescription}
                      onChange={(event) =>
                        setEditDescription(event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`edit-task-duration-${task.id}`}
                      className="mb-1 block text-sm text-slate-600"
                    >
                      Duur in minuten
                    </label>

                    <input
                      id={`edit-task-duration-${task.id}`}
                      type="number"
                      min="1"
                      step="1"
                      value={editDuration}
                      onChange={(event) =>
                        setEditDuration(event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                      required
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(task.id)}
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
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-slate-800">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-600">
                      {task.description}
                    </p>

                    <p className="mt-2 text-sm font-medium text-blue-600">
                      Duur: {task.duration} minuten
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(task)}
                      className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Bewerken
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(task.id)}
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

export default TaskList
