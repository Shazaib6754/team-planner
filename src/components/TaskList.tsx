
import type { Task } from '../types'

type TaskListProps = {
  tasks: Task[]
  onDelete: (id: number) => void
}

function TaskList({ tasks, onDelete }: TaskListProps) {
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
              className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3"
            >
              <div className="min-w-0">
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

              <button
                type="button"
                onClick={() => onDelete(task.id)}
                className="shrink-0 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
              >
                Verwijderen
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
