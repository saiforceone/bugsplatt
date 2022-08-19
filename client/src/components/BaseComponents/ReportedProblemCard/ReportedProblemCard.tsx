import { FC } from "react";
import {
  HiCalendar,
  HiHashtag,
  HiUserCircle,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from "react-icons/all";
import { FEReportedProblem } from "../../../interfaces";
import { DATE_FORMATS, FormattingUtils } from "../../../utils/FormattingUtils";
import { Tag } from "../Tag/Tag";
import "./ReportedProblemCard.css";

interface ReportedProblemCardProps {
  onClick?: () => void;
  problem: FEReportedProblem;
}

export const ReportedProblemCard: FC<ReportedProblemCardProps> = ({
  onClick,
  problem,
}) => {
  return (
    <div className="reported-prob" onClick={onClick}>
      {problem.problemStatus === "open" ? (
        <MdRadioButtonUnchecked className="reported-prob__icon" />
      ) : (
        <MdRadioButtonChecked className="reported-prob__icon" />
      )}
      <div className="reported-prob__content-container">
        <div className="default-row">
          <Tag
            extraCss="mr-2"
            icon={<HiHashtag className="default-tag--icon" />}
            labelText={problem.problemType}
            size="small"
          />
          <Tag
            extraCss="mr-2"
            icon={<HiCalendar className="default-tag--icon" />}
            labelText={FormattingUtils.formatDate(
              problem.createdAt,
              DATE_FORMATS.MEDIUM_DATE_TIME
            )}
            size="small"
          />
          <Tag
            icon={<HiUserCircle className="default-tag--icon" />}
            labelText={`${problem.createdBy.firstName} ${problem.createdBy.lastName}`}
            size="small"
          />
        </div>
        <p className="reported-prob__text">{problem.content}</p>
      </div>
    </div>
  );
};
