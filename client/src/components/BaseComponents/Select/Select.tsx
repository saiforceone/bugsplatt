import { FC, SelectHTMLAttributes } from 'react';
import './select.css';
import { FormControlWrapper } from '../FormControlWrapper/FormControlWrapper';
import {FormControlNotificationProps} from '../../FormControlNotification/FormControlNotification';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  active?: boolean;
  id: string;
  labelText?: string;
  options: Array<SelectOption>;
  fieldNotification?: FormControlNotificationProps
}

export const Select: FC<SelectProps> = ({
  active = true,
  id = 'default-select',
  labelText = 'Pick something',
  options = [],
  fieldNotification,
  ...props
}) => {
  return (
    <FormControlWrapper
      labelId={id}
      labelText={labelText}
      control={
        <select className='form-control--field' disabled={!active} id={id} {...props}>
          <option disabled>Choose...</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      }
      notification={fieldNotification}
    />
  );
}
