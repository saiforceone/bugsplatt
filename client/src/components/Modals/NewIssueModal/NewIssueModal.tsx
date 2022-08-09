import {ChangeEvent, useCallback, useState} from "react";
import "../Modals.css";
import "./newIssueModal.css";
import {
  HiCheckCircle,
  HiDocumentAdd,
  HiEye,
  HiInformationCircle,
  HiX,
  HiXCircle,
} from "react-icons/hi";

import {
  NewIssueData,
  NewIssueProject,
  ProjectAssignee,
  ProjectPriority,
} from "../../../interfaces";
import { IconButton } from "../../BaseComponents/IconButton/IconButton";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { TextInput } from "../../BaseComponents/TextInput/TextInput";
import { TextArea } from "../../BaseComponents/TextArea/TextArea";
import { Select } from "../../BaseComponents/Select/Select";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { Calendar } from "../../BaseComponents/Calendar/Calendar";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { FileAttachmentCard } from "../../BaseComponents/FileAttachmentCard/FileAttachmentCard";
import { NoResultCard } from "../../BaseComponents/NoResultCard/NoResultCard";
import { FormattingUtils } from "../../../utils/FormattingUtils";
import { HiddenFileInput } from "../../BaseComponents/HiddenFileInput/HiddenFileInput";

export interface NewIssueModalProps {
  onCloseModal: () => void;
  onManageWatchers: () => void;
  onManageAttachments: () => void;
  onCreateIssue: (data: NewIssueData) => void;
  project: NewIssueProject;
  projectAssignees: ProjectAssignee[];
  projectPriorities: ProjectPriority[];
  visible: boolean;
}

const INITIAL_ISSUE_DATA: NewIssueData = {
  tags: [],
  associatedProject: '',
  description: '',
  title: '',
  priority: '',
}

export const NewIssueModal = ({
  onCloseModal,
  onCreateIssue,
  onManageAttachments,
  onManageWatchers,
  visible,
  project,
  projectAssignees,
  projectPriorities,
}: NewIssueModalProps): JSX.Element => {

  const [issueData, setIssueData] = useState<NewIssueData>(() => ({...INITIAL_ISSUE_DATA}));
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [issueTags, setIssueTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [issuePriority, setIssuePriority] = useState<string | undefined>();
  const [issueDueDate, setIssueDueDate] = useState("");
  const [fileBlobs, setFileBlobs] = useState<File[]>([]);

  const onUpdateData = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    try {
      setIssueData(prevState => ({...prevState, [e.target.name]: e.target.value}));
    } catch (e) {
      console.log('onUpdateData error: ', (e as Error).message)
    }
  };

  const onAddTag = useCallback(() => {
    const _issueTags = [...issueTags];
    if (_issueTags.includes(tagText)) return;
    _issueTags.push(tagText);
    setTagText("");
    setIssueTags(_issueTags);
  }, [tagText]);

  const onRemoveTag = useCallback(
    (tagIndex: number) => {
      const _issueTags = [...issueTags];
      console.log(`remove tag with index: ${tagIndex}`);
      _issueTags.splice(tagIndex, 1);
      setIssueTags(_issueTags);
    },
    [issueTags]
  );

  const onAddFile = useCallback((file: File) => {
    const _fileBlobs = [...fileBlobs];
    _fileBlobs.push(file);
    setFileBlobs(_fileBlobs);
  }, [fileBlobs]);

  const onRemoveFile = useCallback((index: number) => {
    const _fileBlobs = [...fileBlobs];
    _fileBlobs.splice(index, 1);
    setFileBlobs(_fileBlobs);
  }, [fileBlobs]);

  return (
    <ModalWrapper
      modalHeaderProps={{
        onClose: onCloseModal,
        title: "Create New Issue",
      }}
      visible={visible}
    >
      <div className="">
        <div className="modal--container">
          <div className="modal--row">
            <Tag labelText={`Project: ${project.projectName}`} size="small" />
          </div>
          <TextInput
            name="title"
            labelText="Issue Name"
            id="new-issue-name"
            onChange={(e) => onUpdateData(e)}
            value={issueData.title}
          />
          <TextArea
            name="description"
            labelText="Describe the issue"
            onChange={(e) => onUpdateData(e)}
            value={issueData.description}
          />
          <div className="modal--row">
            <Calendar
              name="expectedCloseDate"
              labelText="Choose Date"
              id="issue-due-date"
              onChange={(e) => onUpdateData(e)}
              value={issueData.expectedCloseDate}
            />
            <Select
              name="priority"
              id="issue-priority"
              labelText="Priority"
              options={projectPriorities}
              onChange={(e) => onUpdateData(e)}
              value={issueData.priority}
            />
          </div>
          <div className="modal--row modal--row-extra">
            <h3>Watched By: 1 User</h3>
            <DefaultButton
              active
              label="Manage Watchers"
              buttonSize="medium"
              icon={<HiEye className="default--icon mt-1" />}
              onClick={onManageWatchers}
            />
          </div>
          <div className="modal--row modal--row-extra">
            {/* TODO: Implement functionality on backend for file uploads and figure out how to represent within this component before upload */}
            <h3 className="uppercase text-lg">Attachments ({fileBlobs.length})</h3>

            <HiddenFileInput
              buttonText="Add Attachment"
              onAddFile={onAddFile}
            />
          </div>
          <div>
            {fileBlobs.length ? (
              fileBlobs.map((file, index) => (
                <FileAttachmentCard
                  key={`file-attachment-${index}`}
                  fileName={file.name}
                  fileSize={`${FormattingUtils.formatBytes(file.size)}`}
                  removeAction={() => onRemoveFile(index)}
                />
              ))
            ) : (
              <NoResultCard
                primaryText="No files attached"
                secondaryText="Click the button above to add attachments"
              />
            )}
          </div>
          <TextInput
            labelText="Add Tags"
            placeholder="Type text and press 'enter' to add a tag"
            onChange={(e) => setTagText(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onAddTag();
              }
            }}
            value={tagText}
          />
          <div className="modal--row flex-wrap">
            {issueTags.length ? (
              issueTags.map((tag, index) => (
                <Tag
                  key={`new-issue-tag-${index}-${tag}`}
                  extraCss="mr-1 mt-1"
                  labelText={tag}
                  size="small"
                  actionElements={
                    <HiX
                      className="h-5 w-5 ml-2 mt-1"
                      onClick={() => onRemoveTag(index)}
                    />
                  }
                />
              ))
            ) : (
              <div className="modal--row">
                <HiInformationCircle className="h-5 w-5 mr-2" />
                <span>No tags added for this issue yet</span>
              </div>
            )}
          </div>
          <div className="modal--row justify-center">
            <DefaultButton
              active
              label="Create Issue"
              buttonSize="medium"
              icon={<HiCheckCircle className="default--icon mt-1" />}
              onClick={() => onCreateIssue(issueData)}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
