import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IssueSummaryCard } from "../../../components/BaseComponents/IssueSummaryCard/IssueSummaryCard";
import { NoResultCard } from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import { IssueModal } from "../../../components/Modals/IssueModal/IssueModal";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { ProjectIssueFilter } from "../../../components/PageComponents/ProjectIssueFilter/ProjectIssueFilter";
import { FE_ISSUE_STATUSES, FE_PROJECT_PRIORITIES } from "../../../constants/appConstants";
import { useLazyGetIssuesQuery } from "../../../data/rtkApis/issueApi";
import { FEIssue } from "../../../interfaces";

export const IssueListPage = () => {
  const navigate = useNavigate();

  const [selectedIssueRef, setSelectedIssueRef] = useState("");
  const [issuesTrigger, issuesResultObj] = useLazyGetIssuesQuery();

  useEffect(() => {
    issuesTrigger({});
  }, []);

  const issues: FEIssue[] = useMemo(() => {
    const {data} = issuesResultObj as {[key: string]: any};
    if (data) {
      const {data: issueData} = data;
      if (!Array.isArray(issueData)) return [];
      return issueData as FEIssue[];
    }
    return [];
  }, [issuesResultObj]);

  const selectedIssue: FEIssue | undefined = useMemo(() => {
    if (!selectedIssueRef) return;
    return issues.find(el => el._id === selectedIssueRef);
  }, [issues, selectedIssueRef]);

  return (
    <div className="p-4">
      <PageHeader title="Issues" />
      <ProjectIssueFilter
        issueCount={issues.length}
        onFilterIssues={filterObj => {
          issuesTrigger(filterObj);
        }}
        projectPriorities={FE_PROJECT_PRIORITIES}
        projectStatuses={FE_ISSUE_STATUSES}
      />
      <div className="my-3">
        {issues.length ? (
          <div>
            {issues.map((issue) => (
              <IssueSummaryCard
                key={`issue-${issue._id}`}
                issue={issue}
                onClick={() => setSelectedIssueRef(issue._id)}
              />
            ))}
          </div>
        ) : (
          <NoResultCard />
        )}
      </div>
      {selectedIssue && (
        <IssueModal
          onCloseAction={() => setSelectedIssueRef('')}
          execPostAction={() => {
            setSelectedIssueRef('');
            issuesTrigger({});
          }}
          issue={selectedIssue}
          overrideNavigate={() => navigate(`/app/issues/${selectedIssue._id}`)}
          visible={true}
        />
      )}
    </div>
  );
};
