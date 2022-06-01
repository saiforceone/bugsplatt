import { ReactElement } from 'react';
import './FormControlWrapper.css';

export interface FormControlWrapperProps {
  labelId: string;
  labelText?: string;
  control: ReactElement;
}

export const FormControlWrapper = ({
  labelId,
  labelText,
  control,
}: FormControlWrapperProps) => {
  return (
    <div className='form-control-wrapper'>
      {labelText && <label className='form-control-wrapper--label' htmlFor={labelId}>{labelText}</label>}
      {control}
    </div>
  );
}
