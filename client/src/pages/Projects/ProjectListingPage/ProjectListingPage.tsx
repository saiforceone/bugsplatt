import {useCallback, useEffect, useMemo, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { HiPlus } from "react-icons/hi";
import { DefaultButton } from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { useAddProjectMutation, useLazyGetProjectsQuery } from "../../../data/rtkApis/projectApi";
import {useLazyGetTeamsQuery} from "../../../data/rtkApis/teamApi";
import { ProjectCard } from "../../../components/BaseComponents/ProjectCard/ProjectCard";
import { ProjectModal } from "../../../components/Modals/ProjectModal/ProjectModal";
import { NewProjectModal } from "../../../components/Modals/NewProjectModal/NewProjectModal";
import { FE_PROJECT_TYPES } from "../../../constants/appConstants";
import {FEProject, FEProjectSearchCriteria, FETeam, SelectOption} from "../../../interfaces";
import {ProjectFilter} from '../../../components/PageComponents/ProjectFilter/ProjectFilter';
import {NoResultCard} from '../../../components/BaseComponents/NoResultCard/NoResultCard';

export const ProjectListingPage = () => {

  const navigate = useNavigate();

  const [showNewProjModal, setShowNewProjModal] = useState(false);
  const [teamsTrigger, teamsResultObj] = useLazyGetTeamsQuery();
  const [addProjTrigger, addProjResultObj] = useAddProjectMutation();
  const [projTrigger, projResultObj] = useLazyGetProjectsQuery();
  const [selectedProjRef, setSelectedProjRef] = useState('');

  useEffect(() => {
    projTrigger({});
    teamsTrigger();
  }, []);

  const availableTeams: SelectOption[] = useMemo(() => {
    try {
      const {data: {data}} = teamsResultObj as {[key: string]: any};

      if (!Array.isArray(data)) return [];
      const _teams: SelectOption[] = [{label: '---', value: ''}];
      const _data: SelectOption[] = (data as FETeam[]).map(obj => ({label: obj.teamName, value: obj._id}));
      return _teams.concat(_data);
    } catch (e) {
      return []
    }
  }, [teamsResultObj]);

  useEffect(() => {
    try {
      const {data: {success}} = addProjResultObj as {[key: string]: any};
      if (success) {
        projTrigger({});
      }
    } catch (e) {

    }
  }, [addProjResultObj.data]);

  const projects: FEProject[] = useMemo(() => {
    try {
      const {data: {data}} = projResultObj as {[key: string]: any};
      if (!Array.isArray(data)) return [];
      return data as FEProject[];
    } catch (e) {
      return [];
    }
  }, [projResultObj]);

  const selectedProject: FEProject|undefined = useMemo(() => {
    if (!selectedProjRef) return;
    return projects.find(el => el._id === selectedProjRef);
  }, [projects, selectedProjRef]);

  const onApplyFilter = useCallback((filterObj?: FEProjectSearchCriteria) => {
    filterObj ? projTrigger(filterObj) : projTrigger({});
  }, []);

  return (
    <div className="p-4">
      <PageHeader
        title="Projects"
        rightActions={
          <>
            <DefaultButton
              active
              buttonSize="medium"
              icon={<HiPlus className="default-icon" />}
              label="New Project"
              onClick={() => setShowNewProjModal(true)}
            />
          </>
        }
      />
      <ProjectFilter
        onFilter={(filterObj) => {
          onApplyFilter(filterObj);
        }} users={[]} teams={availableTeams} projectTypes={FE_PROJECT_TYPES}
      />
      <div className="grid gap-3 grid-cols-3 my-8">
        {
          projects.length
            ? projects.map(proj =>
              <ProjectCard
                key={`project-${proj._id}`}
                onClick={() => setSelectedProjRef(proj._id)}
                projectName={proj.projectName} teamName={proj.associatedTeam.teamName}
                progressDetail={{label: 'Issues', maxValue: proj.issues.length, currentValue: 0}}
              />
            )
            : <NoResultCard />
        }
      </div>
      {
        selectedProject
        && <ProjectModal
          project={selectedProject}
          onCloseModal={() => {setSelectedProjRef('')}}
          issueDetails={{
            label: 'Issues',
            currentValue: 0,
            maxValue: selectedProject.issues.length
          }}
          onGoToProject={() => navigate(`/projects/${selectedProject._id}`)}
          visible={!!selectedProjRef}
        />
      }
      <NewProjectModal
        actionInProgress={addProjResultObj.isLoading}
        onCloseModal={() => setShowNewProjModal(false)}
        onCreateProject={projData => {
          console.log('proj data: ', projData)
          addProjTrigger(projData);
        }}
        projectTypes={FE_PROJECT_TYPES}
        teams={availableTeams}
        visible={showNewProjModal}
      />
    </div>
  );
};
