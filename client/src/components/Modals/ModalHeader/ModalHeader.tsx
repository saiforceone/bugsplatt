import { HiX } from 'react-icons/hi';
import './ModalHeader.css';
import { IconButton } from '../../BaseComponents/IconButton/IconButton';

export interface ModalHeaderProps {
  icon?: React.ReactElement;
  onClose: () => void;
  subtitle?: string;
  title: string;
}

export const ModalHeader = ({
  icon,
  onClose,
  subtitle,
  title
}: ModalHeaderProps): JSX.Element => {
  return (
    <div className='modal-header'>
      {icon && <div className='modal-header--icon'>{icon}</div>}
      <div className='modal-header--content'>
        <h3 className='modal-header--content-title'>{title}</h3>
        {subtitle && <small className='modal-header--content-subtitle'>{subtitle}</small>}
      </div>
      <IconButton active buttonSize='small' icon={<HiX className='center-center' />} isCloseButton onClick={onClose} />
    </div>
  );
}