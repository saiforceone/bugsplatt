import './textInput.css';

export interface TextInputProps {
  id: string;
  labelText?: string;
  placeholder?: string;
  type?: string;
}

export const TextInput = ({
  id = 'default-input',
  labelText = 'Text Field',
  placeholder = 'Type something...',
  type = 'text',
  ...props
}: TextInputProps) => {
  return (
    <div className='text-input--container'>
      {labelText && (
        <label className='text-input--label' htmlFor={`${id}`}>
          {labelText}
        </label>
      )}
      <input
        className='text-input--field'
        id={id}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
  )
}