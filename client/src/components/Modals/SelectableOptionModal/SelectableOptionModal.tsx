import { FC } from "react";
import { SelectableOption } from "../../../interfaces";
import { IStandardModal } from "../modal.interfaces";
import { ModalHeaderProps } from "../ModalHeader/ModalHeader";
import '../Modals.css';
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

interface SelectableOptionModalProps extends IStandardModal {
  modalHeaderProps: ModalHeaderProps;
  options: SelectableOption[];
  value?: SelectableOption;
  onSelectOption: (opt: SelectableOption) => void;
}

export const SelectableOptionModal: FC<SelectableOptionModalProps> = ({
  modalHeaderProps,
  options,
  value,
  visible,
  onSelectOption
}) => {
  return (
    <ModalWrapper
      modalHeaderProps={modalHeaderProps}
      visible={visible}
    >
      <div className="modal--container">
        
      </div>
    </ModalWrapper>
  )
}