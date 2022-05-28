import { useState } from 'react';
import '../Modals.css';
import './newIssueModal.css';
import { HiXCircle } from 'react-icons/hi';

import { NewIssueProject, ProjectAssignee, ProjectPriority } from '../../../interfaces';
import { IconButton } from '../../BaseComponents/IconButton/IconButton';
import { Tag } from '../../BaseComponents/Tag/Tag';
import { TextInput } from '../../BaseComponents/TextInput/TextInput';

export interface NewIssueModalProps {
  onCloseModal: () => void;
  onManageWatchers: () => void;
  onManageAttachments: () => void;
  onCreateIssue: () => void;
  project: NewIssueProject;
  projectAssignees: ProjectAssignee[];
  projectPriorities: ProjectPriority[];
}

export const NewIssueModal = ({
  onCloseModal,
  onCreateIssue,
  onManageAttachments,
  onManageWatchers,
  project,
  projectAssignees,
  projectPriorities
}: NewIssueModalProps): JSX.Element => {

  const [issueName, setIssueName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className='modal--container'>
      <div className="modal--top-row">
        <h3>Create New Issue</h3>
        <IconButton
          active
          buttonSize='medium'
          icon={<HiXCircle className='h-7 w-7 text-white' />}
          isCloseButton
          onClick={() => onCloseModal()}
        />
      </div>
      <div>
        <Tag labelText={`Project: ${project.projectName}`} size='small' />
      </div>
      <TextInput labelText='Issue Name' id='new-issue-name' onChange={e => setIssueName(e.target.value)} value={issueName} />
      <TextInput labelText='Describe the issue' onChange={e => setDescription(e.target.value)} value={description} />

    </div>
  );
};

