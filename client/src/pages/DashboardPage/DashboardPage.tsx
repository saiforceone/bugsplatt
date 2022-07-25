import {Link} from 'react-router-dom';

export const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard Page Here</h1>
      <Link to="/app/projects">Projects</Link>
      <br />
      <Link to="/app/issues">Issues</Link>
      <br />
      <Link to="/app/teams">Teams</Link>
      <br />
      <Link to="/app/help">Help & Support</Link>
    </div>
  )
};
