import React, {FC, useCallback, useEffect, useState} from 'react';
import '../PageComponentsCommon.css';
import {FEReportedProbSearchCriteria, IStandardFilter, SelectableOption} from '../../../interfaces';
import {DefaultButton} from '../../BaseComponents/DefaultButton/DefaultButton';
import {SelectableOptionModal} from '../../Modals/SelectableOptionModal/SelectableOptionModal';
import {ProjectFilterOption} from '../ProjectFilterOption/ProjectFilterOption';
import {HiFilter, HiRefresh} from 'react-icons/hi';

interface ReportedProblemFilterProps extends IStandardFilter {
  problemStatusOptions: SelectableOption[];
  problemTypeOptions: SelectableOption[];
}

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const INITIAL_MODAL_HEADER_PROPS: ModalHeaderProps = {
  title: '',
  onClose: () => {
  }
};

type ModalTargetType = "problem-status" | "problem-type";

export const ReportedProblemFilter: FC<ReportedProblemFilterProps> = (
  {
    actionInProgress, count, problemStatusOptions, problemTypeOptions, onExecFilter, onExecNew
  }
) => {

  // State
  const [modalVisible, setModalVisible] = useState(false);
  const [problemStatus, setProblemStatus] = useState<SelectableOption | undefined>();
  const [problemType, setProblemType] = useState<SelectableOption | undefined>();

  const [modalHeaderProps, setModalHeaderProps] = useState<ModalHeaderProps>(INITIAL_MODAL_HEADER_PROPS);
  const [modalOptions, setModalOptions] = useState<SelectableOption[]>([]);
  const [modalTarget, setModalTarget] = useState<ModalTargetType | undefined>(undefined);

  // Functions

  const onApplyFilter = useCallback(() => {

    const filterObj: FEReportedProbSearchCriteria = {
      problemStatus: problemStatus?.value,
      problemType: problemType?.value,
    };

    onExecFilter(filterObj);
  }, [problemStatus, problemType, modalTarget, modalOptions]);

  const onSelectOption = useCallback((option: SelectableOption) => {
    switch (modalTarget) {
      case "problem-status":
        setProblemStatus(option);
        break;
      case "problem-type":
        setProblemType(option);
        break;
    }
    setModalVisible(false);
    setModalOptions([]);
    setModalTarget(undefined);
  }, [modalTarget, problemStatus, problemType]);

  const onShowSelectModal = useCallback((target: ModalTargetType) => {

    const onClose = () => setModalVisible(false);

    let title = '';
    let options: SelectableOption[] = [];

    switch (target) {
      case "problem-status":
        title = 'Select Problem Status';
        options = [...problemStatusOptions];
        break;
      case "problem-type":
        title = 'Select Problem Type';
        options = [...problemTypeOptions];
        break;
    }

    const headerProps: ModalHeaderProps = {
      title,
      onClose,
    }

    setModalTarget(target);
    setModalHeaderProps(headerProps);
    setModalOptions(options);
    setModalVisible(true);
  }, [modalHeaderProps]);

  const onResetOptions = useCallback(() => {
    setModalOptions([]);
    setProblemStatus(undefined);
    setProblemType(undefined);
    setModalTarget(undefined);
    onExecFilter({});
  }, [problemStatus, problemType, modalTarget]);

  return (
    <div className="common-filter">
      <span className="common-filter__count">
        {count} {count === 1 ? 'problem' : 'problems'} found
      </span>
      <div className="default-row">
        <ProjectFilterOption
          resetAction={() => setProblemStatus(undefined)} label="Status"
          onClick={() => onShowSelectModal("problem-status")} value={problemStatus}
        />
        <ProjectFilterOption
          resetAction={() => setProblemType(undefined)} label="Type" onClick={() => onShowSelectModal("problem-type")}
          value={problemType}
        />
      </div>
      <div className="default-row">
        <DefaultButton active buttonSize="small" extraCss="mr-2" icon={<HiFilter className="default-tag--icon" />} label="Apply Filter" onClick={() => onApplyFilter()}/>
        <DefaultButton active buttonSize="small" icon={<HiRefresh className="default-tag--icon" />} label="Reset Filter" onClick={() => onResetOptions()}/>
      </div>
      <SelectableOptionModal
        modalHeaderProps={modalHeaderProps} options={modalOptions}
        onSelectOption={opt => onSelectOption(opt)} visible={modalVisible}
      />
    </div>
  );
};
