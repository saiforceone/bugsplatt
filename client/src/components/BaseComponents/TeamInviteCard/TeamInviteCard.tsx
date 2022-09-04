import { FC } from "react";
import { HiCalendar, HiThumbDown, HiThumbUp, HiUserCircle } from "react-icons/hi";
import { FETeamInvite } from "../../../interfaces";
import { DATE_FORMATS, FormattingUtils } from "../../../utils/FormattingUtils";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { ProgressLoader } from "../ProgressLoader/ProgressLoader";
import { Tag } from "../Tag/Tag";
import "./TeamInviteCard.css";

interface TeamInviteCardProps {
  teamInvite: FETeamInvite;
  acceptAction: () => void;
  declineAction: () => void;
  actionInProgress: boolean;
}

export const TeamInviteCard: FC<TeamInviteCardProps> = ({
  teamInvite,
  acceptAction,
  declineAction,
  actionInProgress,
}) => {
  return (
    <div className="team-invite-card">
      <div className="flex flex-1 flex-col">
        <h2 className="tic-title">{teamInvite.team.teamName}</h2>
        <div className="default-row">
          <Tag
            extraCss="mr-2"
            icon={<HiUserCircle className="default-tag--icon" />}
            labelText={`Invited by: ${teamInvite.invitedBy.firstName}`}
            size="small"
          />
          <Tag
            icon={<HiCalendar className="default-tag--icon" />}
            labelText={`Invited on: ${FormattingUtils.formatDate(
              teamInvite.createdAt,
              DATE_FORMATS["MEDIUM_DATE_TIME"]
            )}`}
            size="small"
          />
        </div>
      </div>
      <div className="default-row">
        {actionInProgress ? (<ProgressLoader visible />) : (
          <>
            <DefaultButton
              active
              extraCss="bg-green-600 mr-2"
              icon={<HiThumbUp className="default-tag--icon" />}
              label="Accept"
              onClick={acceptAction}
            />
            <DefaultButton
              active
              extraCss="bg-red-700"
              icon={<HiThumbDown className="default-tag--icon" />}
              label="Decline"
              onClick={declineAction}
            />
          </>
        )}
      </div>
    </div>
  );
};
