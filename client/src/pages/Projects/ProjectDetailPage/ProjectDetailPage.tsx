import {useEffect, useMemo, useState} from "react";
import { HiArrowLeft, HiCog } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { DefaultButton } from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import { IconButton } from "../../../components/BaseComponents/IconButton/IconButton";
import { NoResultCard } from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import { Tag } from "../../../components/BaseComponents/Tag/Tag";
import { NewIssueModal } from "../../../components/Modals/NewIssueModal/NewIssueModal";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { ProjectIssueFilter } from "../../../components/PageComponents/ProjectIssueFilter/ProjectIssueFilter";
import { SectionHeader } from "../../../components/PageComponents/SectionHeader/SectionHeader";
import {
  useLazyGetProjectWithIdQuery,
  useUpdateProjectMutation,
} from "../../../data/rtkApis/projectApi";
import {FEIssue, FEProject} from "../../../interfaces";
import {FE_PROJECT_PRIORITIES, FE_PROJECT_STATUSES} from '../../../constants/appConstants';
import {useAddIssueMutation, useLazyGetIssuesQuery} from '../../../data/rtkApis/issueApi';
import {IssueSummaryCard} from '../../../components/BaseComponents/IssueSummaryCard/IssueSummaryCard';
import {IssueModal} from '../../../components/Modals/IssueModal/IssueModal';
import {ManageProjectTagsModal} from '../../../components/Modals/ManageProjectTagsModal/ManageProjectTagsModal';
import {NewProjectModal} from '../../../components/Modals/NewProjectModal/NewProjectModal';

// TODO: Complete layout and functionality implementation
export const ProjectDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<FEProject | undefined>();
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [projTrigger, projResultObj] = useLazyGetProjectWithIdQuery();
  const [updateProjTrigger, updateResultObj] = useUpdateProjectMutation();
  const [addIssueTrigger, addIssueResultObj] = useAddIssueMutation();
  const [issuesTrigger, issuesResultObj] = useLazyGetIssuesQuery();
  const [selectedIssueRef, setSelectedIssueRef] = useState('');
  const [showManageTags, setShowManageTags] = useState(false);
  const [showProjEditModalVisible, setShowProjEditModalVisible] = useState(false);

  useEffect(() => {
    const { id } = params;
    if (id) {
      projTrigger(id);
    }
  }, [params]);

  useEffect(() => {
    const {data} = projResultObj as {[key: string]: any};
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

  useEffect(() => {
    try {
      const {data: {data, success}} = addIssueResultObj as {[key: string]: any};
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

  const selectedIssue: FEIssue|undefined = useMemo(() => {
    if (!selectedIssueRef) return undefined;
    return projectIssues.find(el => el._id === selectedIssueRef);
  }, [selectedIssueRef, projectIssues]);

  return (
    <div className="p-4">
      <PageHeader
        backActionElement={
          <IconButton
            active
            icon={<HiArrowLeft className="default-icon self-center" />}
            onClick={() => navigate(-1)}
          />
        }
        rightActions={
          <>
            <DefaultButton active label="Manage Project" />
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
              icon={<HiCog className="default-icon" />}
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
          project={{ objectId: project._id, projectName: project.projectName }}
          onManageAttachments={() => {}}
          onManageWatchers={() => {}}
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
        />
      )}
      {project && (
        <div></div>
      )}
      {
        selectedIssue && (
          <IssueModal
            issue={selectedIssue}
            visible={!!selectedIssue}
            onCloseAction={() => {
              setSelectedIssueRef('');
            }}
          />
        )
      }
    </div>
  );
};
