import { Express } from "express"

// Router Imports
import CommentRouter from "../routers/Comment.router";
import HelpContenRouter from "../routers/HelpContent.router";
import IssueRouter from "../routers/Issue.router";
import ProjectRouter from "../routers/Project.router";
import ReactionRouter from "../routers/Reaction.router";
import ReportedProblemRouter from "../routers/ReportedProblem.router";
import TeamRouter from '../routers/Team.router';
import UserProfileRouter from "../routers/UserProfile.router";

export const configureRoutes = (app: Express, basePath: string = '/api') => {
  const commentRouter = new CommentRouter(`${basePath}/comments`);
  app.use(commentRouter.getRoutes());
  const helpContentRouter = new HelpContenRouter(`${basePath}/help-content`);
  app.use(helpContentRouter.getRoutes());
  const issueRouter = new IssueRouter(`${basePath}/issues`);
  app.use(issueRouter.getRoutes());
  const projectRouter = new ProjectRouter(`${basePath}/projects`);
  app.use(projectRouter.getRoutes());
  const reactionRouter = new ReactionRouter(`${basePath}/reactions`);
  app.use(reactionRouter.getRoutes());
  const reportedProblemRouter = new ReportedProblemRouter(`${basePath}/reported-problems`);
  app.use(reportedProblemRouter.getRoutes());
  const teamRouter = new TeamRouter(`${basePath}/teams`);
  app.use(teamRouter.getRoutes());
  const userProfileRouter = new UserProfileRouter(`${basePath}/users`);
  app.use(userProfileRouter.getRoutes());
}