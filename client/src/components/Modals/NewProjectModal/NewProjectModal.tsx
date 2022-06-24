import { FC, useCallback, useState } from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { NewProjectData, ProjectType } from '../../../interfaces';
import { DefaultButton } from '../../BaseComponents/DefaultButton/DefaultButton';
import { Select } from '../../BaseComponents/Select/Select';
import { TextArea } from '../../BaseComponents/TextArea/TextArea';
import { TextInput } from '../../BaseComponents/TextInput/TextInput';
import '../Modals.css';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';

export interface NewProjectModalProps {
  onCloseModal: () => void;
  onCreateProject: (data: NewProjectData) => void;
  visible: boolean;
  projectTypes: ProjectType[];
}

export const NewProjectModal: FC<NewProjectModalProps> = ({
  onCloseModal,
  onCreateProject,
  projectTypes,
  visible
}) => {

  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectType, setProjectType] = useState('');
  const [colorCode, setColorCode] = useState('');

  const onExecCreateProject = useCallback(() => {
    // TODO validation / error handling
    onCreateProject({
      projectName,
      projectDesc,
      projectType,
      colorCode
    });
  }, [projectName, projectDesc, projectType, colorCode])

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
        <TextInput labelText={`(Optional) Color Code ${colorCode}`} placeholder='Color Code' type='color' value={colorCode} onChange={e => setColorCode(e.target.value)} />
        <div className="modal--row justify-center">
          <DefaultButton active label='Create Project' onClick={onExecCreateProject} icon={<HiCheckCircle className='default-tag--icon' />} />
        </div>
      </div>
    </ModalWrapper>
  )
}