import { useEffect, useState } from "react";
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
import { FEProject } from "../../../interfaces";

// TODO: Complete layout and functionality implementation
export const ProjectDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<FEProject | undefined>();
  const [showAddIssue, setShowAddIssue] = useState(false);
  const [projTrigger, projResultObj] = useLazyGetProjectWithIdQuery();
  const [updateProjTrigger, updateResultObj] = useUpdateProjectMutation();

  useEffect(() => {
    const { id } = params;
    if (id) {
      projTrigger(id);
    }
  }, [params]);

  useEffect(() => {
    const {data} = projResultObj as {[key: string]: any};
    console.log('project detail page -> project: ', data);
    if (data) {
      // TODO Fix this....
      // setProject(data as FEProject);
    }
  }, [projResultObj]);

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
            />
          </>
        }
        title="Project Tags"
      />
      <div className="py-6">
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
        issueCount={project ? project.issues.length : 0}
        onFilterIssues={() => {}}
        onNewIssue={() => {}}
        projectPriorities={[]}
        projectStatuses={[]}
      />
      {project && (
        <NewIssueModal
          onCloseModal={() => setShowAddIssue(false)}
          visible={showAddIssue}
          onCreateIssue={() => {}}
          project={{ objectId: project._id, projectName: project.projectName }}
          onManageAttachments={() => {}}
          onManageWatchers={() => {}}
          projectAssignees={[]}
          projectPriorities={[]}
        />
      )}
    </div>
  );
};
