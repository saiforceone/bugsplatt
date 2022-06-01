import { useCallback, useState } from "react";
import "../Modals.css";
import "./newIssueModal.css";
import { HiInformationCircle, HiXCircle } from "react-icons/hi";

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

export interface NewIssueModalProps {
  onCloseModal: () => void;
  onManageWatchers: () => void;
  onManageAttachments: () => void;
  onCreateIssue: () => void;
  project: NewIssueProject;
  projectAssignees: ProjectAssignee[];
  projectPriorities: ProjectPriority[];
}

export const NewIssueModal = ({
  onCloseModal,
  onCreateIssue,
  onManageAttachments,
  onManageWatchers,
  project,
  projectAssignees,
  projectPriorities,
}: NewIssueModalProps): JSX.Element => {
  const [issueName, setIssueName] = useState("");
  const [description, setDescription] = useState("");
  const [issueTags, setIssueTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState("");
  const [issuePriority, setIssuePriority] = useState<ProjectPriority>();

  const onAddTag = useCallback(() => {
    const _issueTags = [...issueTags];
    if (_issueTags.includes(tagText)) return;
    _issueTags.push(tagText);
    setTagText('');
    setIssueTags(_issueTags);
  }, [tagText]);

  return (
    <div className="modal--container">
      <div className="modal--top-row">
        <h3>Create New Issue</h3>
        <IconButton
          active
          buttonSize="medium"
          icon={<HiXCircle className="h-7 w-7 text-white" />}
          isCloseButton
          onClick={() => onCloseModal()}
        />
      </div>
      <div>
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
        <Select id="issue-due-date" labelText="Choose Date" options={[]} />
        <Select id="issue-priority" labelText="Priority" options={projectPriorities} />
      </div>
      <div className="modal--row modal--row-extra">
        <h3>Watched By: 1 User</h3>
        <DefaultButton
          active
          label="Manage Watchers"
          buttonSize="medium"
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
          onClick={onManageAttachments}
        />
      </div>
      <TextInput
        labelText="Add Tags"
        placeholder="Type text and press 'enter' to add a tag"
        onChange={e => setTagText(e.target.value)}
        onKeyUp={e => {
          if (e.key === "Enter") {
            onAddTag();
          }
        }}
        value={tagText}
      />
      <div className="modal--row flex-wrap">
        {issueTags.length ? (
          issueTags.map((tag) => <Tag extraCss="mr-1 mt-1" labelText={tag} size="small" />)
        ) : (
          <div className="modal--row">
            <HiInformationCircle className="h-5 w-5 mr-2" />
            <span>No tags added for this issue yet</span>
          </div>
        )}
      </div>
      <DefaultButton
        active
        label="Create Issue"
        buttonSize="medium"
        onClick={onCreateIssue}
      />
    </div>
  );
};
