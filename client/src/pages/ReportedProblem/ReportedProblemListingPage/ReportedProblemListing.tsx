import {useEffect, useMemo, useState} from "react";
// import { useNavigate } from "react-router-dom"
import {MdHelpCenter} from "react-icons/md";
import {useAddReportedProblemMutation, useLazyGetProblemsQuery} from "../../../data/rtkApis/reportedProblemApi";
import {DefaultButton} from "../../../components/BaseComponents/DefaultButton/DefaultButton";
import {ReportedProblemFormModal} from "../../../components/Modals/ReportedProblemFormModal/ReportedProblemFormModal";
import {PageHeader} from "../../../components/Navigation/PageHeader/PageHeader";
import {FEReportedProblem} from "../../../interfaces";
import {SectionHeader} from "../../../components/PageComponents/SectionHeader/SectionHeader";
import {NoResultCard} from "../../../components/BaseComponents/NoResultCard/NoResultCard";
import {ReportedProblemCard} from "../../../components/BaseComponents/ReportedProblemCard/ReportedProblemCard";
import {
  ReportedProblemDetailModal
} from '../../../components/Modals/ReportedProblemDetailModal/ReportedProblemDetailModal';
import {useCurrentUser} from '../../../hooks/useCurrentUser';
import {ReportedProblemFilter} from '../../../components/PageComponents/ReportedProblemFilter/ReportedProblemFilter';
import {FE_REPORTED_PROBLEM_STATUSES, FE_REPORTED_PROBLEM_TYPES} from '../../../constants/appConstants';

export const ReportedProblemListing = () => {

  // State
  const [probModalVisible, setProbModalVisible] = useState(false);
  const [selectedProbRef, setSelectedProbRef] = useState<string>('');

  // Hooks
  const currentUser = useCurrentUser();
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

  // Derived State
  const reportedProblems: FEReportedProblem[] = useMemo(() => {
    try {
      const {data: {data}} = problemsResultObj as { [key: string]: any };
      if (!Array.isArray(data)) return [];
      return data as FEReportedProblem[];
    } catch (e) {
      console.log(`failed to get report problems with error: ${(e as Error).message}`);
      return [];
    }
  }, [problemsResultObj]);

  const selectedProblem: FEReportedProblem | undefined = useMemo(() => {
    if (!selectedProbRef || !reportedProblems.length) return undefined;
    return reportedProblems.find(el => el._id === selectedProbRef);
  }, [selectedProbRef, reportedProblems]);

  // Render

  return (
    <div className="p-4">
      <PageHeader
        rightActions={
          <>
            <DefaultButton
              active
              icon={<MdHelpCenter className="default-tag--icon"/>}
              label="Report a Problem"
              onClick={() => setProbModalVisible(true)}
            />
          </>
        }
        title="Reported Problems"
      />
      <ReportedProblemFilter
        problemStatusOptions={FE_REPORTED_PROBLEM_STATUSES}
        problemTypeOptions={FE_REPORTED_PROBLEM_TYPES}
        actionInProgress={problemsResultObj.isLoading}
        count={reportedProblems.length}
        onExecFilter={(data) => {
          problemsTrigger(data);
        }}
      />
      <div>
        {reportedProblems.length ? (<>
          {reportedProblems.map(problem => (
            <ReportedProblemCard
              key={`prob-${problem._id}`}
              onClick={() => setSelectedProbRef(problem._id)}
              problem={problem}
            />))}
        </>) : <NoResultCard
          primaryText="No Reported Problems"
          secondaryText="Looks like everything is working just fine. Carry on"
        />}
      </div>
      <ReportedProblemFormModal
        actionInProgress={addProblemResultObj.isLoading}
        modalHeaderProps={{
          onClose: () => setProbModalVisible(false),
        }}
        onSubmit={probData => {
          addProblemTrigger(probData);
        }}
        userName={currentUser.currentUser ? `${currentUser.currentUser.firstName}` : 'Unknown'}
        visible={probModalVisible}
      />
      {selectedProblem && (
        <ReportedProblemDetailModal
          problem={selectedProblem}
          modalHeaderProps={{
            onClose: () => setSelectedProbRef(''),
            title: `Reported Problem: ${selectedProblem.problemType}`
          }}
          visible={!!selectedProblem}
        />
      )}
    </div>
  );
};
