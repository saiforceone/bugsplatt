import { FC, useCallback, useState } from "react";
import { SelectableOption } from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { ProjectFilterOption } from "../ProjectFilterOption/ProjectFilterOption";
import './ProjectFilter.css';

interface ProjectFilterProps {
  onFilter: () => void;
  users: SelectableOption[];
  teams: SelectableOption[];
  projectTypes: SelectableOption[];
}

export const ProjectFilter: FC<ProjectFilterProps> = ({
  onFilter,
  users,
  teams,
  projectTypes
}) => {
  return (
    <div className="project-filter">
      <div className="project-filter--controls">
        <ProjectFilterOption label="User" resetAction={() => {}} />
        <ProjectFilterOption label="Team" resetAction={() => {}} />
        <ProjectFilterOption label="Type" resetAction={() => {}} />
        <ProjectFilterOption label="Date" resetAction={() => {}} />
      </div>
      <div className='default-actions-container'>
        <DefaultButton active label='Apply' />
        <DefaultButton active label='Reset' />
      </div>
    </div>
  )
}
