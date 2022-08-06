import { FC, TextareaHTMLAttributes } from 'react';
import './TextArea.css';
import { FormControlWrapper } from '../FormControlWrapper/FormControlWrapper';
import {FormControlNotificationProps} from '../../FormControlNotification/FormControlNotification';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  fieldNotification?: FormControlNotificationProps
}

export const TextArea: FC<TextAreaProps> = ({
  id = 'default-text-area',
  labelText = 'Default text area',
  placeholder = 'Enter text here...',
  fieldNotification,
  ...props
}: TextAreaProps) => {
  return (
    <FormControlWrapper
      labelId={id}
      labelText={labelText}
      control={
        <textarea
          className='text-area--field'
          placeholder={placeholder}
          {...props}
        />
      }
      notification={fieldNotification}
    />
  );
}
