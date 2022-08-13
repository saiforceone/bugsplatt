import {useEffect, useMemo, useState} from "react";
import {HiArrowLeft, HiCog, HiTrash} from "react-icons/hi";
import {useParams, useNavigate} from "react-router-dom";
import {toast as toastMessage} from 'react-toastify';
import {DefaultButton} from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import {IconButton} from "../../../components/BaseComponents/IconButton/IconButton";
import {NoResultCard} from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import {Tag} from "../../../components/BaseComponents/Tag/Tag";
import {NewIssueModal} from "../../../components/Modals/NewIssueModal/NewIssueModal";
import {PageHeader} from "../../../components/Navigation/PageHeader/PageHeader";
import {ProjectIssueFilter} from "../../../components/PageComponents/ProjectIssueFilter/ProjectIssueFilter";
import {SectionHeader} from "../../../components/PageComponents/SectionHeader/SectionHeader";
import {
  useDeleteProjectMutation,
  useLazyGetProjectWithIdQuery,
  useUpdateProjectMutation,
} from "../../../data/rtkApis/projectApi";
import {FEIssue, FEProject, FETeam, SelectableOption} from "../../../interfaces";
import {FE_PROJECT_PRIORITIES, FE_PROJECT_STATUSES, FE_PROJECT_TYPES} from '../../../constants/appConstants';
import {useAddIssueMutation, useLazyGetIssuesQuery} from '../../../data/rtkApis/issueApi';
import {IssueSummaryCard} from '../../../components/BaseComponents/IssueSummaryCard/IssueSummaryCard';
import {IssueModal} from '../../../components/Modals/IssueModal/IssueModal';
import {ManageProjectTagsModal} from '../../../components/Modals/ManageProjectTagsModal/ManageProjectTagsModal';
import {NewProjectModal} from '../../../components/Modals/NewProjectModal/NewProjectModal';
import {useLazyGetTeamsQuery} from '../../../data/rtkApis/teamApi';
import {ActionDialogModal} from '../../../components/Modals/ActionDialogModal/ActionDialogModal';

