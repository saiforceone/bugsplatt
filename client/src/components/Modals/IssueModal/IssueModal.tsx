import { HiXCircle } from 'react-icons/hi';
import { CommentProps } from '../../BaseComponents/Comment/Comment';
import { IconButton } from '../../BaseComponents/IconButton/IconButton';
import { BasicButton } from '../../BasicButton/BasicButton';
import './issueModal.css';

export interface IssueModalProps {
  dueDate: string;
  priority: string;
  issueDetails: string;
  issueName: string;
  projectName: string;
  comments: CommentProps[];
  visible: boolean;
  onAddComment: () => void;
  onCloseAction: () => void;
  onManageIssue: () => void;
}

export const IssueModal = ({
  dueDate = '5/23/22',
  issueName = 'Issue #1',
  priority = 'omg-wtf',
  projectName = 'Project 1',
  visible = true,
  ...props
}: IssueModalProps) => {
  // TODO: Wrap with Modal from headless ui modal
  return (
    <div className='issue-modal--container'>
      <div className="issue-modal--top-row">
        <h2>{issueName}</h2>
        <div className='issue-modal--top-buttons'>
          <BasicButton title='Manage Issue' />
          <IconButton active icon={<HiXCircle className='h-7 w-7 text-white' />} buttonSize='medium' />
        </div>
      </div>
    </div>
  );
};
