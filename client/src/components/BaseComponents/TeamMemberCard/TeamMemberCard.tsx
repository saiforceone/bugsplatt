import { FC } from "react";
import { HiCog, HiUserCircle } from "react-icons/hi";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import "./TeamMemberCard.css";

export interface TeamMemberCardProps {
  manageAction: () => void;
  emailAddress: string;
  userFullname: string;
}

export const TeamMemberCard: FC<TeamMemberCardProps> = ({
  manageAction,
  emailAddress,
  userFullname,
}) => {
  return (
    <div className="team-member-card">
      <HiUserCircle className="w-7 h-7 self-center mr-2" />
      <div className="flex flex-col flex-1 mr-2">
        <h3 className='team-member-card--name'>{userFullname}</h3>
        <small className="team-member-card--email">{emailAddress}</small>
      </div>
      <DefaultButton active icon={<HiCog className="default-tag--icon" />} label="Manage User" onClick={manageAction} buttonSize="small" />
    </div>
  );
};
