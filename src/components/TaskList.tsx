import { useState } from 'react'
import type { Task } from '../types'
import TaskForm from './TaskForm'
import Button from './Button'

type TaskListProps = {
  tasks: Task[]
  onDelete: (id: number) => void
  onEdit: (
    id: number,
    title: string,
    description: string,
    duration: number,
    maxEmployees: number
  ) => boolean
}

function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)

  function handleDelete(task: Task) {
    const confirmed = window.confirm(
      `Weet je zeker dat je de taak "${task.title}" wilt verwijderen?`
    )

    if (confirmed) {
      onDelete(task.id)
    }
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
                <TaskForm
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onCancel={() => setEditingId(null)}
                />
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

                    <p className="mt-1 text-sm font-medium text-blue-600">
                      Maximaal {task.maxEmployees} medewerkers
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setEditingId(task.id)}
                    >
                      Bewerken
                    </Button>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDelete(task)}
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

export default TaskList