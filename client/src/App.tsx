import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./App.css";
import { IsAuthenticated } from "./components/Navigation/IsAuthenticated/IsAuthenticated";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { HelpPage } from "./pages/HelpPage/HelpPage";
import { IssueDetailPage } from "./pages/Issues/IssueDetailsPage/IssueDetailPage";
import { IssueListPage } from "./pages/Issues/IssueListPage/IssueListPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { ProjectDetailPage } from "./pages/Projects/ProjectDetailPage/ProjectDetailPage";
import { ProjectListingPage } from "./pages/Projects/ProjectListingPage/ProjectListingPage";
import { ReportedProblemDetailPage } from "./pages/ReportedProblem/ReportedProblemDetailPage/ReportedProblemDetailPage";
import { ReportedProblemListing } from "./pages/ReportedProblem/ReportedProblemListingPage/ReportedProblemListing";
import { TeamDetailPage } from "./pages/Teams/TeamDetailPage/TeamDetailPage";
import { TeamListPage } from "./pages/Teams/TeamListPage/TeamListPage";
import { CurrentUserProvider } from "./Providers/CurrentUserProvider";
import {useAuth} from './hooks/useAuth';
import {fetchCurrentUserAction} from './data/actions/currentUserActions';

// TODO Fetch the current user using the token
function App() {
  const authToken = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    if (authToken.token) {
      console.log('on app getting auth token...');
      fetchCurrentUserAction(dispatch, authToken.token).then();
    }
  }, [authToken.token]);

  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route
            path="/app/*"
            element={
              <IsAuthenticated>
                <>
                  <div>
                    <Link to="/app">Dashboard</Link>
                    <br />
                    <Link to="/app/projects">Projects</Link>
                    <br />
                    <Link to="/app/issues">Issues</Link>
                    <br />
                    <Link to="/app/teams">Teams</Link>
                    <br />
                    <Link to="/app/help">Help & Support</Link>
                    <br />
                    <Link to="/app/reported-problems">Reported Problems</Link>
                  </div>
                  <Routes>
                    <Route element={<DashboardPage />} path="" />
                    <Route element={<ProjectListingPage />} path="projects" />
                    <Route element={<ProjectDetailPage />} path="projects/:id" />
                    <Route element={<IssueListPage />} path="issues" />
                    <Route element={<IssueDetailPage />} path="issues/:id" />
                    <Route element={<TeamListPage />} path="teams" />
                    <Route element={<TeamDetailPage />} path="teams/:id" />
                    <Route element={<HelpPage />} path="help" />
                    <Route element={<ReportedProblemListing />} path="reported-problems" />
                    <Route element={<ReportedProblemDetailPage />} path="reported-problems/:id" />
                  </Routes>
                </>
              </IsAuthenticated>
            }
          />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
