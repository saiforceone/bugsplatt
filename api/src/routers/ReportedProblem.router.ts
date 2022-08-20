import { pick as lodashPick } from "lodash";
import BaseRouter, {
  ROUTER_RESPONSE_CODES, ROUTER_RESPONSE_MESSAGES,
} from "./Base.router";
import ReportedProblemController from "../resources/controllers/ReportedProblem.controller";
import { RequestHandler, Request, Response } from "express";
import { IReportedProblem } from "../resources/interfaces/ReportedProblem.interface";

const REPORTED_PROB_FILTER_FIELDS = ["createdBy", "problemStatus", "problemType"];
const REPORTED_PROB_FIELDS = ["content", "problemType"];
const REPORTED_PROB_UPDATE_FIELDS = ["problemStatus"];

export default class ReportedProblemRouter extends BaseRouter {
  constructor(path: string) {
    const controller = new ReportedProblemController();
    super(path, controller);
  }

  protected createResource(
    middleware: RequestHandler[] = []
  ): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const data = lodashPick(req.body, REPORTED_PROB_FIELDS);
          data["createdBy"] = req._user!._id;

          response.data = (await this._controller.createDocument(
            data
          )) as object;
          response.success = !!response.data;

          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES.RESOURCE_CREATED
                : ROUTER_RESPONSE_CODES.BAD_REQUEST
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }

  protected getResources(middleware: RequestHandler[] = []): RequestHandler[] {
    return [
      ...middleware,
      async (req: Request, res: Response) => {
        const response = this.getDefaultResponse();
        try {
          const filter: { [key: string]: any } = lodashPick(
            req.query,
            REPORTED_PROB_FILTER_FIELDS
          );
          const data = (await this._controller.getDocuments(
            filter
          )) as IReportedProblem[];

          response.data = data;
          response.success = !!data.length;

          return res
            .status(
              response.success
                ? ROUTER_RESPONSE_CODES.RESOURCE_FOUND
                : ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND
            )
            .json(response);
        } catch (e) {
          response.error = (e as Error).message;
          return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
        }
      },
    ];
  }

  protected updateResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const resourceId: string = req.params.id;
        const data = lodashPick(req.body, REPORTED_PROB_UPDATE_FIELDS);

        const updatedDoc = await this._controller.updateDocument(resourceId, data);

        if (!updatedDoc) {
          response.error = ROUTER_RESPONSE_MESSAGES.RES_NOT_FOUND;
          return res.status(ROUTER_RESPONSE_CODES.BAD_REQUES).json(response);
        }

        response.data = updatedDoc;
        response.success = !!updatedDoc;

        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_UPDATED).json(response);

      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }
}
