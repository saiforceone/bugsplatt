/**
 * File: FormControlNotification.tsx
 * Created by: sai @ 8/5/22
 */

import {FC} from 'react';
import {HiInformationCircle, HiExclamationCircle} from 'react-icons/hi';
import './FormControlNotification.css';

const BORDER_CLASSNAMES = {
  default: "border-slate-700",
  info: "border-blue-800",
  warning: "border-amber-600",
  error: "border-red-600"
}

export enum FormControlNotificationType {
  default = "default",
  info = "info",
  warning = "warning",
  error = "error"
}

export interface FormControlNotificationProps {
  notificationType: FormControlNotificationType;
  notificationText: string;
  notificationTitle?: string;
}

const NotificationIcon = (notificationType: FormControlNotificationType): JSX.Element => {
  switch (notificationType) {
    case FormControlNotificationType.warning || FormControlNotificationType.error:
      return <HiExclamationCircle className={["notification-icon", `form-control-notification__text-${notificationType}`].join(" ")} />;
    default:
      return <HiInformationCircle className={["notification-icon", `form-control-notification__text-${notificationType}`].join(" ")} />
  }
}

export const FormControlNotification: FC<FormControlNotificationProps> = ({notificationTitle, notificationType , notificationText}) => {
  return (
    <div className={["form-control-notification", BORDER_CLASSNAMES[notificationType]].join(" ")}>
      {NotificationIcon(notificationType)}
      <div className="form-control-notification--content">
        {notificationTitle && <h3 className={["form-control-notification--title", `form-control-notification__text-${notificationType}`].join(" ")}>{notificationTitle}</h3>}
        <p className={["form-control-notification--text", `form-control-notification__text-${notificationType}`].join(" ")}>{notificationText}</p>
      </div>
    </div>
  );
};
