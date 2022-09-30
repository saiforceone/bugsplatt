import {FC} from 'react';
import {ModalWrapper} from '../ModalWrapper/ModalWrapper';
import {IStandardModal} from '../modal.interfaces';
import {FECommonUserData} from '../../../interfaces';
import {StackedLabel} from "../../BaseComponents/StackedLabel/StackedLabel";
import {FormattingUtils} from "../../../utils/FormattingUtils";

interface TeamInfoModalProps extends IStandardModal {
  user: FECommonUserData;
}

export const TeamInfoModal: FC<TeamInfoModalProps> = ({modalHeaderProps, visible, user}) => {
  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div className="modal--container">
        <StackedLabel label="User's name" content={`${user.firstName} ${user.lastName}`} />
        <StackedLabel label="User's email" content={user.emailAddress} />
        <StackedLabel label="Date Joined" content={`${FormattingUtils.formatDate(user.createdAt)}`} />
      </div>
    </ModalWrapper>
  );
};
