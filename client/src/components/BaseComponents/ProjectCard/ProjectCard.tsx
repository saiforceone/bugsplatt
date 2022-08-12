import './projectCard.css';
import { ProgressDetailProps, ProgressDetail } from '../ProgressDetail/ProgressDetail';
import { Tag } from '../Tag/Tag';
import {HiHashtag, HiUserCircle, HiUserGroup} from 'react-icons/hi';

export interface ProjectCardProps {
  projectName: string;
  teamName: string;
  projectType: string;
  createdBy: string;
  progressDetail: ProgressDetailProps;
  onClick?: () => void;
}

export const ProjectCard = ({
  projectName = 'Project #1',
  teamName = 'SuperAwesome',
  projectType = 'web-app',
  createdBy,
  progressDetail = {
    label: 'Issues',
    currentValue: 12,
    maxValue: 17
  },
  onClick,
}: ProjectCardProps) => {
  return (
    <div className='project-card--container' onClick={onClick}>
      <h2 className='project-card--project-name'>{projectName}</h2>
      <div className='default-row'>
        <Tag extraCss='mb-1 mr-1' icon={<HiUserGroup className="default-tag--icon" />} labelText={teamName} size='small' />
        <Tag extraCss='mb-1 mr-1' icon={<HiHashtag className="default-tag--icon" />} labelText={projectType} size='small' />
        <Tag extraCss='mb-1' icon={<HiUserCircle className="default-tag--icon" />} labelText={createdBy} size='small' />
      </div>
      <ProgressDetail {...progressDetail} />
    </div>
  )
}
