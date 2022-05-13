import { HiCheckCircle } from 'react-icons/hi';
import './iconButton.css';

export interface IconButtonProps {
  buttonSize?: 'small' | 'medium';
  onClick?: () => void;
  /** `icon` required icon that is shown on the button */
  icon: React.ReactElement;
}

export const IconButton = ({
  buttonSize = 'small',
  icon = <HiCheckCircle className="defaultIcon" />,
  ...props
}: IconButtonProps) => {
  return (
    <button 
      className={['icon-button', `icon-button--${buttonSize}`].join(' ')}
      onClick={props.onClick}
    >
      {icon}
    </button>
  );
};
