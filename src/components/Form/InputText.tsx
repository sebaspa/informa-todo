interface InputTextProps {
  type: string
  name: string
  value: string | number | undefined
  label: string
  required?: boolean
  handleChange: React.ChangeEventHandler<HTMLInputElement>
}

const InputText = ({
  type,
  name,
  value,
  label,
  required = false,
  handleChange
}: InputTextProps): JSX.Element => {
  return (
    <div className="relative mb-4">
      <label htmlFor="" className="font-bold block">{label}</label>
      <input
        type={type}
        placeholder={label}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        className="border border-gray-300 rounded-lg px-4 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
    </div>
  )
}

export default InputText
