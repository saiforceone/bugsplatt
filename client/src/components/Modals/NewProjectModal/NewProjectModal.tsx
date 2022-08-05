import { ChangeEvent, FC, useCallback, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { NewProjectData, ProjectType, SelectOption } from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { Select } from "../../BaseComponents/Select/Select";
import { TextArea } from "../../BaseComponents/TextArea/TextArea";
import { TextInput } from "../../BaseComponents/TextInput/TextInput";
import "../Modals.css";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

export interface NewProjectModalProps {
  onCloseModal: () => void;
  onCreateProject: (data: NewProjectData) => void;
  visible: boolean;
  projectTypes: ProjectType[];
  teams: SelectOption[];
}

const emptyProjectData: NewProjectData = {
  associatedTeam: "",
  description: "",
  projectName: "",
  projectType: "",
  colorCode: "",
};

export const NewProjectModal: FC<NewProjectModalProps> = ({
  onCloseModal,
  onCreateProject,
  projectTypes,
  teams = [],
  visible,
}) => {
  const [projectData, setProjectData] = useState(emptyProjectData);

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
        title: "New Project",
        onClose: onCloseModal,
      }}
    >
      <div className="modal--container">
        <Select
          name="associatedTeam"
          id="new-project-team"
          labelText="Team"
          options={teams}
          onChange={(e) => onUpdateProjectData(e)}
          value={projectData.associatedTeam}
        />
        <TextInput
          name="projectName"
          labelText="Project Name"
          placeholder="Project name..."
          onChange={(e) => onUpdateProjectData(e)}
          value={projectData.projectName}
        />
        <TextArea
          id="description"
          name="description"
          labelText="Project Description"
          placeholder="Describe the project"
          rows={4}
          value={projectData.description}
          onChange={(e) => onUpdateProjectData(e)}
        />
        <Select
          name="projectType"
          id="new-project-type"
          labelText="Project Type"
          options={projectTypes}
          onChange={(e) => onUpdateProjectData(e)}
          value={projectData.projectType}
        />
        <TextInput
          name="colorCode"
          labelText={`(Optional) Color Code ${projectData.colorCode}`}
          placeholder="Color Code"
          type="color"
          value={projectData.colorCode}
          onChange={(e) => onUpdateProjectData(e)}
        />
        <div className="modal--row justify-center">
          <DefaultButton
            active
            label="Create Project"
            onClick={onExecCreateProject}
            icon={<HiCheckCircle className="default-tag--icon" />}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
