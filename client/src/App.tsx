import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { IsAuthenticated } from "./components/Navigation/IsAuthenticated/IsAuthenticated";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { ProjectListingPage } from "./pages/Projects/ProjectListingPage/ProjectListingPage";
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
                  {/* TODO: add the other pages */}
                  <Route element={<ProjectListingPage />} path="/projects" />
                  <Route element={<TeamListPage />} path="/teams" />
                </Routes>
              </IsAuthenticated>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
