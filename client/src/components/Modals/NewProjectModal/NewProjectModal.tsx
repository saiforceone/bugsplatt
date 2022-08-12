import {ChangeEvent, FC, ReactElement, useCallback, useEffect, useState} from "react";
import {HiCheckCircle} from "react-icons/hi";
import {FEProject, NewProjectData, ProjectType, SelectOption} from "../../../interfaces";
import {DefaultButton} from "../../BaseComponents/DefaultButton/DefaultButton";
import {Select} from "../../BaseComponents/Select/Select";
import {TextArea} from "../../BaseComponents/TextArea/TextArea";
import {TextInput} from "../../BaseComponents/TextInput/TextInput";
import "../Modals.css";
import {ModalWrapper} from "../ModalWrapper/ModalWrapper";
import {ProgressLoader} from '../../BaseComponents/ProgressLoader/ProgressLoader';
import {FormControlNotificationType} from '../../FormControlNotification/FormControlNotification';

export interface NewProjectModalProps {
  actionInProgress: boolean;
  onCloseModal: () => void;
  onCreateProject: (data: NewProjectData) => void;
  visible: boolean;
  projectTypes: ProjectType[];
  teams: SelectOption[];
  project?: FEProject;
  overrideActions?: ReactElement;
}

const emptyProjectData: NewProjectData = {
  associatedTeam: "",
  description: "",
  projectName: "",
  projectType: "",
  colorCode: "",
};

export const NewProjectModal: FC<NewProjectModalProps> = ({
  actionInProgress = false,
  onCloseModal,
  onCreateProject,
  projectTypes,
  teams = [],
  visible,
  project,
  overrideActions
}) => {
  const [projectData, setProjectData] = useState(emptyProjectData);
  const [isNewProject, setIsNewProject] = useState(true);

  useEffect(() => {
    if (project) {
      // construct the project data from the current project
      const _data: NewProjectData = {
        associatedTeam: project.associatedTeam._id,
        colorCode: project.colorCode,
        projectType: project.projectType,
        description: project.description,
        projectName: project.projectName
      }
      setProjectData(_data);
      setIsNewProject(false);
    }
  }, []);

  const onExecCreateProject = useCallback(() => {
    // TODO validation / error handling
    onCreateProject(projectData);
  }, [projectData]);

  const onUpdateProjectData = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setProjectData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  return (
    <ModalWrapper
      visible={visible}
      modalHeaderProps={{
        extraActions: overrideActions,
        title: isNewProject ? "New Project" : "Edit Project",
        onClose: onCloseModal,
      }}
    >
      <div className="modal--container">
        <Select
          disabled={actionInProgress}
          name="associatedTeam"
          id="new-project-team"
          labelText="Team"
          options={teams}
          onChange={(e) => onUpdateProjectData(e)}
          value={projectData.associatedTeam}
          fieldNotification={!projectData.associatedTeam ? {
            notificationType: FormControlNotificationType.error,
            notificationText: "This project needs a team"
          } : undefined}
        />
        <TextInput
          disabled={actionInProgress}
          name="projectName"
          labelText="Project Name"
          placeholder="Project name..."
          onChange={(e) => onUpdateProjectData(e)}
          value={projectData.projectName}
          fieldNotification={!projectData.projectName ? {
            notificationType: FormControlNotificationType.error,
            notificationText: "This project needs a name and make it a cool one"
          } : undefined}
        />
        <TextArea
          disabled={actionInProgress}
          id="description"
          name="description"
          labelText="Project Description"
          placeholder="Describe the project"
          rows={4}
          value={projectData.description}
          onChange={(e) => onUpdateProjectData(e)}
          fieldNotification={!projectData.description ? {
            notificationType: FormControlNotificationType.error,
            notificationText: "This project needs a cool but descriptive description"
          } : undefined}
        />
        <Select
          disabled={actionInProgress}
          name="projectType"
          id="new-project-type"
          labelText="Project Type"
          options={projectTypes}
          onChange={(e) => onUpdateProjectData(e)}
          value={projectData.projectType}
          fieldNotification={!projectData.projectType ? {
            notificationType: FormControlNotificationType.error,
            notificationText: "This project needs a project type"
          } : undefined}
        />
        <TextInput
          disabled={actionInProgress}
          name="colorCode"
          labelText={`(Optional) Color Code ${projectData.colorCode}`}
          placeholder="Color Code"
          type="color"
          value={projectData.colorCode}
          onChange={(e) => onUpdateProjectData(e)}
        />
        <div className="modal--row justify-center">
          {actionInProgress ? <ProgressLoader visible={actionInProgress}/> :
            <DefaultButton
              active={!actionInProgress}
              label={isNewProject ? "Create Project" : "Update Project"}
              onClick={onExecCreateProject}
              icon={<HiCheckCircle className="default-tag--icon"/>}
            />
          }
        </div>
      </div>
    </ModalWrapper>
  );
};
