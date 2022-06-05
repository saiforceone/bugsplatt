import './ModalWrapper.css';
import { ModalHeader, ModalHeaderProps } from '../ModalHeader/ModalHeader';

export interface ModalWrapperProps {
  extraActions?: React.ReactNode;
  modalHeaderProps: ModalHeaderProps;
  visible: boolean;
  children: React.ReactElement;
}

export const ModalWrapper = ({
  extraActions,
  modalHeaderProps,
  visible = false,
  children,
}: ModalWrapperProps) => {

  return (
    visible ? (
      <div className="modal-wrapper">
        <div className="modal-wrapper--inner">
          <div className="modal-wrapper--content-wrapper">
            <div className="modal-wrapper--content">
              <ModalHeader {...modalHeaderProps} />
              {children}
            </div>
          </div>
        </div>
      </div>
      ) : null
  )
}