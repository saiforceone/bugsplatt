import { FC, useCallback, useState } from "react";
import { HiCheck, HiPlus, HiRefresh } from "react-icons/hi";
import {FEIssueSearchCriteria, SelectableOption} from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { ModalHeaderProps } from "../../Modals/ModalHeader/ModalHeader";
import { SelectableOptionModal } from "../../Modals/SelectableOptionModal/SelectableOptionModal";
import { ProjectFilterOption } from "../ProjectFilterOption/ProjectFilterOption";
import "./ProjectIssueFilter.css";
import {IconButton} from "../../BaseComponents/IconButton/IconButton";

interface ProjectIssueFilterProps {
  projectPriorities: SelectableOption[];
  projectStatuses: SelectableOption[];
  issueCount: number;
  onFilterIssues: (data: FEIssueSearchCriteria) => void;
  onNewIssue?: () => void;
}

type ModalTargetType = "proj-priorities" | "proj-statuses";

const DefaultHeaderProps: ModalHeaderProps = {
  title: "",
  onClose: () => {},
};

export const ProjectIssueFilter: FC<ProjectIssueFilterProps> = ({
  projectPriorities,
  projectStatuses,
  onFilterIssues,
  onNewIssue,
  issueCount = 0,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPriority, setSelectedPriority] =
    useState<SelectableOption | undefined>();
  const [selectedStatus, setSelectedStatus] =
    useState<SelectableOption | undefined>();

  const [modalHeaderProps, setModalHeaderProps] =
    useState<ModalHeaderProps>(DefaultHeaderProps);
  const [modalOptions, setModalOptions] = useState<SelectableOption[]>([]);
  const [selectedTarget, setSelectedTarget] =
    useState<ModalTargetType | undefined>(undefined);

    const onApplyFiler = useCallback(() => {
      onFilterIssues({
        priority: selectedPriority?.value,
        status: selectedStatus?.value,
      });
    }, [selectedPriority, selectedStatus, modalOptions, selectedTarget]);

    const onSelectOption = useCallback((option: SelectableOption) => {
      switch (selectedTarget) {
        case "proj-priorities":
          setSelectedPriority(option);
          break;
        case "proj-statuses":
          setSelectedStatus(option);
          break;
      }
      setModalVisible(false);
    }, [selectedPriority, selectedStatus, selectedTarget]);

    const showModal = useCallback((target: ModalTargetType) => {

      const onClose = () => setModalVisible(false);
      let title = '';
      let options: SelectableOption[] = [];

      switch (target) {
        case "proj-priorities":
          title = 'Choose Project Priority';
          options = projectPriorities;
          break;
        case "proj-statuses":
          title = "Choose Project Status"
          options = projectStatuses;
          break;
      }

      setModalHeaderProps({
        onClose,
        title,
      });
      setModalOptions(options);
      setModalVisible(true);
      setSelectedTarget(target);
    }, [modalHeaderProps]);

  const onResetAction = useCallback(() => {
    setSelectedPriority(undefined);
    setSelectedStatus(undefined);
    setSelectedTarget(undefined);
    setModalOptions([]);
    onFilterIssues({});
  }, [selectedPriority, selectedStatus, selectedTarget, modalOptions]);

  return (
    <div className="project-issue-filter">
      <span className="project-filter--issue-count">
        {issueCount} {issueCount === 1 ? "issue" : "issues"}
      </span>
      <div className="project-issue--filter-container">
        <ProjectFilterOption
          label="Priority"
          onClick={() => showModal("proj-priorities")}
          resetAction={() => setSelectedPriority(undefined)}
          value={selectedPriority}
        />
        <ProjectFilterOption
          label="Status"
          onClick={() => showModal("proj-statuses")}
          resetAction={() => setSelectedStatus(undefined)}
          value={selectedStatus}
        />
      </div>
      <div className="project-issue--actions">
        <IconButton
          active
          buttonSize="small"
          icon={<HiCheck className="default-icon" />}
          onClick={onApplyFiler}
        />
        <IconButton
          active
          buttonSize="small"
          icon={<HiRefresh className="default-icon" />}
          onClick={onResetAction}
        />
        {typeof onNewIssue === 'function' && <IconButton
          active
          buttonSize="small"
          icon={<HiPlus className="default-icon" />}
          onClick={onNewIssue}
        />}
      </div>
      <SelectableOptionModal
        modalHeaderProps={modalHeaderProps}
        options={modalOptions}
        onSelectOption={(opt) => onSelectOption(opt)}
        visible={modalVisible}
      />
    </div>
  );
};
