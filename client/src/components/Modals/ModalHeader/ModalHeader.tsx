import React, {FC} from 'react';
import { HiX } from 'react-icons/hi';
import './ModalHeader.css';
import { IconButton } from '../../BaseComponents/IconButton/IconButton';

export interface ModalHeaderProps {
  extraActions?: React.ReactNode;
  icon?: React.ReactElement;
  onClose: () => void;
  subtitle?: string;
  title: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  extraActions,
  icon,
  onClose,
  subtitle,
  title
}) => {
  return (
    <div className='modal-header'>
      {icon && <div className='modal-header--icon'>{icon}</div>}
      <div className='modal-header--content'>
        <h3 className='modal-header--content-title'>{title}</h3>
        {subtitle && <small className='modal-header--content-subtitle'>{subtitle}</small>}
      </div>
      {extraActions && <div className='modal-header--extra-actions'>
        {extraActions}
      </div>}
      <IconButton active buttonSize='small' icon={<HiX className='center-center' />} isCloseButton onClick={onClose} />
    </div>
  );
}
