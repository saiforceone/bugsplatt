import { FC, useCallback, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { ProjectType } from '../../../interfaces';
import { DefaultButton } from '../../BaseComponents/DefaultButton/DefaultButton';
import { Select } from '../../BaseComponents/Select/Select';
import { TextArea } from '../../BaseComponents/TextArea/TextArea';
import { TextInput } from '../../BaseComponents/TextInput/TextInput';
import '../Modals.css';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';

export interface NewProjectModalProps {
  onCloseModal: () => void;
  onCreateProject: (data: object) => void;
  visible: boolean;
  projectOwner: string;
  projectTypes: ProjectType[];
}

export const NewProjectModal: FC<NewProjectModalProps> = ({
  onCloseModal,
  onCreateProject,
  projectOwner,
  projectTypes,
  visible
}) => {

  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectType, setProjectType] = useState('');

  const onExecCreateProject = useCallback(() => {
    // TODO validation / error handling
    onCreateProject({
      projectName,
      projectDesc,
      projectType
    });
  }, [projectName, projectDesc, projectType])

  return (
    <ModalWrapper
      visible={visible}
      modalHeaderProps={{
        title: 'New Project',
        onClose: onCloseModal
      }}
    >
      <div className="modal--container">
        <TextInput labelText='Project Name' placeholder='Project name...' onChange={e => setProjectName(e.target.value)} value={projectName} />
        <TextArea labelText='Project Description' placeholder='Describe the project' rows={4} value={projectDesc} onChange={e => setProjectDesc(e.target.value)} />
        <Select
          id='new-project-type'
          labelText='Project Type'
          options={projectTypes}
          onChange={e => setProjectType(e.target.value)}
          value={projectType}
        />
        <div className="modal--row justify-center">
          <DefaultButton active label='Create Project' onClick={onExecCreateProject} icon={<HiCheckCircle className='default-tag--icon' />} />
        </div>
      </div>
    </ModalWrapper>
  )
}