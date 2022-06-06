import { useState } from "react";
import { HiFilter } from "react-icons/hi";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { SelectOption } from "../../../interfaces";
import '../Modals.css';
import { Calendar } from "../../BaseComponents/Calendar/Calendar";
import { Select } from "../../BaseComponents/Select/Select";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";

export interface FilterProjectModalProps {
  onCloseModal: () => void;
  onExecuteSearch: () => void;
  projectOwnerOptions: SelectOption[];
  associatedTeamOptions: SelectOption[];
  projectTypeOptions: SelectOption[];
  visible: boolean;
}

export const FilterProjectModal = ({
  onCloseModal,
  onExecuteSearch,
  projectOwnerOptions,
  projectTypeOptions,
  associatedTeamOptions,
  visible
}: FilterProjectModalProps): JSX.Element => {
  return (
    <ModalWrapper
      modalHeaderProps={{
        onClose: onCloseModal,
        subtitle: 'Use the fields below to filter projects...',
        title: 'Filter Projects'
      }}
      visible={visible}
    >
      <div className="modal--container">
        <div className="modal--row">
          <Select
            id="filter-projects-created-by"
            labelText="Created By"
            placeholder="Created By"
            options={projectOwnerOptions}
          />
        </div>
        <div className="modal--row">
          <Select
            id="filter-projects-assoc-team"
            labelText="Assoc. Team"
            placeholder="Assoc. Team"
            options={associatedTeamOptions}
          />
        </div>
        <div className="modal--row">
          <Calendar id="filter-projects-start-date" labelText="Date Range Start" />
          <Calendar id="filter-projects-end-date" labelText="Date Range End" />
        </div>
        <div className="modal--row">
          <Select
            id="filter-projects-project-type"
            labelText="Project Type"
            options={projectTypeOptions}
          />
        </div>
        <div className="modal--row justify-center">
          <DefaultButton
            active
            icon={<HiFilter className="default-icon" />}
            label="Filter Projects"
          />
        </div>
      </div>
    </ModalWrapper>
  )
}