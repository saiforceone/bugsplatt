import { FC, useState } from "react";
import { HiX } from "react-icons/hi";
import { IconButton } from "../../BaseComponents/IconButton/IconButton";
import "./ProjectFilterOption.css";

interface ProjectFilterOptionProps {
  resetAction: () => void;
  label: string;
  value?: string;
  extraCss?: string;
}

export const ProjectFilterOption: FC<ProjectFilterOptionProps> = ({
  resetAction,
  label,
  value,
  extraCss
}) => {
  
  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <div className={["proj-filter-opt", extraCss].join(' ')}>
      <div className="proj-filter-opt--content">
        <div className="proj-filter-opt--label">
          <span className="proj-filter-opt--label-content">{label}</span>
        </div>
        <div className="proj-filter-opt--value">
          <p className={["proj-filter-opt--value-content", value ? '' : 'text-gray-400'].join(' ')}>{value ? value : 'Choose...'}</p>
        </div>
      </div>
      <IconButton
        active
        buttonSize="xsmall"
        icon={<HiX className="default-icon self-center" />}
        onClick={resetAction}
      />
    </div>
  );
};
