import { FC } from "react";
import { HiCheck } from "react-icons/hi";
import "./SelectableOptItem.css";
import { SelectableOption } from "../../../interfaces";

interface SelectableOptItemProps {
  option: SelectableOption;
  selected?: boolean;
  onSelectOption: () => void;
}

export const SelectableOptItem: FC<SelectableOptItemProps> = ({
  option,
  selected,
  onSelectOption,
}) => {
  return (
    <div className="sel-opt-item" onClick={onSelectOption}>
      <div className="sel-opt-item--container">
        <p className="sel-opt-item--label">{option.label}</p>
      </div>
      {selected && <HiCheck className="h-6 w-6 text-green-800 self-center" />}
    </div>
  );
};
