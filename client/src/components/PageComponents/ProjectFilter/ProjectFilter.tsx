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
        <ProjectFilterOption extraCss="mr-1" label="User" resetAction={() => {}} />
        <ProjectFilterOption extraCss="mr-1" label="Team" resetAction={() => {}} />
        <ProjectFilterOption extraCss="mr-1" label="Type" resetAction={() => {}} />
        <ProjectFilterOption extraCss="mr-1" label="Date" resetAction={() => {}} />
      </div>
      <div className='default-actions-container'>
        <DefaultButton active label='Apply' />
        <DefaultButton active label='Reset' />
      </div>
    </div>
  )
}
