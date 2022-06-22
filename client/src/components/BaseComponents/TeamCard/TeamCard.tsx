import { HiCalendar, HiClipboardCheck, HiUserGroup } from "react-icons/hi";
import { Tag } from "../Tag/Tag";
import "./TeamCard.css";

export interface TeamCardProps {
  teamName: string;
  managedBy: string;
  createdAt: string;
  numberOfMembers: number;
}

export const TeamCard = ({
  teamName,
  managedBy,
  createdAt,
  numberOfMembers,
}: TeamCardProps) => {
  return (
    <div className="team-card">
      <div className="team-card--row mb-2">
        <h2 className="team-card--team-name">Team: {teamName}</h2>
      </div>
      <div className="team-card--row">
        <Tag
          extraCss="mr-2"
          icon={<HiClipboardCheck className="default-tag--icon" />}
          labelText={`Managed By: ${managedBy}`}
          size="small"
        />
        <Tag
          extraCss="mr-2"
          icon={<HiCalendar className="default-tag--icon" />}
          labelText={`Created: ${createdAt}`}
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
