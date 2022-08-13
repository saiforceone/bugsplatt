import React, {FC} from 'react';
import {ModalWrapper} from '../ModalWrapper/ModalWrapper';
import {IStandardModal} from '../modal.interfaces';
import {ProgressLoader} from '../../BaseComponents/ProgressLoader/ProgressLoader';

interface ActionDialogModalProps extends IStandardModal {
  actionInProgress: boolean;
  dialogActions: React.ReactNode;
  dialogContent: string;
}

export const ActionDialogModal: FC<ActionDialogModalProps> = (
  {
    modalHeaderProps,
    visible,
    actionInProgress,
    dialogActions,
    dialogContent,
  }
) => {
  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div>
        <p className="modal--p text-lg text-slate-600 text-center">{dialogContent}</p>
        <div className="modal--row justify-center mt-3">
          {actionInProgress ? <ProgressLoader visible={true} /> : dialogActions}
        </div>
      </div>
    </ModalWrapper>
  )
};
