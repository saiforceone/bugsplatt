import { HiCalendar, HiClipboardCheck, HiUserGroup } from "react-icons/hi";
import { FETeam } from "../../../interfaces";
import { DATE_FORMATS, FormattingUtils } from "../../../utils/FormattingUtils";
import { Tag } from "../Tag/Tag";
import "./TeamCard.css";

export interface TeamCardProps {
  team: FETeam,
  numberOfMembers: number;
  onClick?: () => void;
}

export const TeamCard = ({
  team,
  numberOfMembers,
  onClick
}: TeamCardProps) => {
  return (
    <div className="team-card" onClick={onClick}>
      <div className="team-card--row mb-2">
        <h2 className="team-card--team-name">Team: {team.teamName}</h2>
      </div>
      <div className="team-card--row">
        <Tag
          extraCss="mr-2"
          icon={<HiClipboardCheck className="default-tag--icon" />}
          labelText={`Managed By: ${team.managedBy.firstName} ${team.managedBy.lastName}`}
          size="small"
        />
        <Tag
          extraCss="mr-2"
          icon={<HiCalendar className="default-tag--icon" />}
          labelText={`Created: ${FormattingUtils.formatDate(team.createdAt, DATE_FORMATS['MEDIUM_DATE_TIME'])}`}
          size="small"
        />
        <Tag
          icon={<HiUserGroup className="default-tag--icon" />}
          labelText={`No. of Members: ${numberOfMembers}`} 
          size="small"
        />
      </div>
    </div>
  );
};
