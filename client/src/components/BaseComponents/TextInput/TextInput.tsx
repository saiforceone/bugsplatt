import { FC, InputHTMLAttributes } from 'react';
import './textInput.css';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  labelText?: string;
}

export const TextInput: FC<TextInputProps> = ({
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
      {/* TODO: replace with text area component based on FormControl component (to be made) */}
      <input
        className='text-input--field'
        id={id}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      {/* TODO: complete implementation based on design */}
    </div>
  )
}