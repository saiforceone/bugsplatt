import './ModalWrapper.css';

export interface ModalWrapperProps {
  visible: boolean;
  children: React.ReactElement;
}

export const ModalWrapper = ({
  visible = false,
  children,
}: ModalWrapperProps) => {

  return (
    visible ? (
      <div className="modal-wrapper">
        <div className="modal-wrapper--inner">
          <div className="modal-wrapper--content-wrapper">
            <div className="modal-wrapper--content">
              {children}
            </div>
          </div>
        </div>
      </div>
      ) : null
  )
}