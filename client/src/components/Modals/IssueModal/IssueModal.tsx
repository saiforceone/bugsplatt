import {
  HiCog,
  HiCalendar,
  HiChat,
  HiPlusCircle,
  HiRefresh,
} from "react-icons/hi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Comment } from "../../BaseComponents/Comment/Comment";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import "./issueModal.css";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { useAddCommentMutation, useLazyGetCommentsQuery } from "../../../data/rtkApis/commentApi";
import { FEComment } from "../../../interfaces";
import { FormattingUtils } from "../../../utils/FormattingUtils";
import { AddCommentModal } from "../AddCommentModal/AddCommentModal";

export interface IssueModalProps {
  dueDate: string;
  priority: string;
  resourceId: string;
  issueDetails: string;
  issueName: string;
  projectName: string;
  visible: boolean;
  onAddComment: () => void;
  onCloseAction: () => void;
  onManageIssue: () => void;
}

export const IssueModal = ({
  resourceId,
  dueDate = "5/23/22",
  issueName = "Issue #1",
  issueDetails,
  priority = "omg-wtf",
  projectName,
  visible = true,
  onCloseAction,
  ...props
}: IssueModalProps) => {

  const navigate = useNavigate();
  const [showAddComment, setShowAddComment] = useState(false);
  const [addComemntTrigger, addCommentResult] = useAddCommentMutation();
  const [commentsTrigger, commentsResultObj] = useLazyGetCommentsQuery();

  const refreshComments = useCallback(() => {
    commentsTrigger(resourceId);
  }, [resourceId]);

  const navigateToIssue = useCallback(() => {
    navigate(`issues/${resourceId}`);
  }, [resourceId]);

  useEffect(() => {
    commentsTrigger(resourceId);
  }, [resourceId]);

  const comments: FEComment[] = useMemo(() => {
    const { data: commentData } = commentsResultObj;
    return !!commentData ? commentData['data'] : []
  }, [commentsResultObj])

  return (
    <ModalWrapper
      modalHeaderProps={{
        extraActions: <>
          <DefaultButton
            active
            buttonSize="small"
            icon={<HiCog className="h-5 w-5 text-white" />}
            label="Manage Issue"
            onClick={() => navigateToIssue()}
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
          <div className="default-row">
            <DefaultButton
              active
              buttonSize="small"
              extraCss="mr-2"
              label="Add Comment"
              icon={<HiPlusCircle className="h-6 w-6 mr-1" />}
              onClick={() => setShowAddComment(true)}
            />
            <DefaultButton
              active
              buttonSize="small"
              label="Refresh"
              icon={<HiRefresh className="h-6 w-6 mr-1" />} 
              onClick={() => refreshComments()}
            />
          </div>
        </div>
        <div className="issue-modal--comments">
          {comments && comments.length ? (
            comments.map((comment, index) => (
              <Comment
                key={`comment-${issueName}-${index}`}
                commentText={comment.content}
                commentAuthor={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
                commentDate={FormattingUtils.formatDate(comment.createdAt)}
              />
            ))
          ) : (
            <p>No comments have been added for this issue</p>
          )}
        </div>
        <AddCommentModal
          issueName={issueName}
          onAddComment={(commentText) => {
            addComemntTrigger({
              associatedIssue: resourceId,
              content: commentText
            })
          }}
          onClose={() => setShowAddComment(false)}
          visible={showAddComment}
        />
      </div>
    </ModalWrapper>
  );
};
