import { HiCalendar } from 'react-icons/hi';
import './issueSummaryCard.css';
import { Tag } from '../Tag/Tag';

export interface IssueSummaryCardProps {
  resourceId: string;
  issueTitle: string;
  expectedCloseDate?: string;
  issueDesc: string;
  onClick?: () => void;
}
// TODO: Add onClick to open modal view

export const IssueSummaryCard = ({
  resourceId,
  issueTitle,
  expectedCloseDate,
  issueDesc,
  onClick,
}: IssueSummaryCardProps) => {
  return (
    <div className='issue-summary--container' onClick={onClick}>
      <div className='issue-summary--top-row'>
        <h3 className='issue-summary--heading'>{issueTitle}</h3>
        <Tag
          icon={<HiCalendar className='default-tag--icon' />}
          labelText={expectedCloseDate ? expectedCloseDate : 'N/A'}
          size='small'
        />
      </div>
      <p className='issue-summary--description'>{issueDesc}</p>
    </div>
  );
};
