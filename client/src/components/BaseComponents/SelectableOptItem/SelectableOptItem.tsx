import { FC } from "react";
import './SelectableOptItem.css';
import { SelectableOption } from "../../../interfaces";

interface SelectableOptItemProps {
  option: SelectableOption;
  selected?: boolean;
}

export const SelectableOptItem: FC<SelectableOptItemProps> = ({
  option,
  selected
}) => {
  return (
    <div className="sel-opt-item">

    </div>
  );
};
