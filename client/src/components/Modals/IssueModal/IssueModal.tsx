import {
  HiCog,
  HiCalendar,
  HiChat,
  HiPlusCircle,
  HiRefresh, HiCheck,
} from "react-icons/hi";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Comment } from "../../BaseComponents/Comment/Comment";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import "./issueModal.css";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { useAddCommentMutation, useLazyGetCommentsQuery } from "../../../data/rtkApis/commentApi";
import {FEComment, FEIssue, SelectableOption} from "../../../interfaces";
import {DATE_FORMATS, FormattingUtils} from "../../../utils/FormattingUtils";
import { AddCommentModal } from "../AddCommentModal/AddCommentModal";
import {ProgressLoader} from '../../BaseComponents/ProgressLoader/ProgressLoader';
import {Select} from '../../BaseComponents/Select/Select';
import {useUpdateIssueMutation} from '../../../data/rtkApis/issueApi';
import {FE_ISSUE_STATUSES} from '../../../constants/appConstants';
import {toast} from 'react-toastify';

export interface IssueModalProps {
  issue: FEIssue;
  visible: boolean;
  onCloseAction: () => void;
}

export const IssueModal: FC<IssueModalProps> = ({
  issue,
  visible = true,
  onCloseAction,
}) => {

  const navigate = useNavigate();
  const [showAddComment, setShowAddComment] = useState(false);
  const [addCommentTrigger, addCommentResult] = useAddCommentMutation();
  const [commentsTrigger, commentsResultObj] = useLazyGetCommentsQuery();
  const [updateIssueTrigger, updateIssueResult] = useUpdateIssueMutation();
  const [issueStatus, setIssueStatus] = useState<string>('');

  useEffect(() => {
    setIssueStatus(issue.status);
  }, [issue]);

  const refreshComments = useCallback(() => {
    commentsTrigger(issue._id);
  }, [issue]);

  const navigateToIssue = useCallback(() => {
    navigate(`issues/${issue._id}`);
  }, [issue]);

  useEffect(() => {
    commentsTrigger(issue._id);
  }, [issue._id, addCommentResult]);

  const comments: FEComment[] = useMemo(() => {
    const { data: commentData } = commentsResultObj as {[key: string]: any};
    return !!commentData ? commentData['data'] : []
  }, [commentsResultObj]);

  const loadingComments = useMemo(() => {
    return commentsResultObj.isFetching;
  }, [commentsResultObj]);

  useEffect(() => {
    const {data} = updateIssueResult as {[key: string]: any};
    if (!!data) {
      toast("Updated issue status...");
    }
  }, [updateIssueResult]);

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
        title: `${issue.title}`
      }}
      visible={visible}
    >
      <div className="issue-modal--container">
        <div className="issue-modal--tag-row">
          <Tag
            extraCss="issue-modal--tag"
            labelText={issue.associatedProject ? issue.associatedProject.projectName : 'Not Set'}
            size="small"
          />
          <Tag
            extraCss="issue-modal--tag"
            labelText={`Priority: ${issue.priority}`}
            size="small"
          />
          <Tag
            extraCss="issue-modal--tag"
            labelText={`Due: ${issue.expectedCloseDate ? FormattingUtils.formatDate(issue.expectedCloseDate) : 'Not Set'}`}
            size="small"
            icon={<HiCalendar className="default-tag--icon" />}
          />
          <Tag
            extraCss="issue-modal--tag"
            labelText={`Comments: ${comments ? comments.length : 0}`}
            icon={<HiChat className="default-tag--icon" />}
            size="small"
          />
        </div>
        <div className="my-6">
          <h3 className="issue-modal--section-heading">Issue Details</h3>
          <p className="issue-modal--description">{issue.description ? issue.description : "Issue details are not available"}</p>
        </div>
        <div className="my-4 modal--row items-center">
          <Select
            labelText="Change Issue Status"
            id="issueStatus"
            onChange={e => setIssueStatus(e.target.value)}
            options={FE_ISSUE_STATUSES}
            value={issueStatus}
          />
          {
            updateIssueResult.isLoading
            ? <ProgressLoader visible={true} />
            : <DefaultButton
              active={!updateIssueResult.isLoading}
              extraCss="ml-2"
              icon={<HiCheck className="h-5 w-5 text-white" />}
              label="Apply"
              onClick={() => {
                if (!issueStatus) return;
                updateIssueTrigger({status: issueStatus, _id: issue._id});
              }}
            />
          }
        </div>
        <div className="issue-modal--comment-heading">
          <div className="modal--row">
            <h3 className="issue-modal--section-heading">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>
            <ProgressLoader color="#666666" visible={loadingComments} />
          </div>
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
                key={`comment-${comment._id}-${index}`}
                commentText={comment.content}
                commentAuthor={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
                commentDate={FormattingUtils.formatDate(comment.createdAt, DATE_FORMATS.MEDIUM_DATE_TIME)}
              />
            ))
          ) : (
            <p>No comments have been added for this issue</p>
          )}
        </div>
        <AddCommentModal
          issueName={issue.title}
          onAddComment={(commentText) => {
            addCommentTrigger({
              associatedIssue: issue._id,
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
