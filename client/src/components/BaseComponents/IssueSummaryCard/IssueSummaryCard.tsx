import {FC} from 'react';
import { HiCalendar } from 'react-icons/hi';
import './issueSummaryCard.css';
import { Tag } from '../Tag/Tag';
import {FEIssue} from '../../../interfaces';

export interface IssueSummaryCardProps {
  issue: FEIssue;
  onClick?: () => void;
}
// TODO: Add onClick to open modal view

export const IssueSummaryCard: FC<IssueSummaryCardProps> = ({
  issue,
  onClick,
}) => {
  return (
    <div className='issue-summary--container' onClick={onClick}>
      <div className='issue-summary--top-row'>
        <h3 className='issue-summary--heading'>{issue.title}</h3>
        <Tag
          icon={<HiCalendar className='default-tag--icon' />}
          labelText={issue.expectedCloseDate ? issue.expectedCloseDate : 'N/A'}
          size='small'
        />
      </div>
      <p className='issue-summary--description'>{issue.description}</p>
    </div>
  );
};
