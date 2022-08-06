/**
 * File: FormControlNotification.tsx
 * Created by: sai @ 8/5/22
 */

import {FC} from 'react';
import {HiInformationCircle, HiExclamationCircle} from 'react-icons/hi';
import './FormControlNotification.css';

export enum FormControlNotificationType {
  "default",
  "info",
  "warning",
  "error"
}

export interface FormControlNotificationProps {
  notificationType: FormControlNotificationType;
  notificationText: string;
  notificationTitle?: string;
}

const NotificationIcon = (notificationType: FormControlNotificationType): JSX.Element => {
  switch (notificationType) {
    case FormControlNotificationType.warning || FormControlNotificationType.error:
      return <HiExclamationCircle />;
    default:
      return <HiInformationCircle />
  }
}

export const FormControlNotification: FC<FormControlNotificationProps> = ({notificationTitle, notificationType , notificationText}) => {
  return (
    <div className="form-control-notification">
      {NotificationIcon(notificationType)}
      <div className="form-control-notification--content">
        {notificationTitle && <h3 className={["form-control-notification--title", `form-control-notification--title_${notificationType}`].join(" ")}>{notificationTitle}</h3>}
        <p className={["form-control-notification--text", `form-control-notification--title_${notificationType}`].join(" ")}>{notificationText}</p>
      </div>
    </div>
  );
};
