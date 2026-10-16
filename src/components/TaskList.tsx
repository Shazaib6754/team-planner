
import type { Task } from '../types'

type TaskListProps = {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Taken
      </h2>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border border-slate-200 p-3"
          >
            <h3 className="font-medium text-slate-800">
              {task.title}
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              {task.description}
            </p>

            <p className="mt-2 text-sm font-medium text-blue-600">
              Duur: {task.duration} minuten
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TaskList
