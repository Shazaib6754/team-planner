
type ButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
}

function Button({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
}: ButtonProps) {
  const baseClasses =
    'rounded-lg px-4 py-2 text-sm font-medium transition-colors'

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button