// TODO: Complete layout and functionality implementation
export const ProjectDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  // Triggers
  const [projTrigger, projResultObj] = useLazyGetProjectWithIdQuery();
  const [updateProjTrigger, updateResultObj] = useUpdateProjectMutation();
  const [addIssueTrigger, addIssueResultObj] = useAddIssueMutation();
  const [issuesTrigger, issuesResultObj] = useLazyGetIssuesQuery();
  const [teamsTrigger, teamsResultObj] = useLazyGetTeamsQuery();
  const [delProjTrigger, delProjResult] = useDeleteProjectMutation();
  // State
  const [project, setProject] = useState<FEProject | undefined>();
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [selectedIssueRef, setSelectedIssueRef] = useState('');
  const [showManageTags, setShowManageTags] = useState(false);
  const [showProjEditModalVisible, setShowProjEditModalVisible] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const {id} = params;
    if (id) {
      projTrigger(id);
      teamsTrigger();
    }
  }, [params]);

  useEffect(() => {
    const {data} = projResultObj as { [key: string]: any };
    if (data) {

      try {
        const projData = data['data'] as FEProject;
        setProject(projData);
        issuesTrigger({associatedProject: projData._id});
      } catch (e) {
        console.log('failed to set project with error: ', (e as Error).message);
      }
    }
  }, [projResultObj]);

  const projectIssues: FEIssue[] = useMemo(() => {
    try {
      const {data: {data}} = issuesResultObj as { [key: string]: any };
      if (data) {
        if (!Array.isArray(data)) return [];
        return data as FEIssue[];
      }
      return [];
    } catch (e) {
      return [];
    }

  }, [issuesResultObj]);

  const availableTeams: SelectableOption[] = useMemo(() => {
    try {
      const {data: {data}} = teamsResultObj as { [key: string]: any };
      if (data) {
        if (!Array.isArray(data)) return [];
        return (data as FETeam[]).map(team => ({label: team.teamName, value: team._id}));
      }
      return [];
    } catch (e) {
      return [];
    }
  }, [teamsResultObj]);

  useEffect(() => {
    try {
      const {data: {data, success}} = addIssueResultObj as { [key: string]: any };
      if (data) {
        console.log('data after save op: ', data);
        if (success && project) {
          issuesTrigger({associatedProject: project._id});
          setShowAddIssue(false);
        }
      }
    } catch (e) {
      console.log(`Failed to create issue with error: ${(e as Error).message}`);
    }

  }, [addIssueResultObj, project]);

  useEffect(() => {
    if (updateResultObj.isSuccess) {
      if (project) {
        projTrigger(project._id);
        setShowProjEditModalVisible(false);
      }
    }
  }, [updateResultObj]);

  const selectedIssue: FEIssue | undefined = useMemo(() => {
    if (!selectedIssueRef) return undefined;
    return projectIssues.find(el => el._id === selectedIssueRef);
  }, [selectedIssueRef, projectIssues]);

  useEffect(() => {
    if (delProjResult.isSuccess) {
      toastMessage("Project was deleted successfully.")
      navigate(-1);
    }
  }, [delProjResult]);

  return (
    <div className="p-4">
      <PageHeader
        backActionElement={
          <IconButton
            active
            icon={<HiArrowLeft className="default-icon self-center"/>}
            onClick={() => navigate(-1)}
          />
        }
        rightActions={
          <>
            <DefaultButton active label="Manage Project" onClick={() => setShowProjEditModalVisible(true)}/>
          </>
        }
        title={`Project: ${project ? project.projectName : "Unavailable"}`}
      />
      <div>
        <p>
          {project
            ? project.description
            : "Project details are not available at this time"}
        </p>
      </div>
      <SectionHeader
        actions={
          <>
            <DefaultButton
              active
              icon={<HiCog className="default-icon"/>}
              label="Manage Tags"
              onClick={() => setShowManageTags(true)}
            />
          </>
        }
        title="Project Tags"
      />
      <div className="py-6 default-row">
        {project?.tags.length ? (
          project?.tags.map((tag) => (
            <Tag
              extraCss="mr-2"
              key={`tag-${tag}`}
              labelText={tag}
              size="small"
            />
          ))
        ) : (
          <NoResultCard
            primaryText="No Tags"
            secondaryText="Looks like no tags have been added for this project"
          />
        )}
      </div>
      <ProjectIssueFilter
        issueCount={projectIssues.length}
        onFilterIssues={(opts) => {
          console.log('on filter with opts: ', opts);
          if (project) {
            const filterOpts = {...opts, associatedProject: project._id}
            issuesTrigger(filterOpts);
          }
        }}
        onNewIssue={() => setShowAddIssue(true)}
        projectPriorities={FE_PROJECT_PRIORITIES}
        projectStatuses={FE_PROJECT_STATUSES}
      />
      <div className="my-6">
        {
          projectIssues.length
            ? projectIssues.map(issue =>
              <IssueSummaryCard
                key={`issue-${issue._id}`}
                issue={issue}
                onClick={() => setSelectedIssueRef(issue._id)}
              />
            )
            : <NoResultCard
              primaryText="No Issues"
              secondaryText="Looks like no issues have been added to this project yet"
            />
        }
      </div>
      {project && (
        <NewIssueModal
          actionInProgress={addIssueResultObj.isLoading}
          onCloseModal={() => setShowAddIssue(false)}
          visible={showAddIssue}
          onCreateIssue={issueData => {
            console.log('onCreateIssue with data: ', issueData);
            addIssueTrigger(issueData);
          }}
          project={{objectId: project._id, projectName: project.projectName}}
          onManageAttachments={() => {
          }}
          onManageWatchers={() => {
          }}
          projectAssignees={[]}
          projectPriorities={FE_PROJECT_PRIORITIES}
        />
      )}
      {project && (
        <ManageProjectTagsModal
          projectId={project._id}
          projectName={project.projectName}
          projectTags={project.tags}
          modalHeaderProps={{
            onClose: () => setShowManageTags(false),
            title: ''
          }}
          visible={showManageTags}
          execPostAction={() => {
            setShowManageTags(false);
            projTrigger(project._id)
          }}
        />
      )}
      {project && (
        <NewProjectModal
          actionInProgress={updateResultObj.isLoading}
          onCloseModal={() => setShowProjEditModalVisible(false)}
          onCreateProject={(projData) => {
            updateProjTrigger({_id: project._id, ...projData});
          }}
          overrideActions={<>
            <DefaultButton
              active buttonSize="small" extraCss="bg-red-600" icon={<HiTrash className="default-tag--icon"/>}
              label="Delete Project"
              onClick={() => setShowDeleteDialog(true)}
            />
          </>}
          project={project}
          teams={availableTeams}
          visible={showProjEditModalVisible} projectTypes={FE_PROJECT_TYPES}
        />
      )}
      {
        selectedIssue && (
          <IssueModal
            issue={selectedIssue}
            visible={!!selectedIssue}
            onCloseAction={() => {
              setSelectedIssueRef('');
            }}
            execPostAction={() => {
              issuesTrigger({});
              setSelectedIssueRef('');
            }}
          />
        )
      }
      {project && (
        <ActionDialogModal
          actionInProgress={delProjResult.isLoading}
          dialogActions={<>
            <DefaultButton
              active={!delProjResult.isLoading} extraCss="mr-2 bg-slate-700" icon={<HiArrowLeft className="mr-2"/>} label="Cancel"
              onClick={() => setShowDeleteDialog(false)}
            />
            <DefaultButton
              active={!delProjResult.isLoading} icon={<HiTrash className="default-tag--icon"/>} extraCss="bg-red-600" label="Delete Project"
              onClick={() => delProjTrigger(project._id)}
            />
          </>}
          dialogContent={`You are about to delete the project: ${project.projectName}, this will delete linked issues and is permanent. Would you like to continue?`}
          modalHeaderProps={{
            title: `Delete Project: ${project.projectName}?`,
            onClose: () => setShowDeleteDialog(false),
          }}
          visible={showDeleteDialog}
        />
      )}
    </div>
  );
};
