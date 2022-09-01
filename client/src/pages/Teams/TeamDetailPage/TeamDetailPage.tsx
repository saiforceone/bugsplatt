import {useEffect, useMemo, useState} from "react";
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
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {DefaultButton} from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import {IconButton} from "../../../components/BaseComponents/IconButton/IconButton";
import {NoResultCard} from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import {Tag} from "../../../components/BaseComponents/Tag/Tag";
import {TeamUserCard} from "../../../components/BaseComponents/TeamUserCard/TeamUserCard";
import {TextInput} from "../../../components/BaseComponents/TextInput/TextInput";
import {ActionDialogModal} from "../../../components/Modals/ActionDialogModal/ActionDialogModal";
import {TeamFormModal} from "../../../components/Modals/TeamFormModal/TeamFormModal";
import {PageHeader} from "../../../components/Navigation/PageHeader/PageHeader";
import {SectionHeader} from "../../../components/PageComponents/SectionHeader/SectionHeader";
import {
  useDeleteTeamMutation,
  useLazyGetTeamByIdQuery,
  useUpdateTeamMutation,
} from "../../../data/rtkApis/teamApi";
import {useCreateInviteMutation, useLazyGetInvitesForTeamQuery} from '../../../data/rtkApis/teamInviteApi';
import {useCurrentUser} from "../../../hooks/useCurrentUser";
import {FECommonUserData, FETeam, FETeamInvite} from "../../../interfaces";
import {DATE_FORMATS, FormattingUtils} from "../../../utils/FormattingUtils";
import {TeamInviteModal} from "../../../components/BaseComponents/TeamInviteModal/TeamInviteModal";

