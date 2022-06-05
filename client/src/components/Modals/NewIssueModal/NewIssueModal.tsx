import { useCallback, useState } from "react";
import "../Modals.css";
import "./newIssueModal.css";
import { HiCheckCircle, HiDocumentAdd, HiEye, HiInformationCircle, HiX, HiXCircle } from "react-icons/hi";

import {
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

export interface NewIssueModalProps {
  onCloseModal: () => void;
  onManageWatchers: () => void;
  onManageAttachments: () => void;
  onCreateIssue: () => void;
  project: NewIssueProject;
  projectAssignees: ProjectAssignee[];
  projectPriorities: ProjectPriority[];
  visible: boolean;
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
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [issueTags, setIssueTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [issuePriority, setIssuePriority] = useState<string | undefined>();
  const [issueDueDate, setIssueDueDate] = useState("");
  // TODO: Figure out how to store the attachements in this component before upload

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

  return (
    <ModalWrapper
      modalHeaderProps={{
        onClose: onCloseModal,
        title: 'Create New Issue'
      }}
      visible={visible}
    >
      <div className="">
        <div className="modal--container">
          <div className="modal--row">
            <Tag labelText={`Project: ${project.projectName}`} size="small" />
          </div>
          <TextInput
            labelText="Issue Name"
            id="new-issue-name"
            onChange={(e) => setIssueName(e.target.value)}
            value={issueName}
          />
          <TextArea
            labelText="Describe the issue"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <div className="modal--row">
            <Calendar
              labelText="Choose Date"
              id="issue-due-date"
              onChange={e => setIssueDueDate(e.target.value)}
              value={issueDueDate}
            />
            <Select
              id="issue-priority"
              labelText="Priority"
              options={projectPriorities}
              onChange={(e) => setIssuePriority(e.target.value)}
              value={issuePriority}
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
            <h3>Attachments (1)</h3>
            <DefaultButton
              active
              label="Add Attachments"
              buttonSize="medium"
              icon={<HiDocumentAdd className="default--icon mt-1" />}
              onClick={onManageAttachments}
            />
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
              onClick={onCreateIssue}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};
