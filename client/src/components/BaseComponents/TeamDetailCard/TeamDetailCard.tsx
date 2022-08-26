import {FC} from 'react';
import { FETeam } from '../../../interfaces';
import { DATE_FORMATS, FormattingUtils } from '../../../utils/FormattingUtils';
import { IStandardModal } from '../../Modals/modal.interfaces';
import { ModalWrapper } from '../../Modals/ModalWrapper/ModalWrapper';
import { StackedLabel } from '../StackedLabel/StackedLabel';

interface TeamDetailCardProps extends IStandardModal {
  team: FETeam;
}

export const TeamDetailCard:FC<TeamDetailCardProps> = (
  {
    modalHeaderProps,
    team,
    visible
  }
) => {

  const managedBy = `${team.managedBy.firstName} ${team.managedBy.lastName}`;

  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div className="modal--container">
        <StackedLabel content={team.teamName} label='Team Name' />
        <StackedLabel content={team.teamDescription} label='Team Details' />
        <StackedLabel content={FormattingUtils.formatDate(team.createdAt, DATE_FORMATS['MEDIUM_DATE_TIME'])} label='Created' />
        <StackedLabel content={managedBy} label='Managed By' />
      </div>
    </ModalWrapper>
  );
};
