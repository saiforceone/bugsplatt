import { useEffect, useMemo, useState } from "react";
import { useLazyGetProjectsQuery } from "../../data/rtkApis/projectApi";
import { useLazyGetIssuesQuery } from "../../data/rtkApis/issueApi";
import { FEIssue, FEProject } from "../../interfaces";
import { ProjectCard } from "../../components/BaseComponents/ProjectCard/ProjectCard";
import { IssueSummaryCard } from "../../components/BaseComponents/IssueSummaryCard/IssueSummaryCard";
import { SectionHeader } from "../../components/PageComponents/SectionHeader/SectionHeader";
import { PageHeader } from "../../components/Navigation/PageHeader/PageHeader";
import { DefaultButton } from "../../components/BaseComponents/DefaultButton/DefaultButton";
import { HiRefresh } from "react-icons/hi";
import { IoMdOpen } from "react-icons/io";
import { ProjectModal } from "../../components/Modals/ProjectModal/ProjectModal";
import { NoResultCard } from "../../components/BaseComponents/NoResultCard/NoResultCard";

// TODO: Link "GoToProject" button to actual function that will navigate to page
// TODO: Fix overall layout

export const DashboardPage = () => {
  const [projectsTrigger, projectsResultObj] = useLazyGetProjectsQuery();
  const [issuesTrigger, issuesResultObj] = useLazyGetIssuesQuery();
  const [projModalVisible, setProjModalVisible] = useState(false);
  const [selectedProj, setSelectedProj] = useState<FEProject | undefined>();

  useEffect(() => {
    projectsTrigger();
    issuesTrigger();
  }, []);

  // TODO: Update useLazyGetProjectsQuery to take an optional limit query param
  const recentProjects = useMemo(() => {
    try {
      const {
        data: { data },
      } = projectsResultObj as { [key: string]: any };
      return data ? (data as FEProject[]) : [];
    } catch (e) {
      return [];
    }
  }, [projectsResultObj]);

  const recentIssues = useMemo(() => {
    try {
      const {
        data: { data },
      } = issuesResultObj as { [key: string]: any };
      return data ? (data as FEIssue[]) : [];
    } catch (e) {
      return [];
    }
  }, [issuesResultObj]);

  return (
    <div>
      <PageHeader title="Dashboard" />
      <div className="p-4">
        <SectionHeader
          actions={
            <>
              <DefaultButton
                active
                extraCss="mr-2"
                icon={<HiRefresh className="default-icon" />}
                label="Refresh"
                onClick={() => projectsTrigger()}
              />
              <DefaultButton
                active
                icon={<IoMdOpen className="default-icon" />}
                label="View All"
              />
            </>
          }
          title="Recent Projects"
        />
        {recentProjects.length ? (
          <div className="grid gap-3 grid-cols-3">
            {recentProjects.map((project) => (
              <ProjectCard
                key={`project-${project._id}`}
                progressDetail={{
                  label: "Issues",
                  currentValue: 0,
                  maxValue: 1,
                }}
                projectName={project.projectName}
                teamName={project.associatedTeam}
                onClick={() => {
                  setSelectedProj(project);
                  setProjModalVisible(true);
                }}
              />
            ))}
          </div>
        ) : (
          <NoResultCard
            primaryText="No Recent Projects"
            secondaryText="It would appear that no projects have been found."
          />
        )}
        <SectionHeader
          actions={
            <>
              <DefaultButton
                active
                extraCss="mr-2"
                icon={<HiRefresh className="default-icon" />}
                label="Refresh"
                onClick={() => issuesTrigger()}
              />
              <DefaultButton
                active
                icon={<IoMdOpen className="default-icon" />}
                label="View All"
              />
            </>
          }
          title="Recent Issues"
        />
        {recentIssues.length ? (
          <div>
            {recentIssues.map((issue) => (
              <IssueSummaryCard
                key={`issue-${issue._id}`}
                issueTitle={issue.title}
                issueDesc={issue.description}
                resourceId={issue._id}
              />
            ))}
          </div>
        ) : (
          <NoResultCard
            primaryText="No Issues Found"
            secondaryText="It would appear that no issues have been added for this project yet."
          />
        )}
      </div>
      {selectedProj && (
        <ProjectModal
          {...selectedProj}
          issueDetails={{
            label: "Issues",
            currentValue: 0,
            maxValue: 1,
          }}
          onCloseModal={() => {
            setProjModalVisible(false);
            setSelectedProj(undefined);
          }}
          onGoToProject={() => {}}
          visible={projModalVisible}
        />
      )}
    </div>
  );
};
