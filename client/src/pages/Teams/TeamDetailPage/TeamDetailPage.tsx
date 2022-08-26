import { useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiBan,
  HiCalendar,
  HiCog,
  HiMail,
  HiPencilAlt,
  HiTrash,
  HiUserCircle,
  HiUserGroup,
} from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { DefaultButton } from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import { IconButton } from "../../../components/BaseComponents/IconButton/IconButton";
import { NoResultCard } from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import { Tag } from "../../../components/BaseComponents/Tag/Tag";
import { TeamUserCard } from "../../../components/BaseComponents/TeamUserCard/TeamUserCard";
import { TextInput } from "../../../components/BaseComponents/TextInput/TextInput";
import { TeamFormModal } from "../../../components/Modals/TeamFormModal/TeamFormModal";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { SectionHeader } from "../../../components/PageComponents/SectionHeader/SectionHeader";
import { useLazyGetTeamByIdQuery } from "../../../data/rtkApis/teamApi";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { FETeam } from "../../../interfaces";
import { DATE_FORMATS, FormattingUtils } from "../../../utils/FormattingUtils";

export const TeamDetailPage = () => {
  // state
  const [showEditModal, setShowEditModal] = useState(false);
  const [team, setTeam] = useState<FETeam | undefined>();
  const [filterText, setFilterText] = useState("");

  // hooks
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useCurrentUser();
  const [teamTrigger, teamResultObj] = useLazyGetTeamByIdQuery();

  useEffect(() => {
    const { id } = params;
    if (id) {
      teamTrigger(id);
    }
  }, [params]);

  useEffect(() => {
    const { data } = teamResultObj as { [key: string]: any };
    if (teamResultObj.isSuccess) {
      try {
        const { data: teamApiData } = data;
        setTeam(teamApiData as FETeam);
      } catch (e) {
        console.log(
          `Failed to load team data from api with error: ${
            (e as Error).message
          }`
        );
      }
    }
  }, [teamResultObj]);

  return (
    <div className="p-4">
      {team ? (
        <>
          <PageHeader
            backActionElement={
              <IconButton
                active
                buttonSize="small"
                icon={<HiArrowLeft className="default-tag--icon" />}
                onClick={() => navigate(-1)}
              />
            }
            rightActions={
              <>
                <DefaultButton
                  active
                  icon={<HiPencilAlt className="default-tag--icon" />}
                  label="Edit Team"
                  onClick={() => setShowEditModal(true)}
                />
                <DefaultButton
                  active
                  extraCss="bg-red-600 ml-3"
                  icon={<HiTrash className="default-tag--icon" />}
                  label="Delete Team"
                />
              </>
            }
            title={`Manage Team: ${team.teamName}`}
          />
          <p>{team.teamDescription}</p>
          <div className="my-4 default-row">
            <Tag
              extraCss="mr-2 mb-2"
              icon={<HiUserGroup className="default-tag--icon" />}
              labelText={`No of users: ${team.teamMembers.length}`}
              size="small"
            />
            <Tag
              extraCss="mr-2 mb-2"
              icon={<HiCalendar className="default-tag--icon" />}
              labelText={`${FormattingUtils.formatDate(
                team.createdAt,
                DATE_FORMATS["MEDIUM_DATE_TIME"]
              )}`}
              size="small"
            />
            <Tag
              extraCss="mb-2"
              icon={<HiUserCircle className="default-tag--icon" />}
              labelText={`${team.managedBy.firstName} ${team.managedBy.lastName}`}
              size="small"
            />
          </div>
          <SectionHeader
            title={`Members (${team.teamMembers.length})`}
            titleElementExtra={
              <div className="w-1/3">
                <TextInput
                  labelText=""
                  onChange={(e) => setFilterText(e.target.value)}
                  value={filterText}
                />
              </div>
            }
            actions={
              <>
                <DefaultButton
                  active
                  icon={<HiMail className="default-tag--icon" />}
                  label="Invite"
                />
              </>
            }
          />
          <div className="my-2">
            {team.teamMembers.length ? (
              team.teamMembers.map((member) => (
                <TeamUserCard
                  actions={
                    <>
                      {currentUser?._id === member._id ? (
                        <Tag
                          extraCss="bg-slate-400 cursor-not-allowed"
                          icon={<HiBan className="default-tag--icon" />}
                          labelText="This is you"
                          size="small"
                        />
                      ) : (
                        <DefaultButton
                          active
                          icon={<HiCog className="default-tag--icon" />}
                          label="Manage"
                        />
                      )}
                    </>
                  }
                  key={`team-memeber-${member._id}`}
                  user={member}
                />
              ))
            ) : (
              <NoResultCard />
            )}
          </div>
          <TeamFormModal 
            actionInProgress={false}
            modalHeaderProps={{
              title: `Edit Team: ${team.teamName}`,
              onClose: () => setShowEditModal(false)
            }}
            onExecAction={teamData => {
              console.log('on exec action with data: ', teamData);
            }}
            team={team}
            visible={showEditModal}
          />
          {/* TODO: Add invite modal after modifying it */}
        </>
      ) : (
        <div>{/* TODO: Fill in with empty / 404-content component */}</div>
      )}
    </div>
  );
};
