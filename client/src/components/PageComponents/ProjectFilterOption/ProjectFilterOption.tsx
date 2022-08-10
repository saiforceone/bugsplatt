import { FC, useState } from "react";
import { HiX } from "react-icons/hi";
import { FEDateRange, SelectableOption } from "../../../interfaces";
import { IconButton } from "../../BaseComponents/IconButton/IconButton";
import "./ProjectFilterOption.css";

interface ProjectFilterOptionProps {
  onClick?: () => void;
  resetAction: () => void;
  label: string;
  value?: SelectableOption;
  extraCss?: string;
}

export const ProjectFilterOption: FC<ProjectFilterOptionProps> = ({
  onClick,
  resetAction,
  label,
  value,
  extraCss,
}) => {
  console.log('value: ', value);
  return (
    <div className={["proj-filter-opt", extraCss].join(" ")}>
      <div className="proj-filter-opt--content" onClick={onClick}>
        <div className="proj-filter-opt--label">
          <span className="proj-filter-opt--label-content">{label}</span>
        </div>
        <div className="proj-filter-opt--value">
          <p
            className={[
              "proj-filter-opt--value-content",
              value ? "" : "text-gray-400",
            ].join(" ")}
          >
            {value ? value.label : "Choose..."}
          </p>
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
