import '../Modals.css';
import './projectModal.css';
import { ProgressDetail, ProgressDetailProps } from '../../BaseComponents/ProgressDetail/ProgressDetail';
import { Tag } from '../../BaseComponents/Tag/Tag';
import { DefaultButton } from '../../BaseComponents/DefaultButton/DefaultButton';
import { IconButton } from '../../BaseComponents/IconButton/IconButton';
import { HiXCircle, HiUserGroup, HiUserCircle, HiClock, HiHashtag } from 'react-icons/hi';


interface IssueSummary {
  expectedCloseDate?: Date;
  title: string;
  description: string;
}

export interface ProjectModalProps {
  onGoToProject: () => void;
  onCloseModal: () => void;
  resourceId: string;
  projectName: string;
  teamName: string;
  createdBy: string;
  createdAt: string;
  projectType: string;
  projectDesc: string;
  issueDetails: ProgressDetailProps;
  issues: IssueSummary[];
  projectTags: string[];
}

export const ProjectModal = ({
  onCloseModal,
  onGoToProject,
  resourceId,
  projectName,
  teamName,
  issueDetails,
  issues,
  projectDesc,
  projectTags,
  createdBy,
  createdAt,
  projectType,
  ...props
}: ProjectModalProps) => {
  // TODO: complete implementation, wrap with dialog component
  return (
    <div className='modal--container'>
      <div className="modal--top-row">
        <h2 className='modal--main-heading'>{projectName}</h2>
        <div className='modal--top-buttons-container'>
          <DefaultButton active buttonSize='medium' extraCss='mr-2' label='Go to Project' onClick={() => onGoToProject()}/>
          <IconButton active icon={<HiXCircle className='default-icon' />} isCloseButton buttonSize='medium' onClick={() => onCloseModal()} />
        </div>
      </div>
      <div className="modal--row flex-wrap">
        <Tag extraCss='modal--tag' icon={<HiUserGroup className='default-tag--icon' />} labelText={`Team: ${teamName}`} size='small' />
        <Tag extraCss='modal--tag' icon={<HiUserCircle className='default-tag--icon' />} labelText={`Author: ${createdBy}`} size='small' />
        <Tag extraCss='modal--tag' icon={<HiClock className='default-tag--icon' />} labelText={`Created: ${createdAt}`} size='small' />
        <Tag extraCss='modal--tag' icon={<HiHashtag className='default-tag--icon' />} labelText={projectType} size='small' />
      </div>
      <p className='modal--p'>{projectDesc}</p>
      <ProgressDetail {...issueDetails} /> 
      <div>
        <h3 className='modal--section-heading'>Associated Tags</h3>
      </div>
      <div className='modal--row'>
        {projectTags && projectTags.length ? projectTags.map(projectTag => <Tag extraCss='mt-1 mr-2' labelText={projectTag} size='small' />) : 'No tags associated with this project'}
      </div>
    </div>
  )
}