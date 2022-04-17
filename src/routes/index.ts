import { Express } from "express"

// Router Imports
import CommentRouter from "../routers/Comment.router";
import IssueRouter from "../routers/Issue.router";
import ProjectRouter from "../routers/Project.router";

export const configureRoutes = (app: Express, basePath: string = '/api'): void => {
  const commentRouter = new CommentRouter(`${basePath}/comments`);
  app.use(commentRouter.getRoutes());
  const issueRouter = new IssueRouter(`${basePath}/issues`);
  app.use(issueRouter.getRoutes());
  const projectRouter = new ProjectRouter(`${basePath}/projects`);
  app.use(projectRouter.getRoutes());
}