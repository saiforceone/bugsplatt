import { useCallback, useRef, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { SelectableOption } from "../../../interfaces";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
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

// TODO: render out attachements that have been added, determine correct data type for files / attachments

export const ReportIssueModal = ({
  teamName,
  userName,
  issueTypes,
  visible,
  onClose,
  onReportIssue,
}: ReportIssueModalProps) => {

  const [issueType, setIssueType] = useState('');
  const [issueDetail, setIssueDetail] = useState('');
  const [fileBlobs, setFileBlobs] = useState([]);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onAddFile = useCallback((file: any) => {
    const _blobs = [...fileBlobs];
    _blobs.push(file);
    setFileBlobs(_blobs);
  }, [fileBlobs]);

  const onExecuteSubmit = useCallback(() => {
    if (!issueType || !issueDetail) {
      return alert('Choose an issue or describe what happened before continuiing.');
    }

    onReportIssue({issueType, issueDetail});
  }, [issueType, issueDetail]);

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
          <Tag
            labelText={`Team: ${teamName}`}
            size="small"
            extraCss="mr-2"
          />
          <Tag
            labelText={`User: ${userName}`}
            size="small"
          />
        </div>
        <div className="modal--row mt-4">
          <p className="text-lg">Use the fields below to describe the issue you would like to report.</p>
        </div>
        <div className="modal--row">
          <Select
            labelText="Type of Issue"
            id="issue-type"
            options={issueTypes}
            onChange={e => setIssueType(e.target.value)}
            value={issueType}
          />
        </div>
        <div className="modal--row">
          <TextArea
            placeholder="Enter information about the issue encountered"
            labelText="Describe what Happened"
            onChange={e => setIssueDetail(e.target.value)}
            rows={4}
            value={issueDetail}
          />
        </div>
        <div className="modal--row justify-between">
          <h3>Attachments ({fileBlobs.length})</h3>
          <input
            onChange={e => {
              onAddFile(e.target.files[0]);
            }}
            ref={fileInput}
            style={{display: 'none'}} type='file'
          />
          <DefaultButton active label="Add Attachment" onClick={() => {
            fileInput.current?.click();
          }} />
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
