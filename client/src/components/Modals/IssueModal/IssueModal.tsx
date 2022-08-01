import {
  HiXCircle,
  HiCog,
  HiCalendar,
  HiChat,
  HiPlusCircle,
} from "react-icons/hi";
import { Comment, CommentProps } from "../../BaseComponents/Comment/Comment";
import { IconButton } from "../../BaseComponents/IconButton/IconButton";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import "./issueModal.css";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

export interface IssueModalProps {
  dueDate: string;
  priority: string;
  resourceId: string;
  issueDetails: string;
  issueName: string;
  projectName: string;
  comments: CommentProps[];
  visible: boolean;
  onAddComment: () => void;
  onCloseAction: () => void;
  onManageIssue: () => void;
}

export const IssueModal = ({
  resourceId = "1",
  dueDate = "5/23/22",
  issueName = "Issue #1",
  issueDetails,
  priority = "omg-wtf",
  projectName,
  visible = true,
  comments,
  onCloseAction,
  ...props
}: IssueModalProps) => {

  // TODO: add query to retrieve comments from api for the selected issue
  
  return (
    <ModalWrapper
      modalHeaderProps={{
        extraActions: <>
          <DefaultButton
            active
            buttonSize="small"
            icon={<HiCog className="h-5 w-5 text-white" />}
            label="Manage Issue"
            onClick={() => props.onManageIssue()}
          />
        </>,
        onClose: onCloseAction,
        title: `${issueName}`
      }}
      visible={visible}
    >
      <div className="issue-modal--container">
        <div className="issue-modal--tag-row">
          <Tag
            extraCss="issue-modal--tag"
            labelText={projectName}
            size="small"
          />
          <Tag
            extraCss="issue-modal--tag"
            labelText={`Priority: ${priority}`}
            size="small"
          />
          <Tag
            extraCss="issue-modal--tag"
            labelText={`Due: ${dueDate}`}
            size="small"
            icon={<HiCalendar className="default-tag--icon" />}
          />
          <Tag
            extraCss="default-tag--icon"
            labelText={`Comments: ${comments ? comments.length : 0}`}
            icon={<HiChat className="default-tag--icon" />}
            size="small"
          />
        </div>
        <h3 className="issue-modal--section-heading">Details</h3>
        <p>{issueDetails ? issueDetails : "Issue details are not available"}</p>
        <div className="issue-modal--comment-heading">
          <h3 className="issue-modal--section-heading">Comments</h3>
          <DefaultButton
            active
            buttonSize="small"
            label="Add Comment"
            icon={<HiPlusCircle className="h-6 w-6 mr-1" />}
            onClick={() => props.onAddComment()}
          />
        </div>
        <div className="issue-modal--comments">
          {comments && comments.length ? (
            comments.map((comment, index) => (
              <Comment key={`issue-${issueName}-${index}`} {...comment} />
            ))
          ) : (
            <p>No comments have been added for this issue</p>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
