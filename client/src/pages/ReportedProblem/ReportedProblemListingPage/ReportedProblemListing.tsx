import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom"
import { MdHelpCenter } from "react-icons/md";
import { useAddReportedProblemMutation, useLazyGetProblemsQuery } from "../../../data/rtkApis/reportedProblemApi";
import { DefaultButton } from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import { ReportedProblemFormModal } from "../../../components/Modals/ReportedProblemFormModal/ReportedProblemFormModal";
import { PageHeader } from "../../../components/Navigation/PageHeader/PageHeader";
import { FEReportedProblem } from "../../../interfaces";
import { SectionHeader } from "../../../components/PageComponents/SectionHeader/SectionHeader";
import { NoResultCard } from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import { ReportedProblemCard } from "../../../components/BaseComponents/ReportedProblemCard/ReportedProblemCard";

export const ReportedProblemListing = () => {

  // State
  const [probModalVisible, setProbModalVisible] = useState(false);

  // Hooks
  const [addProblemTrigger, addProblemResultObj] = useAddReportedProblemMutation();
  const [problemsTrigger, problemsResultObj] = useLazyGetProblemsQuery();

  useEffect(() => {
    problemsTrigger({});
  }, []);

  useEffect(() => {
    if (addProblemResultObj.isSuccess) {
      setProbModalVisible(false);
      problemsTrigger({});
    }
  }, [addProblemResultObj]);

  const reportedProblems: FEReportedProblem[] = useMemo(() => {
    try {
      const {data: {data}} = problemsResultObj as {[key: string]: any};
      if (!Array.isArray(data)) return [];
      return data as FEReportedProblem[];
    } catch (e) {
      console.log(`failed to get report problems with error: ${(e as Error).message}`);
      return [];
    }
  }, [problemsResultObj]);

  return (
    <div className="p-4">
      <PageHeader
        rightActions={
          <>
            <DefaultButton
              active
              icon={<MdHelpCenter className="default-tag--icon" />}
              label="Report a Problem"
              onClick={() => setProbModalVisible(true)}
            />
          </>
        }
        title="Reported Problems"
      />
      <SectionHeader 
        actions={
          <>
            <DefaultButton active label="Refresh" onClick={() => problemsTrigger({})} />
          </>
        }
        title={`${reportedProblems.length} Problem${reportedProblems.length !== 1 ? 's' : ''} found`}
      />
      <div>
        {reportedProblems.length ? (<>
          {reportedProblems.map(problem => (<ReportedProblemCard key={`prob-${problem._id}`} problem={problem} />))}
        </>) : <NoResultCard primaryText="No Reported Problems" secondaryText="Looks like everything is working just fine. Carry on" />}
      </div>
      <ReportedProblemFormModal
        actionInProgress={addProblemResultObj.isLoading}
        modalHeaderProps={{
          onClose: () => setProbModalVisible(false),
        }}
        onSubmit={probData => {
          addProblemTrigger(probData);
        }}
        visible={probModalVisible}
      />
    </div>
  );
};
