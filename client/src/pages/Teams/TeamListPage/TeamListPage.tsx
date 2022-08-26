import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { DefaultButton } from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import { HiCog, HiPlus, HiRefresh } from "react-icons/hi";

import { SectionHeader } from "../../../components/PageComponents/SectionHeader/SectionHeader";
import {
  useAddTeamMutation,
  useGetTeamsQuery,
} from "../../../data/rtkApis/teamApi";
import { TeamFormModal } from "../../../components/Modals/TeamFormModal/TeamFormModal";
import { FETeam } from "../../../interfaces";
import { NoResultCard } from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import { TeamCard } from "../../../components/BaseComponents/TeamCard/TeamCard";
import { TeamDetailCard } from "../../../components/BaseComponents/TeamDetailCard/TeamDetailCard";

export const TeamListPage = () => {
  // State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTeamRef, setSelectedTeamRef] = useState("");

  // Hooks
  const navigate = useNavigate();
  const {
    data: teamListData,
    isLoading: fetchingTeams,
    isSuccess,
    refetch: refetchTeams,
  } = useGetTeamsQuery();
  const [addTeamTrigger, addTeamResultObj] = useAddTeamMutation();

  useEffect(() => {
    if (addTeamResultObj.isSuccess) {
      setShowAddModal(false);
      refetchTeams();
    }
  }, [addTeamResultObj.isSuccess]);

  // Derived State
  const teams: FETeam[] = useMemo(() => {
    try {
      const { data } = teamListData as { [key: string]: any };
      return data as FETeam[];
    } catch (e) {
      return [];
    }
  }, [teamListData]);

  const selectedTeam: FETeam | undefined = useMemo(() => {
    if (!selectedTeamRef) return undefined;
    return teams.find((el) => el._id === selectedTeamRef);
  }, [teams, selectedTeamRef]);

  return (
    <div className="p-4">
      <PageHeader
        title="Teams"
        rightActions={
          <>
            <DefaultButton
              active
              icon={<HiPlus className="default-tag--icon" />}
              label="New Team"
              onClick={() => setShowAddModal(true)}
            />
          </>
        }
      />
      <SectionHeader
        title={`${teams.length} Team${teams.length !== 1 ? "s" : ""} found`}
        actions={
          <>
            <DefaultButton
              active
              icon={<HiRefresh className="default-tag--icon" />}
              label="Refresh"
              onClick={() => refetchTeams()}
            />
          </>
        }
      />
      <div className="my-3">
        {teams.length ? (
          teams.map((team) => (
            <TeamCard
              key={`team-${team._id}`}
              numberOfMembers={0}
              onClick={() => setSelectedTeamRef(team._id)}
              team={team}
            />
          ))
        ) : (
          <NoResultCard
            primaryText="No Teams Found"
            secondaryText="Looks like there are no teams yet"
          />
        )}
      </div>
      <TeamFormModal
        actionInProgress={addTeamResultObj.isLoading}
        modalHeaderProps={{
          title: "Add Team",
          onClose: () => setShowAddModal(false),
        }}
        onExecAction={(teamData) => {
          addTeamTrigger(teamData);
        }}
        visible={showAddModal}
      />
      {selectedTeam && (
        <TeamDetailCard
          modalHeaderProps={{
            title: `Team Details: ${selectedTeam.teamName}`,
            onClose: () => {
              setSelectedTeamRef("");
            },
            extraActions: (
              <>
                <DefaultButton
                  active
                  buttonSize="small"
                  icon={<HiCog className="default-tag--icon" />}
                  label="Manage Team"
                  onClick={() => {
                    navigate(`/app/teams/${selectedTeam._id}`);
                  }}
                />
              </>
            ),
          }}
          team={selectedTeam}
          visible={!!selectedTeam}
        />
      )}
    </div>
  );
};
