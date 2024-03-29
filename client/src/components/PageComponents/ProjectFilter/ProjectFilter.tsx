import { FC, useCallback, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import {
  FEDateRange,
  FEProjectSearchCriteria,
  SelectableOption,
} from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { DateRangeSelectModal } from "../../Modals/DateRangeSelectModal/DateRangeSelectModal";
import { ModalHeaderProps } from "../../Modals/ModalHeader/ModalHeader";
import { SelectableOptionModal } from "../../Modals/SelectableOptionModal/SelectableOptionModal";
import { ProjectFilterOption } from "../ProjectFilterOption/ProjectFilterOption";
import "./ProjectFilter.css";

interface ProjectFilterProps {
  onFilter: (data: FEProjectSearchCriteria) => void;
  users: SelectableOption[];
  teams: SelectableOption[];
  projectTypes: SelectableOption[];
}

type ModalTargetType =
  | "user"
  | "team"
  | "project-type"
  | "date-range"
  | "project-priorities"
  | "project-statuses";

const DefaultHeaderProps: ModalHeaderProps = {
  title: "Default Title",
  onClose: () => {},
};

export const ProjectFilter: FC<ProjectFilterProps> = ({
  onFilter,
  users = [],
  teams = [],
  projectTypes = [],
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectableOption>();
  const [selectedTeam, setSelectedTeam] = useState<SelectableOption>();
  const [selectedProjType, setSelectedProjType] = useState<SelectableOption>();

  const [modalHeaderProps, setModalHeaderProps] =
    useState<ModalHeaderProps>(DefaultHeaderProps);
  const [modalOptions, setModalOptions] = useState<SelectableOption[]>([]);
  const [selectedTarget, setSelectedTarget] =
    useState<ModalTargetType | undefined>(undefined);

  const [dateSelModalVisible, setDateSelModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState<FEDateRange>();

  // placeholder
  const onShowModal = useCallback(
    (target: ModalTargetType) => {
      // set up the props necessary for the Selectable Option Modal
      // - model header props, options
      const onClose = () => setModalVisible(false);
      let options: SelectableOption[] = [];
      let title;
      switch (target) {
        case "user":
          title = "Choose User";
          options = users;
          break;
        case "project-type":
          title = "Choose Project";
          options = projectTypes;
          break;
        case "team":
          title = "Choose Team";
          options = teams;
          break;
        default:
          title = "";
          break;
      }
      setModalHeaderProps({
        title,
        onClose,
      });
      setModalOptions(options);
      setModalVisible(true);
      setSelectedTarget(target);
    },
    [modalHeaderProps]
  );

  // placeholder
  const onOptionSelected = useCallback(
    (option: SelectableOption) => {
      switch (selectedTarget) {
        // fill out implementation
        case "user":
          setSelectedUser(option);
          break;
        case "project-type":
          setSelectedProjType(option);
          break;
        case "team":
          setSelectedTeam(option);
          break;
        default:
          break;
      }
      setModalVisible(false);
    },
    [selectedTarget, selectedUser, selectedProjType, selectedTeam]
  );

  const onResetOption = useCallback(() => {
    switch (selectedTarget) {
      case "user":
        setSelectedUser(undefined);
        break;
      case "team":
        setSelectedTeam(undefined);
        break;
      case "project-type":
        setSelectedProjType(undefined);
        break;
      default:
        break;
    }
  }, [selectedTarget, selectedTeam, selectedUser, selectedTarget]);

  const onApplyFilter = useCallback(() => {
    onFilter({
      associatedTeam: selectedTeam?.value,
      projectType: selectedProjType?.value,
      startDate: dateRange?.startDate,
      endDate: dateRange?.endDate
    });
  }, [selectedTeam, selectedProjType, dateRange]);

  const onResetAllOptions = useCallback(() => {
    setSelectedUser(undefined);
    setSelectedProjType(undefined);
    setSelectedTarget(undefined);
    setSelectedTeam(undefined);
    setDateRange(undefined);
  }, []);

  return (
    <div className="project-filter">
      <div className="project-filter--controls">
        {/* <ProjectFilterOption
          extraCss="mr-1"
          label="User"
          resetAction={onResetOption}
          onClick={() => onShowModal("user")}
          value={selectedUser}
        /> */}
        <ProjectFilterOption
          extraCss="mr-1"
          label="Team"
          resetAction={onResetOption}
          onClick={() => onShowModal("team")}
          value={selectedTeam}
        />
        <ProjectFilterOption
          extraCss="mr-1"
          label="Type"
          resetAction={onResetOption}
          onClick={() => onShowModal("project-type")}
          value={selectedProjType}
        />
        <ProjectFilterOption
          extraCss="mr-1"
          label="Date"
          onClick={() => setDateSelModalVisible(true)}
          resetAction={() => {}} 
          // TODO: Update Project filter option component to handle date range or make a new component 
          // value={}
        />
      </div>
      <div className="default-actions-container">
        <DefaultButton
          active
          extraCss="mr-2"
          label="Apply"
          onClick={onApplyFilter}
        />
        <DefaultButton
          active
          label="Reset"
          onClick={() => {
            onResetAllOptions();
            setSelectedProjType(undefined);
            setSelectedTeam(undefined);
            onFilter({});
          }}
        />
      </div>
      <SelectableOptionModal
        onSelectOption={(opt) => {
          onOptionSelected(opt);
        }}
        modalHeaderProps={modalHeaderProps}
        options={modalOptions}
        visible={modalVisible}
      />
      <DateRangeSelectModal
        modalHeaderProps={{
          extraActions: (
            <>
              <DefaultButton
                active
                buttonSize="small"
                icon={<HiRefresh className="h-5 w-5 text-white" />}
                label="Reset"
                onClick={() => {}}
              />
            </>
          ),
          title: "Choose Date Range",
          onClose: () => {
            setDateSelModalVisible(false);
          },
        }}
        onUpdate={(rangeData) => {
          console.log(rangeData);
          setDateRange(rangeData);
        }}
        visible={dateSelModalVisible}
      />
    </div>
  );
};
