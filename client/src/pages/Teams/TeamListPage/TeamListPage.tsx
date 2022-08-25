import {useMemo, useState} from 'react';
import {PageHeader} from '../../../components/Navigation/PageHeader/PageHeader';
import {DefaultButton} from '../../../components/BaseComponents/DefaultButton/DefaultButton';
import {HiPlus, HiRefresh} from 'react-icons/hi';

import {SectionHeader} from '../../../components/PageComponents/SectionHeader/SectionHeader';
import {useAddTeamMutation, useGetTeamsQuery} from '../../../data/rtkApis/teamApi';
import {TeamFormModal} from '../../../components/Modals/TeamFormModal/TeamFormModal';
import {FETeam} from '../../../interfaces';
import {NoResultCard} from '../../../components/BaseComponents/NoResultCard/NoResultCard';

export const TeamListPage = () => {
  // State
  const [showAddModal, setShowAddModal] = useState(false);

  // Hooks
  const {data: teamListData, isLoading: fetchingTeams, isSuccess, refetch: refetchTeams} = useGetTeamsQuery();
  const [addTeamTrigger, addTeamResultObj] = useAddTeamMutation();

  console.log('team data', teamListData);

  // Derived State
  const teams: FETeam[] = useMemo(() => {
    return [];
  }, [teamListData]);

  return (
    <div className="p-4">
      <PageHeader title="Teams" rightActions={<>
        <DefaultButton
          active
          icon={<HiPlus className="default-tag--icon" />}
          label="New Team"
          onClick={() => setShowAddModal(true)}
        />
      </>} />
      <SectionHeader
        title={"0 Teams found"}
        actions={<><DefaultButton active icon={<HiRefresh className="default-tag--icon" />} label="Refresh" onClick={() => refetchTeams()} /></>}
      />
      <div className="my-3">
        {teams.length
          ? teams.map(team => (<div></div>))
          : <NoResultCard primaryText="No Teams Found" secondaryText="Looks like there are no teams yet" />
        }
      </div>
      <TeamFormModal
        actionInProgress={addTeamResultObj.isLoading}
        modalHeaderProps={{
          title: 'Add Team',
          onClose: () => setShowAddModal(false)
        }}
        onExecAction={teamData => {
          addTeamTrigger(teamData);
        }}
        visible={showAddModal}
      />
    </div>
  );
}
