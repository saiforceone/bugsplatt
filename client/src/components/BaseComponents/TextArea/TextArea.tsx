import { FC, TextareaHTMLAttributes } from 'react';
import './TextArea.css';
import { FormControlWrapper } from '../FormControlWrapper/FormControlWrapper';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  labelText?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  id = 'default-text-area',
  labelText = 'Default text area',
  placeholder = 'Enter text here...',
  name,
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
    />
  );
}
