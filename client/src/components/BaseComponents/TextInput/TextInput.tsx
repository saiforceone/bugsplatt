import { FC, InputHTMLAttributes } from 'react';
import './textInput.css';
import { FormControlWrapper } from '../FormControlWrapper/FormControlWrapper';
import {FormControlNotificationProps} from '../../FormControlNotification/FormControlNotification';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  labelText?: string;
  fieldNotification?: FormControlNotificationProps
}

export const TextInput: FC<TextInputProps> = ({
  id = 'default-input',
  labelText = 'Text Field',
  placeholder = 'Type something...',
  type = 'text',
  fieldNotification,
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
      notification={fieldNotification}
    />
  );
}
