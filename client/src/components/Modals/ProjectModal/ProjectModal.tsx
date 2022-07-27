import "../Modals.css";
import "./projectModal.css";
import {
  ProgressDetail,
  ProgressDetailProps,
} from "../../BaseComponents/ProgressDetail/ProgressDetail";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { IconButton } from "../../BaseComponents/IconButton/IconButton";
import {
  HiXCircle,
  HiUserGroup,
  HiUserCircle,
  HiClock,
  HiHashtag,
  HiExternalLink,
} from "react-icons/hi";
import { IssueSummaryCard } from "../../BaseComponents/IssueSummaryCard/IssueSummaryCard";
import { NoResultCard } from "../../BaseComponents/NoResultCard/NoResultCard";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

interface IssueSummary {
  resourceId: string;
  expectedCloseDate?: string;
  issueTitle: string;
  issueDesc: string;
}

export interface ProjectModalProps {
  onGoToProject: () => void;
  onCloseModal: () => void;
  resourceId: string;
  projectName: string;
  teamName: string;
  createdBy: string;
  createdAt: string;
  projectType: string;
  projectDesc: string;
  issueDetails: ProgressDetailProps;
  issues: IssueSummary[];
  projectTags: string[];
  visible: boolean;
}

export const ProjectModal = ({
  onCloseModal,
  onGoToProject,
  resourceId,
  projectName,
  teamName,
  issueDetails,
  issues = [],
  projectDesc,
  projectTags,
  createdBy,
  createdAt,
  projectType,
  visible = false,
  ...props
}: ProjectModalProps) => {
  return (
    <ModalWrapper
      modalHeaderProps={{
        extraActions: <>
          <DefaultButton
            active
            buttonSize="small"
            extraCss="mr-2"
            label="Go to Project"
            onClick={() => onGoToProject()}
            icon={<HiExternalLink className="h-5 w-5 text-white" />}
          />
        </>,
        onClose: onCloseModal,
        title: `${projectName}`
      }}
      visible={visible}
    >
      <div className="">
        <div className="modal--row flex-wrap">
          <Tag
            extraCss="modal--tag"
            icon={<HiUserGroup className="default-tag--icon" />}
            labelText={`Team: ${teamName}`}
            size="small"
          />
          <Tag
            extraCss="modal--tag"
            icon={<HiUserCircle className="default-tag--icon" />}
            labelText={`Author: ${createdBy}`}
            size="small"
          />
          <Tag
            extraCss="modal--tag"
            icon={<HiClock className="default-tag--icon" />}
            labelText={`Created: ${createdAt}`}
            size="small"
          />
          <Tag
            extraCss="modal--tag"
            icon={<HiHashtag className="default-tag--icon" />}
            labelText={projectType}
            size="small"
          />
        </div>
        <p className="modal--p">{projectDesc}</p>
        <ProgressDetail {...issueDetails} />
        {issues.length ? (
          issues.map((issue) => (
            <IssueSummaryCard
              key={`issue-summary-${issue.resourceId}`}
              {...issue}
            />
          ))
        ) : (
          <NoResultCard primaryText="No Issues Found" />
        )}
        <div>
          <h3 className="modal--section-heading">Associated Tags</h3>
        </div>
        <div className="modal--row">
          {projectTags && projectTags.length
            ? projectTags.map((projectTag) => (
              <Tag extraCss="mt-1 mr-2" labelText={projectTag} size="small" />
            ))
            : "No tags associated with this project"}
        </div>
      </div>
    </ModalWrapper>
  );
};
