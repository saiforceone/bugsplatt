import React, {FC} from 'react';
import {ModalWrapper} from '../ModalWrapper/ModalWrapper';
import {IStandardModal} from '../modal.interfaces';
import {FEReportedProblem} from '../../../interfaces';
import {StackedLabel} from '../../BaseComponents/StackedLabel/StackedLabel';
import {DATE_FORMATS, FormattingUtils} from '../../../utils/FormattingUtils';

interface ReportedProblemDetailModalProps extends IStandardModal {
  problem: FEReportedProblem;
}

export const ReportedProblemDetailModal: FC<ReportedProblemDetailModalProps> = (
  {
    modalHeaderProps,
    problem,
    visible
  }
) => {
  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div className="modal--container">
        <StackedLabel label="Reported By" content={`${problem.createdBy.firstName} ${problem.createdBy.lastName}`}/>
        <StackedLabel
          label="Reported On"
          content={FormattingUtils.formatDate(problem.createdAt, DATE_FORMATS['MEDIUM_DATE_TIME'])}
        />
        <StackedLabel
          label="Description of what happened" content={problem.content}
        />
        <StackedLabel
          label="Type of Problem" content={problem.problemType}
        />
        <StackedLabel
          label="Problem Status" content={problem.problemStatus}
        />
        <StackedLabel
          label="Last Updated"
          content={FormattingUtils.formatDate(problem.updatedAt, DATE_FORMATS['MEDIUM_DATE_TIME'])}
        />
      </div>
    </ModalWrapper>
  );
};
