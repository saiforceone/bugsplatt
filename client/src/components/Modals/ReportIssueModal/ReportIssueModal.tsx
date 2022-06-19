import { ChangeEvent, useCallback, useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { SelectableOption } from "../../../interfaces";
import { FormattingUtils } from "../../../utils/FormattingUtils";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { FileAttachmentCard } from "../../BaseComponents/FileAttachmentCard/FileAttachmentCard";
import { HiddenFileInput } from "../../BaseComponents/HiddenFileInput/HiddenFileInput";
import { NoResultCard } from "../../BaseComponents/NoResultCard/NoResultCard";
import { Select } from "../../BaseComponents/Select/Select";
import { Tag } from "../../BaseComponents/Tag/Tag";
import { TextArea } from "../../BaseComponents/TextArea/TextArea";
import "../Modals.css";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";

interface ReportIssueModalProps {
  teamName: string;
  userName: string;
  issueTypes: SelectableOption[];
  visible: boolean;
  onClose: () => void;
  onReportIssue: (data: object) => void;
}

export const ReportIssueModal = ({
  teamName,
  userName,
  issueTypes,
  visible,
  onClose,
  onReportIssue,
}: ReportIssueModalProps) => {
  const [issueType, setIssueType] = useState("");
  const [issueDetail, setIssueDetail] = useState("");
  const [fileBlobs, setFileBlobs] = useState<File[]>([]);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onAddFile = useCallback(
    (file: File) => {
      const _blobs = [...fileBlobs];
      _blobs.push(file);
      setFileBlobs(_blobs);
    },
    [fileBlobs]
  );

  const onRemoveFile = useCallback(
    (index: number) => {
      const _blobs = [...fileBlobs];
      _blobs.splice(index, 1);
      setFileBlobs(_blobs);
    },
    [fileBlobs]
  );

  const onExecuteSubmit = useCallback(() => {
    if (!issueType || !issueDetail) {
      return alert(
        "Choose an issue or describe what happened before continuiing."
      );
    }

    onReportIssue({ issueType, issueDetail, fileBlobs });
  }, [issueType, issueDetail, fileBlobs]);

  return (
    <ModalWrapper
      modalHeaderProps={{
        onClose,
        title: "Report an Issue",
      }}
      visible={visible}
    >
      <div className="modal--container">
        <div className="modal--row">
          <Tag labelText={`Team: ${teamName}`} size="small" extraCss="mr-2" />
          <Tag labelText={`User: ${userName}`} size="small" />
        </div>
        <div className="modal--row mt-4">
          <p className="text-lg">
            Use the fields below to describe the issue you would like to report.
          </p>
        </div>
        <div className="modal--row">
          <Select
            labelText="Type of Issue"
            id="issue-type"
            options={issueTypes}
            onChange={(e) => setIssueType(e.target.value)}
            value={issueType}
          />
        </div>
        <div className="modal--row">
          <TextArea
            placeholder="Enter information about the issue encountered"
            labelText="Describe what Happened"
            onChange={(e) => setIssueDetail(e.target.value)}
            rows={4}
            value={issueDetail}
          />
        </div>
        <div className="modal--row justify-between">
          <h3 className="uppercase text-lg font-medium">Attachments ({fileBlobs.length})</h3>
          <HiddenFileInput
            buttonText="Add Attachment"
            onAddFile={onAddFile}
          />
        </div>
        <div className="my-2">
          {fileBlobs.length ? (
            fileBlobs.map((file, index) => (
              <FileAttachmentCard
                key={`attachment-${index}`}
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
        <div className="modal--row justify-center">
          <DefaultButton
            active
            icon={<HiCheckCircle className="default--icon" />}
            label="Submit"
            onClick={onExecuteSubmit}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
