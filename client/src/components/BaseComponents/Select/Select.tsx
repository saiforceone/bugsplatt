import { FC, SelectHTMLAttributes } from 'react';
import './select.css';
import { FormControlWrapper } from '../FormControlWrapper/FormControlWrapper';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  active?: boolean;
  id: string;
  labelText?: string;
  options: Array<SelectOption>;
}

export const Select = ({
  active = true,
  id = 'default-select',
  labelText = 'Pick something',
  options = [],
  ...props
}: SelectProps) => {
  return (
    <div className='select--container'>
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
      />
    </div>
  );
}