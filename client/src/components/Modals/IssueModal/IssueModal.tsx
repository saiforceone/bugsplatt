import { Dialog } from '@headlessui/react';
import { HiXCircle, HiCog, HiCalendar, HiChat, HiPlusCircle } from 'react-icons/hi';
import { Comment, CommentProps } from '../../BaseComponents/Comment/Comment';
import { IconButton } from '../../BaseComponents/IconButton/IconButton';
import { DefaultButton } from '../../BaseComponents/DefaultButton/DefaultButton';
import './issueModal.css';
import { Tag } from '../../BaseComponents/Tag/Tag';

export interface IssueModalProps {
  dueDate: string;
  priority: string;
  resourceId: string;
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
  resourceId = '1',
  dueDate = '5/23/22',
  issueName = 'Issue #1',
  issueDetails,
  priority = 'omg-wtf',
  projectName = 'Project 1',
  visible = true,
  comments,
  ...props
}: IssueModalProps) => {
  return (
    <Dialog className="fixed z-10 inset-0 overflow-y-auto" open={visible} onClose={() => props.onCloseAction()}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="flex min-h-full items-center justify-center">
          <Dialog.Panel className="bg-white shadow-xl rounded-2xl">
            <div className='issue-modal--container'>
              <div className="issue-modal--top-row">
                <h2 className='issue-modal--issue-name'>{issueName}</h2>
                <div className='issue-modal--top-buttons'>
                  <DefaultButton active extraCss='mr-2' icon={<HiCog className='h-7 w-7 text-white' />} label='Manage Issue' onClick={() => props.onManageIssue()} />
                  <IconButton active icon={<HiXCircle className='h-7 w-7 text-white' />} isCloseButton buttonSize='medium' onClick={() => props.onCloseAction()} />
                </div>
              </div>
              <div className="issue-modal--tag-row">
                <Tag extraCss='issue-modal--tag' labelText={projectName} size='small' />
                <Tag extraCss='issue-modal--tag' labelText={`Priority: ${priority}`} size='small' />
                <Tag extraCss='issue-modal--tag' labelText={`Due: ${dueDate}`} size='small' icon={<HiCalendar className='default-tag--icon' />} />
                <Tag extraCss='default-tag--icon' labelText={`Comments: ${comments ? comments.length : 0}`} icon={<HiChat className='default-tag--icon' />} size='small' />
              </div>
              <h3 className='issue-modal--section-heading'>Details</h3>
              <p>{issueDetails ? issueDetails : 'Issue details are not available'}</p>
              <div className="issue-modal--comment-heading">
                <h3 className='issue-modal--section-heading'>Comments</h3>
                <DefaultButton active buttonSize='small' label='Add Comment' icon={<HiPlusCircle className='h-6 w-6 mr-1' />} onClick={() => props.onAddComment()} />
              </div>
              <div className="issue-modal--comments">
                {comments && comments.length ? (
                  comments.map((comment, index) => <Comment key={`issue-${issueName}-${index}`} {...comment} />)
                ) : (<p>No comments have been added for this issue</p>)}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
