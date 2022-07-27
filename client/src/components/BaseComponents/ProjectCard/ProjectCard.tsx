import './projectCard.css';
import { ProgressDetailProps, ProgressDetail } from '../ProgressDetail/ProgressDetail';
import { Tag } from '../Tag/Tag';

export interface ProjectCardProps {
  projectName: string;
  teamName: string;
  progressDetail: ProgressDetailProps;
  onClick?: () => void;
}

export const ProjectCard = ({
  projectName = 'Project #1',
  teamName = 'SuperAwesome',
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
      <Tag labelText={teamName} size='small' />
      <ProgressDetail {...progressDetail} />
    </div>
  )
}