export const TeamDetailPage = () => {
  // state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [team, setTeam] = useState<FETeam | undefined>();
  const [filterText, setFilterText] = useState("");
  const [selectedUser, setSelectedUser] =
    useState<FECommonUserData | undefined>();

  // hooks
  const navigate = useNavigate();
  const params = useParams();
  const {currentUser} = useCurrentUser();
  const [teamTrigger, teamResultObj] = useLazyGetTeamByIdQuery();
  const [updateTeamTrigger, updateTeamResultObj] = useUpdateTeamMutation();
  const [deleteTeamTrigger, deleteTeamResultObj] = useDeleteTeamMutation();
  const [inviteUsersTrigger, inviteUsersResultObj] = useCreateInviteMutation();
  const [invitesTrigger, invitesResultObj] = useLazyGetInvitesForTeamQuery()

  useEffect(() => {
    const {id} = params;
    if (id) {
      teamTrigger(id);
      invitesTrigger(id);
    }
  }, [params]);

  useEffect(() => {
    const {data} = teamResultObj as { [key: string]: any };
    if (teamResultObj.isSuccess) {
      try {
        const {data: teamApiData} = data;
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

  useEffect(() => {
    if (updateTeamResultObj.isSuccess && team) {
      teamTrigger(team._id);
      setShowEditModal(false);
      setShowInviteModal(false);
      setSelectedUser(undefined);
    }
  }, [updateTeamResultObj, team]);

  useEffect(() => {
    if (deleteTeamResultObj.isSuccess) {
      toast("The team was deleted successfully! Redirecting...");
      navigate("/app/teams");
    }
  }, [deleteTeamResultObj]);

  const inviteList: FECommonUserData[] = useMemo(() => {
    try {
      const {data: {data}} = invitesResultObj as { [key: string]: any };
      console.log('data for invites: ', data);
      return (data as FETeamInvite[])
        .map(invite => invite.invitedUser)
        .filter(invite => invite.firstName.includes(filterText) || invite.lastName.includes(filterText));
    } catch (e) {
      return [];
    }
  }, [invitesResultObj, filterText]);

  return (
    <div className="p-4">
      {team ? (
        <>
          <PageHeader
            backActionElement={
              <IconButton
                active
                buttonSize="small"
                icon={<HiArrowLeft className="default-tag--icon"/>}
                onClick={() => navigate(-1)}
              />
            }
            rightActions={
              <>
                <DefaultButton
                  active
                  icon={<HiPencilAlt className="default-tag--icon"/>}
                  label="Edit Team"
                  onClick={() => setShowEditModal(true)}
                />
                <DefaultButton
                  active
                  extraCss="bg-red-600 ml-3"
                  icon={<HiTrash className="default-tag--icon"/>}
                  label="Delete Team"
                  onClick={() => setShowDeleteModal(true)}
                />
              </>
            }
            title={`Manage Team: ${team.teamName}`}
          />
          <p>{team.teamDescription}</p>
          <div className="my-4 default-row">
            <Tag
              extraCss="mr-2 mb-2"
              icon={<HiUserGroup className="default-tag--icon"/>}
              labelText={`No of users: ${team.teamMembers.length}`}
              size="small"
            />
            <Tag
              extraCss="mr-2 mb-2"
              icon={<HiCalendar className="default-tag--icon"/>}
              labelText={`${FormattingUtils.formatDate(
                team.createdAt,
                DATE_FORMATS["MEDIUM_DATE_TIME"]
              )}`}
              size="small"
            />
            <Tag
              extraCss="mb-2"
              icon={<HiUserCircle className="default-tag--icon"/>}
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
                  icon={<HiMail className="default-tag--icon"/>}
                  label="Invite"
                  onClick={() => setShowInviteModal(true)}
                />
              </>
            }
          />
          <div className="my-2">
            {team.teamMembers.length ? (
              team.teamMembers
                .filter(
                  (member) =>
                    member.firstName.includes(filterText) ||
                    member.lastName.includes(filterText)
                )
                .map((member) => (
                  <TeamUserCard
                    actions={
                      <>
                        {currentUser?._id === member._id ? (
                          <Tag
                            extraCss="bg-slate-400 cursor-not-allowed"
                            icon={<HiBan className="default-tag--icon"/>}
                            labelText="This is you"
                            size="small"
                          />
                        ) : (
                          <DefaultButton
                            active
                            icon={<HiCog className="default-tag--icon"/>}
                            label="Remove"
                            onClick={() => {
                              setSelectedUser(member);
                            }}
                          />
                        )}
                      </>
                    }
                    key={`team-memeber-${member._id}`}
                    user={member}
                  />
                ))
            ) : (
              <NoResultCard/>
            )}
            {inviteList.map(invited => <TeamUserCard
                user={invited}
                actions={<>
                  <Tag
                    extraCss="bg-amber-600 self-center"
                    icon={<HiMail className="default-tag--icon"/>}
                    labelText="Invited" size="small"
                  />
                  <DefaultButton
                    active
                    buttonSize="small"
                    extraCss="ml-2"
                    icon={<HiCog className="default-tag--icon" />}
                    label="Manage"
                  />
                </>}
              />
            )}
          </div>
          <TeamFormModal
            actionInProgress={updateTeamResultObj.isLoading}
            modalHeaderProps={{
              title: `Edit Team: ${team.teamName}`,
              onClose: () => setShowEditModal(false),
            }}
            onExecAction={(teamData) => {
              updateTeamTrigger({...teamData, _id: team._id});
            }}
            team={team}
            visible={showEditModal}
          />
          <ActionDialogModal
            actionInProgress={deleteTeamResultObj.isLoading}
            dialogActions={
              <>
                <DefaultButton
                  active
                  extraCss="mr-2 bg-slate-700"
                  icon={<HiArrowLeft className="default-tag--icon"/>}
                  label="No"
                  onClick={() => setShowDeleteModal(false)}
                />
                <DefaultButton
                  active
                  extraCss="bg-red-700"
                  icon={<HiTrash className="default-tag--icon"/>}
                  label="Delete"
                  onClick={() => deleteTeamTrigger(team._id)}
                />
              </>
            }
            dialogContent={`You are about to delete the team: ${team.teamName}. This action is permanent and cannot be undone. Would you like to continue?`}
            modalHeaderProps={{
              title: `Delete Team: ${team.teamName}`,
              onClose: () => setShowDeleteModal(false),
            }}
            visible={showDeleteModal}
          />
          {selectedUser && (
            <ActionDialogModal
              modalHeaderProps={{
                title: `Remove user: ${selectedUser.firstName} ${selectedUser.lastName}`,
                onClose: () => setSelectedUser(undefined),
              }}
              actionInProgress={updateTeamResultObj.isLoading}
              dialogActions={
                <>
                  <DefaultButton
                    active
                    extraCss="bg-slate-700 mr-2"
                    icon={<HiArrowLeft className="default-tag--icon"/>}
                    label="No"
                    onClick={() => setSelectedUser(undefined)}
                  />
                  <DefaultButton
                    active
                    extraCss="bg-red-800"
                    icon={<HiTrash className="default-tag--icon"/>}
                    label="Yes"
                    onClick={() => {
                      const teamMembers = team.teamMembers
                        .filter((user) => user._id !== selectedUser._id)
                        .map((user) => user._id);
                      updateTeamTrigger({teamMembers, _id: team._id});
                    }}
                  />
                </>
              }
              dialogContent={`You are about to remove the user: [${selectedUser.firstName}] from this team. Would you like to continue?`}
              visible={!!selectedUser}
            />
          )}
          <TeamInviteModal
            actionInProgress={updateTeamResultObj.isLoading}
            modalHeaderProps={{
              onClose: () => setShowInviteModal(false),
            }}
            onExecAction={(usersToInvite) => {
              console.log("handle users to invite: ", usersToInvite);
              // prepare to send data for update
              let users = usersToInvite.map((user) => ({invitedUser: user._id, team: team._id}));
              console.log("team members: ", users);
              inviteUsersTrigger({users});
            }}
            team={team}
            visible={showInviteModal}
          />
        </>
      ) : (
        <div>{/* TODO: Fill in with empty / 404-content component */}</div>
      )}
    </div>
  );
};
