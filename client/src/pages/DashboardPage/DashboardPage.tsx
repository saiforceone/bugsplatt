import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FormattingUtils } from "../../utils/FormattingUtils";
import { IssueModal } from "../../components/Modals/IssueModal/IssueModal";

// TODO: Fix overall layout

const getClosedIssuesForProjCount = (project: FEProject): number => {
  return project.issues.filter((p) => p.status !== "active").length;
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [projectsTrigger, projectsResultObj] = useLazyGetProjectsQuery();
  const [issuesTrigger, issuesResultObj] = useLazyGetIssuesQuery();
  const [projModalVisible, setProjModalVisible] = useState(false);
  const [selectedProj, setSelectedProj] = useState<FEProject | undefined>();
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<FEIssue | undefined>();

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

  const onNavigateToProject = useCallback(() => {
    if (!selectedProj) return;
    const targetPath = `/projects/${selectedProj._id}`;
    navigate(targetPath);
  }, [selectedProj]);

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
                onClick={() => {
                  navigate('/projects')
                }}
              />
            </>
          }
          title="Recent Projects"
        />
        {recentProjects.length ? (
          <div className="grid gap-3 grid-cols-3 my-8">
            {recentProjects.map((project) => (
              <ProjectCard
                key={`project-${project._id}`}
                progressDetail={{
                  label: "Issues",
                  currentValue: getClosedIssuesForProjCount(project),
                  maxValue: project.issues.length,
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
                onClick={() => {
                  navigate('/issues');
                }}
              />
            </>
          }
          title="Recent Issues"
        />
        {recentIssues.length ? (
          <div className="my-8">
            {recentIssues.map((issue) => (
              <IssueSummaryCard
                key={`issue-${issue._id}`}
                issueTitle={issue.title}
                issueDesc={issue.description}
                resourceId={issue._id}
                expectedCloseDate={
                  issue.expectedCloseDate
                    ? FormattingUtils.formatDate(issue.expectedCloseDate)
                    : ""
                }
                onClick={() => {
                  setSelectedIssue(issue);
                  setIssueModalVisible(true);
                }}
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
          teamName={selectedProj.associatedTeam}
          issues={selectedProj.issues}
          issueDetails={{
            label: "Issues",
            currentValue: getClosedIssuesForProjCount(selectedProj),
            maxValue: selectedProj.issues.length,
          }}
          createdAt={FormattingUtils.formatDate(selectedProj.createdAt)}
          createdBy={`${selectedProj.createdBy.firstName} ${selectedProj.createdBy.lastName}`}
          onCloseModal={() => {
            setProjModalVisible(false);
            setSelectedProj(undefined);
          }}
          onGoToProject={() => onNavigateToProject()}
          projectTags={selectedProj.tags}
          visible={projModalVisible}
        />
      )}
      {selectedIssue && (
        <IssueModal
          dueDate={
            selectedIssue.expectedCloseDate
              ? FormattingUtils.formatDate(selectedIssue.expectedCloseDate)
              : ""
          }
          projectName={selectedIssue.associatedProject.projectName}
          priority={selectedIssue.priority}
          issueName={selectedIssue.title}
          issueDetails={selectedIssue.description}
          onCloseAction={() => {
            setIssueModalVisible(false);
            setSelectedIssue(undefined);
          }}
          visible={issueModalVisible}
        />
      )}
    </div>
  );
};
