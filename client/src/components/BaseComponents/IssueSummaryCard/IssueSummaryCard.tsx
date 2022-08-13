import {FC} from "react";
import {HiCalendar, HiCheckCircle, HiChevronDoubleUp, HiFolder, HiOutlineCheck} from "react-icons/hi";
import "./issueSummaryCard.css";
import {Tag} from "../Tag/Tag";
import {FEIssue} from "../../../interfaces";
import {DATE_FORMATS, FormattingUtils} from "../../../utils/FormattingUtils";
import {MdRadioButtonChecked, MdRadioButtonUnchecked} from 'react-icons/all';
import ProjectUtils from '../../../utils/ProjectUtils';

export interface IssueSummaryCardProps {
  issue: FEIssue;
  onClick?: () => void;
}

const statusClasses = "self-center mr-2"

export const IssueSummaryCard: FC<IssueSummaryCardProps> = (
  {
    issue,
    onClick,
  }
) => {
  return (
    <div className="issue-summary--container" onClick={onClick}>
      <div className="issue-summary--top-row">
        <h3 className="issue-summary--heading">{issue.title}</h3>
        <Tag
          icon={<HiCalendar className="default-tag--icon"/>}
          labelText={
            issue.expectedCloseDate
              ? FormattingUtils.formatDate(issue.expectedCloseDate, DATE_FORMATS.MEDIUM_DATE_TIME)
              : "Not Set"
          }
          size="small"
        />
        <Tag
          extraCss="ml-2" icon={<HiChevronDoubleUp className="self-center mr-2"/>}
          labelText={`${ProjectUtils.getLabelForIssuePriority(issue.priority)}`} size="small"
        />
        <Tag
          extraCss="ml-2" icon={<HiFolder className="self-center mr-2"/>}
          labelText={issue.associatedProject.projectName} size="small"
        />
        <Tag
          extraCss="ml-2" icon={issue.status === 'active' ? <MdRadioButtonUnchecked className={statusClasses}/> :
          <MdRadioButtonChecked className={statusClasses}/>} labelText={`Status: ${issue.status}`} size="small"
        />
      </div>
      <p className="issue-summary--description">{issue.description}</p>
    </div>
  );
};
