import { HiInformationCircle, HiExclamationCircle, HiCheckCircle } from "react-icons/hi";
import { AppNotification } from "../../../interfaces";
import './ModalNotification.css';

export interface ModalNofiticationProps {
  notification: AppNotification;
}

export const ModalNotification = ({ notification }: ModalNofiticationProps): JSX.Element => {

  let iconElement;
  const iconClassName = "default-icon modal-notification--icon";

  switch(notification.notificationType) {
    case "success":
      iconElement = <HiCheckCircle className={iconClassName} />
      break;
    case "error" || "warning":
      iconElement = <HiExclamationCircle className={iconClassName} />
      break;
    default:
      iconElement = <HiInformationCircle className={iconClassName} />
  }

  return (
    <div className={['modal-notification', `${notification.notificationType ? 'modal-notification-' + notification.notificationType : 'modal-notification-default'}`].join(' ')}>
      {iconElement}
      <div className="ml-2">
        <h4 className="modal-notification--title">{notification.title}</h4>
        <p className="modal-notification--details">{notification.details}</p>
      </div>
    </div>
  );
};
