import { useEffect, useMemo, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { DefaultButton } from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { useAddProjectMutation, useLazyGetProjectsQuery } from "../../../data/rtkApis/projectApi";
import {useLazyGetTeamsQuery} from "../../../data/rtkApis/teamApi";
import { ProjectCard } from "../../../components/BaseComponents/ProjectCard/ProjectCard";
import { ProjectModal } from "../../../components/Modals/ProjectModal/ProjectModal";
import { NewProjectModal } from "../../../components/Modals/NewProjectModal/NewProjectModal";
import { FE_PROJECT_TYPES } from "../../../constants/appConstants";
import { SelectOption } from "../../../interfaces";

export const ProjectListingPage = () => {

  const [showNewProjModal, setShowNewProjModal] = useState(false);
  const [teamsTrigger, teamsResultObj] = useLazyGetTeamsQuery();
  const [addProjTrigger, addProjResultObj] = useAddProjectMutation();
  const [projTrigger, projResultObj] = useLazyGetProjectsQuery();

  useEffect(() => {
    teamsTrigger();
  }, []);

  const availableTeams: SelectOption[] = useMemo(() => {
    try {
      const {data: {data}} = teamsResultObj as {[key: string]: any};
      // TODO: Resolve Typescript error
      return data ? data.map(obj => ({label: obj['teamName'], value: obj['_id']})) : []
    } catch (e) {
      return []
    }
  }, [teamsResultObj]);

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
      <NewProjectModal
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
