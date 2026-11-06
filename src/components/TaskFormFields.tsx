type TaskFormFieldsProps = {
  title: string
  description: string
  duration: string
  maxEmployees: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onDurationChange: (value: string) => void
  onMaxEmployeesChange: (value: string) => void
}

function TaskFormFields({
  title,
  description,
  duration,
  maxEmployees,
  onTitleChange,
  onDescriptionChange,
  onDurationChange,
  onMaxEmployeesChange,
}: TaskFormFieldsProps) {
  return (
    <>
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
          onChange={(event) => onTitleChange(event.target.value)}
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
          onChange={(event) =>
            onDescriptionChange(event.target.value)
          }
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
          onChange={(event) => onDurationChange(event.target.value)}
          placeholder="Bijvoorbeeld 60"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label
          htmlFor="task-max-employees"
          className="mb-1 block text-sm text-slate-600"
        >
          Maximumaantal medewerkers
        </label>
        <input
          id="task-max-employees"
          type="number"
          min="1"
          step="1"
          value={maxEmployees}
          onChange={(event) =>
            onMaxEmployeesChange(event.target.value)
          }
          placeholder="Bijvoorbeeld 3"
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          required
        />
      </div>
    </>
  )
}

export default TaskFormFields