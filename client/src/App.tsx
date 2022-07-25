import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { IsAuthenticated } from "./components/Navigation/IsAuthenticated/IsAuthenticated";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { HelpPage } from "./pages/HelpPage/HelpPage";
import { IssueDetailPage } from "./pages/Issues/IssueDetailsPage/IssueDetailPage";
import { IssueListPage } from "./pages/Issues/IssueListPage/IssueListPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { ProjectDetailPage } from "./pages/Projects/ProjectDetailPage/ProjectDetailPage";
import { ProjectListingPage } from "./pages/Projects/ProjectListingPage/ProjectListingPage";
import { TeamDetailPage } from "./pages/Teams/TeamDetailPage/TeamDetailPage";
import { TeamListPage } from "./pages/Teams/TeamListPage/TeamListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route
          path="/app/*"
          element={
            <IsAuthenticated>
              <Routes>
                <Route element={<DashboardPage />} path="" />
                <Route element={<ProjectListingPage />} path="projects" />
                <Route element={<ProjectDetailPage />} path="projects/:id" />
                <Route element={<IssueListPage />} path="issues" />
                <Route element={<IssueDetailPage />} path="issue/:id" />
                <Route element={<TeamListPage />} path="teams" />
                <Route element={<TeamDetailPage />} path="teams/:id" />
                <Route element={<HelpPage />} path="help" />
              </Routes>
            </IsAuthenticated>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
