import {useEffect, useMemo, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {toast as toastify} from "react-toastify";
import {
  useLazyGetIssueWithIdQuery,
  useDeleteIssueMutation,
  useUpdateIssueMutation
} from "../../../data/rtkApis/issueApi";
import {
  useLazyGetCommentsQuery,
  useAddCommentMutation,
} from "../../../data/rtkApis/commentApi";
import {PageHeader} from "../../../components/Navigation/PageHeader/PageHeader";
import {FEComment, FEIssue} from "../../../interfaces";
import {NoResultCard} from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import {Tag} from "../../../components/BaseComponents/Tag/Tag";
import {SectionHeader} from "../../../components/PageComponents/SectionHeader/SectionHeader";
import {DefaultButton} from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import {
  HiArrowLeft, HiChevronDoubleUp,
  HiCog,
  HiPencilAlt,
  HiPlus,
  HiRefresh,
  HiTrash,
} from "react-icons/hi";
import {Comment} from "../../../components/BaseComponents/Comment/Comment";
import {DATE_FORMATS, FormattingUtils} from "../../../utils/FormattingUtils";
import {AddCommentModal} from "../../../components/Modals/AddCommentModal/AddCommentModal";
import {IconButton} from "../../../components/BaseComponents/IconButton/IconButton";
import {ActionDialogModal} from "../../../components/Modals/ActionDialogModal/ActionDialogModal";
import {ManageTagsModal} from "../../../components/Modals/ManageTagsModal/ManageTagsModal";
import {IssueFormModal} from '../../../components/Modals/IssueFormModal/IssueFormModal';
import {FE_PROJECT_PRIORITIES} from '../../../constants/appConstants';
import ProjectUtils from '../../../utils/ProjectUtils';
import {ProgressLoader} from '../../../components/BaseComponents/ProgressLoader/ProgressLoader';

export const IssueDetailPage = () => {
  // Hooks setup
  const navigate = useNavigate();
  const params = useParams();

  // API Queries
  const [delIssueTrigger, delIssueResultObj] = useDeleteIssueMutation();
  const [issueTrigger, issueResultObj] = useLazyGetIssueWithIdQuery();
  const [updateIssueTrigger, updateIssueResultObj] = useUpdateIssueMutation();
  const [addCommentTrigger, addCommentResultObj] = useAddCommentMutation();
  const [commentsTrigger, commentsResultObj] = useLazyGetCommentsQuery();

  // State
  const [issue, setIssue] = useState<FEIssue | undefined>();
  const [showAddComment, setShowAddComment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditIssue, setShowEditIssue] = useState(false);
  const [showManageTags, setShowManageTags] = useState(false);

  useEffect(() => {
    const {id} = params;
    if (id) {
      issueTrigger(id);
      commentsTrigger(id);
    }
  }, [params]);

  useEffect(() => {
    const {data} = issueResultObj as { [key: string]: any };
    if (data) {
      const issueData = data["data"] as FEIssue;
      setIssue(issueData);
    }
  }, [issueResultObj]);

  useEffect(() => {
    if (addCommentResultObj.isSuccess) {
      if (issue) commentsTrigger(issue._id);
    }
  }, [addCommentResultObj]);

  const comments: FEComment[] = useMemo(() => {
    try {
      const {
        data: {data},
      } = commentsResultObj as { [key: string]: any };
      if (!Array.isArray(data)) return [];
      return data as FEComment[];
    } catch (e) {
      return [];
    }
  }, [commentsResultObj]);

  useEffect(() => {
    if (delIssueResultObj.isSuccess) {
      toastify('Issue deleted!');
      setShowDeleteConfirm(false);
      navigate('/app/issues');
    }
  }, [delIssueResultObj]);

  useEffect(() => {
    if (updateIssueResultObj.isSuccess) {
      if (issue) {
        issueTrigger(issue._id);
        setShowManageTags(false);
        setShowEditIssue(false);
        toastify('Issue updated!');
      }
    }
  }, [updateIssueResultObj]);

  return (
    <div className="p-4">
      {issue ? (
        <>
          <PageHeader
            backActionElement={
              <IconButton
                active
                buttonSize="small"
                icon={<HiArrowLeft className="default-icon self-center"/>}
                onClick={() => navigate(-1)}
              />
            }
            rightActions={
              <>
                <IconButton
                  active
                  icon={<HiPencilAlt className="default-icon"/>}
                  onClick={() => setShowEditIssue(true)}
                />
                <IconButton
                  active
                  isCloseButton
                  icon={<HiTrash className="default-icon"/>}
                  onClick={() => setShowDeleteConfirm(true)}
                />
              </>
            }
            title={`Issue: ${issue.title}`}
            titleLabel={
              <Tag
                extraCss="ml-2 self-center hidden md:flex"
                icon={<HiChevronDoubleUp className="default-tag--icon"/>}
                labelText={ProjectUtils.getLabelForIssuePriority(issue.priority)}
                size="small"
              />
            }
          />
          <Tag
            extraCss="self-center my-4 md:hidden"
            icon={<HiChevronDoubleUp className="default-tag--icon"/>}
            labelText={ProjectUtils.getLabelForIssuePriority(issue.priority)}
            size="small"
          />
          <p>{issue.description}</p>
          <SectionHeader
            actions={
              <>
                <DefaultButton
                  active
                  icon={<HiCog className="default-tag--icon"/>}
                  label="Manage Tags"
                  onClick={() => setShowManageTags(true)}
                />
              </>
            }
            title="Tags"
          />
          <div className="my-3">
            {issue.tags.length ? (
              <div className="default-row">
                {issue.tags.map((tag, tagIndex) => (
                  <Tag
                    key={`tag-${tag}-${tagIndex}`}
                    extraCss="mr-2 mb-2"
                    labelText={tag}
                    size="small"
                  />
                ))}
              </div>
            ) : (
              <NoResultCard primaryText="No tags found"/>
            )}
          </div>
          <SectionHeader
            actions={
              <>
                <IconButton
                  active
                  icon={<HiPlus className="default-icon"/>}
                  onClick={() => setShowAddComment(true)}
                />
                <IconButton
                  active
                  icon={<HiRefresh className="default-icon"/>}
                  onClick={() => commentsTrigger(issue._id)}
                />
              </>
            }
            title="Comments"
            titleElementExtra={commentsResultObj.isFetching ? <ProgressLoader visible={true} /> : undefined}
          />
          <div className="my-3">
            {comments.length ? (
              <>
                {comments.map((comment) => (
                  <Comment
                    key={`comment-${comment._id}`}
                    commentAuthor={`${comment.createdBy.firstName} ${comment.createdBy.lastName}`}
                    commentText={comment.content}
                    commentDate={FormattingUtils.formatDate(
                      comment.createdAt,
                      DATE_FORMATS.MEDIUM_DATE_TIME
                    )}
                  />
                ))}
              </>
            ) : (
              <NoResultCard primaryText="No comments found"/>
            )}
          </div>

          <IssueFormModal
            actionInProgress={updateIssueResultObj.isLoading}
            execAction={issueData => {
              updateIssueTrigger({...issueData, _id: issue._id})
            }}
            onManageWatchers={() => {
            }}
            issue={issue}
            onManageAttachments={() => {
            }}
            project={{objectId: issue.associatedProject._id, projectName: issue.associatedProject.projectName}}
            projectAssignees={[]} projectPriorities={FE_PROJECT_PRIORITIES}
            visible={showEditIssue}
            modalHeaderProps={{onClose: () => setShowEditIssue(false)}}
          />

          <AddCommentModal
            issueName={issue.title}
            onAddComment={(commentData) => {
              console.log("add comment with data: ", commentData);
              addCommentTrigger({
                associatedIssue: issue._id,
                content: commentData,
              });
            }}
            onClose={() => setShowAddComment(false)}
            visible={showAddComment}
          />
          <ActionDialogModal
            actionInProgress={delIssueResultObj.isLoading}
            dialogActions={
              <>
                <DefaultButton
                  active
                  icon={<HiArrowLeft className="default-tag--icon"/>}
                  label="No"
                  onClick={() => setShowDeleteConfirm(false)}
                />
                <DefaultButton
                  active
                  extraCss="ml-2 bg-red-600"
                  icon={<HiTrash className="default-tag--icon"/>}
                  label="Delete Issue"
                  onClick={() => {
                    delIssueTrigger(issue._id);
                  }}
                />
              </>
            }
            dialogContent={`You are about to delete the issue: ${issue.title}. This action is permanent. Would you like to continue?`}
            modalHeaderProps={{
              title: `Delete Issue: ${issue.title}`,
              onClose: () => setShowDeleteConfirm(false),
            }}
            visible={showDeleteConfirm}
          />
          <ManageTagsModal
            actionInProgress={updateIssueResultObj.isLoading}
            execAction={tags => {
              updateIssueTrigger({tags, _id: issue._id});
            }}
            modalHeaderProps={{
              title: `Manage Tags for Issue: ${issue.title}`,
              onClose: () => setShowManageTags(false),
            }}
            resourceName={`Issue: ${issue.title}`}
            resourceTags={issue.tags}
            visible={showManageTags}
          />
        </>
      ) : (
        <p>Issue Not found</p>
      )}
    </div>
  );
};
