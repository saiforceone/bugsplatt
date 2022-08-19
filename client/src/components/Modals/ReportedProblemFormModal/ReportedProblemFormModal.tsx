import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { FE_REPORTED_PROBLEM_TYPES } from "../../../constants/appConstants";
import { NewReportedProbData } from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { ProgressLoader } from "../../BaseComponents/ProgressLoader/ProgressLoader";
import { Select } from "../../BaseComponents/Select/Select";
import { TextArea } from "../../BaseComponents/TextArea/TextArea";
import { IStandardModal } from "../modal.interfaces";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import {Tag} from '../../BaseComponents/Tag/Tag';
import {HiUserCircle} from 'react-icons/hi';

const EMPTY_PROBLEM: NewReportedProbData = {
  problemType: "",
  content: "",
};

interface ReportedProblemFormModalProps extends IStandardModal {
  userName: string;
  actionInProgress: boolean;
  onSubmit: (data: NewReportedProbData) => void;
}

export const ReportedProblemFormModal: FC<ReportedProblemFormModalProps> = ({
  actionInProgress,
  modalHeaderProps,
  onSubmit,
  userName,
  visible,
}) => {
  // State
  const [probData, setProbData] = useState(() => EMPTY_PROBLEM);

  // Hooks & Functions
  useEffect(() => {
    if (!visible) {
      setProbData(() => EMPTY_PROBLEM);
    }
  }, [visible]);

  const updateProbData = useCallback(
    (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
      setProbData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [probData]
  );

  const execSubmit = useCallback(() => {
    //basic validation

    if (!probData.problemType) {
      return alert("Select a problem type");
    }

    if (!probData.content.trim().length) {
      return alert("Please provide a description");
    }

    onSubmit(probData);
  }, [probData]);

  return (
    <ModalWrapper
      modalHeaderProps={{
        ...modalHeaderProps,
        title: "Report A Problem",
      }}
      visible={visible}
    >
      <div className="modal--container">
        <div className="modal--row">
          <Tag icon={<HiUserCircle className="default-tag--icon"/>} labelText={userName} size="small"/>
        </div>
        <Select
          id="problemType"
          name="problemType"
          onChange={(e) => updateProbData(e)}
          options={FE_REPORTED_PROBLEM_TYPES}
          placeholder="Type of Problem"
          value={probData.problemType}
        />
        <TextArea
          id="content"
          name="content"
          onChange={(e) => updateProbData(e)}
          placeholder="Describe what happened"
          value={probData.content}
        />
        <div className="modal--row justify-center">
          {actionInProgress ? (
            <ProgressLoader visible />
          ) : (
            <DefaultButton
              active
              label="Submit Problem"
              onClick={() => execSubmit()}
            />
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
