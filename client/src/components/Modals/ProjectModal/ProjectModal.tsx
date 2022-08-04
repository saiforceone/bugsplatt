import {FC} from "react";
import "../Modals.css";
import "./projectModal.css";
import {
  ProgressDetail,
  ProgressDetailProps,
} from "../../BaseComponents/ProgressDetail/ProgressDetail";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
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
import {FEIssue, FEProject} from "../../../interfaces";
import { FormattingUtils } from "../../../utils/FormattingUtils";

export interface ProjectModalProps {
  onGoToProject: () => void;
  onCloseModal: () => void;
  project: FEProject;
  issueDetails: ProgressDetailProps;
  visible: boolean;
}

export const ProjectModal: FC<ProjectModalProps> = ({
  onCloseModal,
  onGoToProject,
  project,
  issueDetails,
  visible = false,
}) => {
  return (
    <ModalWrapper
      modalHeaderProps={{
        extraActions: (
          <>
            <DefaultButton
              active
              buttonSize="small"
              extraCss="mr-2"
              label="Go to Project"
              onClick={() => onGoToProject()}
              icon={<HiExternalLink className="h-5 w-5 text-white" />}
            />
          </>
        ),
        onClose: onCloseModal,
        title: `${project.projectName}`,
      }}
      visible={visible}
    >
      <div className="">
        <div className="modal--row flex-wrap">
          <Tag
            extraCss="modal--tag"
            icon={<HiUserGroup className="default-tag--icon" />}
            labelText={`Team: ${project.associatedTeam}`}
            size="small"
          />
          <Tag
            extraCss="modal--tag"
            icon={<HiUserCircle className="default-tag--icon" />}
            labelText={`Author: ${project.createdBy.firstName} ${project.createdBy.lastName}`}
            size="small"
          />
          <Tag
            extraCss="modal--tag"
            icon={<HiClock className="default-tag--icon" />}
            labelText={`Created: ${FormattingUtils.formatDate(project.createdAt)}`}
            size="small"
          />
          <Tag
            extraCss="modal--tag"
            icon={<HiHashtag className="default-tag--icon" />}
            labelText={project.projectType}
            size="small"
          />
        </div>
        <p className="modal--p">{project.description}</p>
        <ProgressDetail {...issueDetails} />
        <div className="my-4">
          {project.issues.length ? (
            project.issues.map((issue) => (
              <IssueSummaryCard
                key={`issue-summary-${issue._id}`}
                issue={issue}
              />
            ))
          ) : (
            <NoResultCard primaryText="No Issues Found" />
          )}
        </div>
        <div>
          <h3 className="modal--section-heading">Associated Tags</h3>
        </div>
        <div className="modal--row">
          {project.tags && project.tags.length
            ? project.tags.map((projectTag) => (
                <Tag extraCss="mt-1 mr-2" labelText={projectTag} size="small" />
              ))
            : "No tags associated with this project"}
        </div>
      </div>
    </ModalWrapper>
  );
};
