import { FC, useCallback, useState } from "react";
import { SelectableOption } from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { ModalHeaderProps } from "../../Modals/ModalHeader/ModalHeader";
import { SelectableOptionModal } from "../../Modals/SelectableOptionModal/SelectableOptionModal";
import { ProjectFilterOption } from "../ProjectFilterOption/ProjectFilterOption";
import './ProjectFilter.css';

interface ProjectFilterProps {
  onFilter: () => void;
  users: SelectableOption[];
  teams: SelectableOption[];
  projectTypes: SelectableOption[];
}

type ModalTargetType = "user" | "team" | "project" | "date-range";

const DefaultHeaderProps: ModalHeaderProps = {
  title: 'Default Title',
  onClose: () => {}
}

export const ProjectFilter: FC<ProjectFilterProps> = ({
  onFilter,
  users,
  teams,
  projectTypes
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectableOption>();
  const [selectedTeam, setSelectedTeam] = useState<SelectableOption>();
  const [selectedProjType, setSelectedProjType] = useState<SelectableOption>();

  const [modalHeaderProps, setModalHeaderProps] = useState<ModalHeaderProps>(DefaultHeaderProps);
  const [modalOptions, setModalOptions] = useState<SelectableOption[]>([]);

  // placeholder
  const onShowModal = useCallback((target: ModalTargetType) => {
    // set up the props necessary for the Selectable Option Modal
    // - model header props, options
  }, []);

  // placeholder
  const onOptionSelected = useCallback((target: ModalTargetType) => {
    switch (target) {
      // fill out implementation
      default: 
        break;
    }
  }, []);

  return (
    <div className="project-filter">
      <div className="project-filter--controls">
        <ProjectFilterOption extraCss="mr-1" label="User" resetAction={() => {}} />
        <ProjectFilterOption extraCss="mr-1" label="Team" resetAction={() => {}} />
        <ProjectFilterOption extraCss="mr-1" label="Type" resetAction={() => {}} />
        <ProjectFilterOption extraCss="mr-1" label="Date" resetAction={() => {}} />
      </div>
      <div className='default-actions-container'>
        <DefaultButton active label='Apply' />
        <DefaultButton active label='Reset' />
      </div>
      <SelectableOptionModal
        onSelectOption={(opt) => {}}
        modalHeaderProps={modalHeaderProps}
        options={modalOptions}
        visible={modalVisible}
      />
    </div>
  )
}
