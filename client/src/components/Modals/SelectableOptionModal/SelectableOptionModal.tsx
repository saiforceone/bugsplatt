import { FC, useEffect, useState } from "react";
import { SelectableOption } from "../../../interfaces";
import { NoResultCard } from "../../BaseComponents/NoResultCard/NoResultCard";
import { SelectableOptItem } from "../../BaseComponents/SelectableOptItem/SelectableOptItem";
import { TextInput } from "../../BaseComponents/TextInput/TextInput";
import { IStandardModal } from "../modal.interfaces";
import { ModalHeaderProps } from "../ModalHeader/ModalHeader";
import "../Modals.css";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

interface SelectableOptionModalProps extends IStandardModal {
  modalHeaderProps: ModalHeaderProps;
  options: SelectableOption[];
  value?: SelectableOption;
  onSelectOption: (opt: SelectableOption) => void;
}

export const SelectableOptionModal: FC<SelectableOptionModalProps> = ({
  modalHeaderProps,
  options,
  value,
  visible,
  onSelectOption,
}) => {

  const [filterText, setFilterText] = useState('');
  const [_options, _setOptions] = useState<SelectableOption[]>([])

  useEffect(() => {
    if (filterText) {
      const _opts = _options.filter(v => v.label.toLowerCase().includes(filterText.toLowerCase()));
      _setOptions(_opts);
    } else {
      _setOptions(options);
    }
  }, [filterText, options]);

  return (
    <ModalWrapper modalHeaderProps={modalHeaderProps} visible={visible}>
      <div className="modal--container modal--container-sm">
        <TextInput labelText="" onChange={e => setFilterText(e.target.value)} placeholder="Type to filter options..." value={filterText} />

        <hr className="mb-2" />
        <div>
          {Array.isArray(_options) ? (
            _options.map((opt) => (
              <SelectableOptItem
                key={opt.value}
                option={opt}
                onSelectOption={() => onSelectOption(opt)}
                selected={opt.value === value?.value}
              />
            ))
          ) : (
            <NoResultCard primaryText="No items available for selection" />
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
