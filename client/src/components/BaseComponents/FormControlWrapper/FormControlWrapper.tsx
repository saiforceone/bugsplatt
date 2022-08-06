import {FC, ReactElement} from 'react';
import './FormControlWrapper.css';
import {
  FormControlNotification,
  FormControlNotificationProps
} from '../../FormControlNotification/FormControlNotification';

export interface FormControlWrapperProps {
  labelId: string;
  labelText?: string;
  control: ReactElement;
  notification?: FormControlNotificationProps;
}

export const FormControlWrapper: FC<FormControlWrapperProps> = ({
  labelId,
  labelText,
  control,
  notification
}) => {
  return (
    <div className='form-control-wrapper'>
      <>
        {labelText && <label className='form-control-wrapper--label' htmlFor={labelId}>{labelText}</label>}
        {control}
        {notification && <FormControlNotification {...notification} />}
      </>
    </div>
  );
}
