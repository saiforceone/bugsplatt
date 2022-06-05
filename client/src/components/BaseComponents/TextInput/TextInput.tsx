import { FC, InputHTMLAttributes } from 'react';
import './textInput.css';
import { FormControlWrapper } from '../FormControlWrapper/FormControlWrapper';

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
    <FormControlWrapper
      labelId={id}
      labelText={labelText}
      control={
        <input
          className='form-control--field'
          id={id}
          placeholder={placeholder}
          type={type}
          {...props}
        />
      }
    />
  );
}