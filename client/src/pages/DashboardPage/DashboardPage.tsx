import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetProjectsQuery } from "../../data/rtkApis/projectApi";
import { useLazyGetIssuesQuery } from "../../data/rtkApis/issueApi";
import { FEIssue, FEProject, FETeamInvite } from "../../interfaces";
import { ProjectCard } from "../../components/BaseComponents/ProjectCard/ProjectCard";
import { IssueSummaryCard } from "../../components/BaseComponents/IssueSummaryCard/IssueSummaryCard";
import { SectionHeader } from "../../components/PageComponents/SectionHeader/SectionHeader";
import { PageHeader } from "../../components/Navigation/PageHeader/PageHeader";
import { DefaultButton } from "../../components/BaseComponents/DefaultButton/DefaultButton";
import { HiCheckCircle, HiRefresh, HiTrash, HiX } from "react-icons/hi";
import { IoMdOpen } from "react-icons/io";
import { ProjectModal } from "../../components/Modals/ProjectModal/ProjectModal";
import { NoResultCard } from "../../components/BaseComponents/NoResultCard/NoResultCard";
import { IssueModal } from "../../components/Modals/IssueModal/IssueModal";
import {
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  useGetInvitesQuery,
} from "../../data/rtkApis/teamInviteApi";
import { TeamInviteCard } from "../../components/BaseComponents/TeamInviteCard/TeamInviteCard";
import { ActionDialogModal } from "../../components/Modals/ActionDialogModal/ActionDialogModal";

// TODO: Fix overall layout

const getClosedIssuesForProjCount = (project: FEProject): number => {
  return project.issues.filter((p) => p.status !== "active").length;
};

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [projectsTrigger, projectsResultObj] = useLazyGetProjectsQuery();
  const [issuesTrigger, issuesResultObj] = useLazyGetIssuesQuery();
  const { currentData: invitesData, refetch } = useGetInvitesQuery();
  const [acceptInviteTrigger, acceptInviteResultObj] =
    useAcceptInviteMutation();
  const [declineInviteTrigger, declineInviteResultObj] =
    useDeclineInviteMutation();
  // State
  const [projModalVisible, setProjModalVisible] = useState(false);
  const [selectedProj, setSelectedProj] = useState<FEProject | undefined>();
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<FEIssue | undefined>();
  const [selectedInvite, setSelectedInvite] =
    useState<FETeamInvite | undefined>();
  const [inviteResponse, setInviteResponse] =
    useState<"accept" | "decline">("accept");

  useEffect(() => {
    projectsTrigger({});
    issuesTrigger({});
  }, []);

  const teamInvites: FETeamInvite[] = useMemo(() => {
    if (!invitesData) return [];
    try {
      const { data } = invitesData as { [key: string]: any };
      return data as FETeamInvite[];
    } catch (e) {
      return [];
    }
  }, [invitesData]);

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
    const targetPath = `/app/projects/${selectedProj._id}`;
    navigate(targetPath);
  }, [selectedProj]);

  const onHandleInviteAction = useCallback(() => {
    if (!selectedInvite) return;
    switch (inviteResponse) {
      case "accept":
        acceptInviteTrigger({ _id: selectedInvite._id });
        break;
      case "decline":
        declineInviteTrigger({ _id: selectedInvite._id });
        break;
    }
  }, [selectedInvite, inviteResponse]);

  return (
    <div className="p-4">
      <PageHeader title="Dashboard" />
      <div>
        {teamInvites.length && (
          <>
            <SectionHeader
              actions={
                <>
                  <DefaultButton
                    active
                    icon={<HiRefresh className="default-icon" />}
                    label="Refresh"
                    onClick={() => refetch()}
                  />
                </>
              }
              title="Team Invites"
              subtitle="Pending invites to join teams"
            />
            {teamInvites.map((invite) => (
              <TeamInviteCard
                teamInvite={invite}
                acceptAction={() => {
                  setInviteResponse("accept");
                  setSelectedInvite(invite);
                }}
                declineAction={() => {
                  setInviteResponse("decline");
                  setSelectedInvite(invite);
                }}
                actionInProgress={false}
              />
            ))}
          </>
        )}
        <SectionHeader
          actions={
            <>
              <DefaultButton
                active
                extraCss="mr-2"
                icon={<HiRefresh className="default-icon" />}
                label="Refresh"
                onClick={() => projectsTrigger({})}
              />
              <DefaultButton
                active
                icon={<IoMdOpen className="default-icon" />}
                label="View All"
                onClick={() => {
                  navigate("/projects");
                }}
              />
            </>
          }
          title="Recent Projects"
          subtitle="Your most recent projects at a glance"
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
                projectType={project.projectType}
                teamName={project.associatedTeam.teamName}
                onClick={() => {
                  setSelectedProj(project);
                  setProjModalVisible(true);
                }}
                createdBy={project.createdBy.firstName}
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
                onClick={() => issuesTrigger({})}
              />
              <DefaultButton
                active
                icon={<IoMdOpen className="default-icon" />}
                label="View All"
                onClick={() => {
                  navigate("/issues");
                }}
              />
            </>
          }
          title="Recent Issues"
          subtitle="Here are your most recently assigned issues"
        />
        {recentIssues.length ? (
          <div className="my-8">
            {recentIssues.map((issue) => (
              <IssueSummaryCard
                key={`issue-${issue._id}`}
                issue={issue}
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
          project={selectedProj}
          issueDetails={{
            label: "Issues",
            currentValue: getClosedIssuesForProjCount(selectedProj),
            maxValue: selectedProj.issues.length,
          }}
          onCloseModal={() => {
            setProjModalVisible(false);
            setSelectedProj(undefined);
          }}
          onGoToProject={() => onNavigateToProject()}
          visible={projModalVisible}
        />
      )}
      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onCloseAction={() => {
            setIssueModalVisible(false);
            setSelectedIssue(undefined);
          }}
          visible={issueModalVisible}
          execPostAction={() => {
            issuesTrigger({});
          }}
        />
      )}
      {selectedInvite && (
        <ActionDialogModal
          actionInProgress={
            inviteResponse === "accept"
              ? acceptInviteResultObj.isLoading
              : declineInviteResultObj.isLoading
          }
          dialogActions={
            <>
              <DefaultButton
                active
                extraCss="mr-1 bg-slate-600"
                icon={<HiX className="default-tag--icon" />}
                label="Cancel"
                onClick={() => setSelectedInvite(undefined)}
              />
              <DefaultButton
                active
                extraCss={[
                  "ml-1",
                  inviteResponse === "accept" ? "bg-green-600" : "bg-red-700",
                ].join(" ")}
                icon={
                  inviteResponse === "accept" ? (
                    <HiCheckCircle className="default-tag--icon" />
                  ) : (
                    <HiTrash className="default-tag--icon" />
                  )
                }
                label="Yes"
                onClick={() => onHandleInviteAction()}
              />
            </>
          }
          dialogContent={`You are about to ${inviteResponse} the invitation to join ${selectedInvite.team.teamName}. Would you like to continue?`}
          modalHeaderProps={{
            onClose: () => setSelectedInvite(undefined),
            title: `${inviteResponse} invite to ${selectedInvite.team.teamName}`,
          }}
          visible={!!selectedInvite}
        />
      )}
    </div>
  );
};
