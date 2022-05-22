import { HiCheckCircle } from 'react-icons/hi';
import './iconButton.css';

export interface IconButtonProps {
  /** `active` required - indicates the state of the button */
  active: boolean;
  /** `buttonSize` optional - controls the size of the button */
  buttonSize?: 'small' | 'medium';
  /** `onClick` optional - click handler for the button */
  onClick?: () => void;
  /** `icon` required - icon that is shown on the button */
  icon: React.ReactElement;
  /** `isCloseButton` indicates if the icon should be styled as a close button */
  isCloseButton?: boolean;
}

export const IconButton = ({
  active = true,
  buttonSize = 'small',
  icon = <HiCheckCircle className="defaultIcon" />,
  isCloseButton,
  ...props
}: IconButtonProps) => {
  return (
    <button 
      className={['icon-button', `icon-button--${buttonSize}`, `${active ? '' : 'icon-button--inactive'}`, isCloseButton ? 'icon-button--close-btn' : ''].join(' ')}
      onClick={props.onClick}
    >
      {icon}
    </button>
  );
};
