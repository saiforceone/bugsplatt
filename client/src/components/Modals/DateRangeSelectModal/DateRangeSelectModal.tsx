import { ChangeEvent, FC, useState } from "react";
import { HiCheck } from "react-icons/hi";
import { FEDateRange } from "../../../interfaces";
import { Calendar } from "../../BaseComponents/Calendar/Calendar";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { IStandardModal } from "../modal.interfaces";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

const INITIAL_DATE_RANGE: FEDateRange = {
  startDate: "",
  endDate: "",
};

interface DateRangeSelectModalProps extends IStandardModal {
  onUpdate: (data: FEDateRange) => void;
}

export const DateRangeSelectModal: FC<DateRangeSelectModalProps> = ({
  modalHeaderProps,
  visible,
  onUpdate,
}) => {
  const [dateRange, setDateRange] = useState<FEDateRange>(
    () => INITIAL_DATE_RANGE
  );

  const onSetDateField = (e: ChangeEvent<HTMLInputElement>) => {
    setDateRange(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <ModalWrapper
      modalHeaderProps={{
        ...modalHeaderProps,
        extraActions: <>
          <DefaultButton active label="Reset" onClick={() => setDateRange({...INITIAL_DATE_RANGE})} />
        </>
      }}
      visible={visible}
    >
      <>
        <div className="modal--container modal--container-sm">
          <Calendar
            labelText="Start Date"
            name="startDate"
            onChange={(e) => onSetDateField(e)}
            value={dateRange.startDate}
          />
          <Calendar
            labelText="End Date"
            name="endDate"
            onChange={(e) => onSetDateField(e)}
            value={dateRange.endDate}
          />
        </div>
        <div className="modal--row justify-center">
          <DefaultButton
            active
            icon={<HiCheck className="h-5 w-5 text-white" />}
            label="Set Date Range"
            onClick={() => onUpdate(dateRange)}
          />
        </div>
      </>
    </ModalWrapper>
  );
};
