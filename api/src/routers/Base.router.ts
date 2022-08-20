import {Request, Response, RequestHandler, Router} from 'express';
import BaseController from '../resources/controllers/Base.controller';
import { IComment } from '../resources/interfaces/Comment.interface';
import { IBase } from '../resources/interfaces/Base.interface';

export interface IRouterResponse {
  data: object[]|object;
  success: boolean;
  error: string|null;
}

export const ROUTER_RESPONSE_CODES: {[key: string]: number} = {
  BAD_REQUEST: 400,
  RESOURCE_CREATED: 201,
  RESOURCE_DELETED: 200,
  RESOURCE_FOUND: 200,
  RESOURCE_NOT_FOUND: 404,
  RESOURCE_UPDATED: 200,
  EXCEPTION: 500,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
};

export const ROUTER_RESPONSE_MESSAGES: {[key: string]: string} = {
  RES_NOT_FOUND: 'Resource not found',
  RELATED_RES_NOT_FOUND: 'Related resource was not found',
}

export const POPULATE_ASSOC_PROJ = {
  path: 'associatedProject',
  select: 'projectName'
}

export const POPULATE_ASSOC_CREATED_BY = {
  path: "createdBy",
  model: "UserProfile",
  select: "-__v",
};

export const POPULATE_ASSOC_WATCHED_BY = { path: "watchedBy", select: "-__v"};

export const POPULATE_ASSIGNED_TO = { path: "assignedTo", select: "-__v" };

export const POPULATE_ASSOC_TEAM = { path: "associatedTeam", select: "-__v" };

export const POPULATE_ASSOC_ISSUE = { path: "associatedIssue", select: "-__v"};

/**
 * @abstract
 * @class BaseRouter
 * @description Defines a base router class that never has instances created
 */
abstract class BaseRouter {
  _basePath: string;
  protected _router: Router;
  protected _controller: BaseController;

  /**
   * @constructor
   * @param {string} basePath sets the base path for the router
   */
  constructor(basePath: string = '/', controller: BaseController) {
    this._basePath = basePath;
    this._router = Router();
    this._controller = controller;
    console.log(`⚡ [Server]: {Router} :: ${this.constructor.name} initialized...`);
  }

  /**
   * @public
   * @method getDefaultResponse
   * @description Returns a standard response object for our API
   */
  public getDefaultResponse(): IRouterResponse {
    return {
      data: {},
      error: '',
      success: false,
    }
  }

  /**
   * @public
   * @method getName
   * @description Helper that returns the name of the router
   */
  public getName(): string {
    return this.constructor.name;
  }

  protected hasCurrentUser(req: Request): boolean {
    return !!req._user;
  }

  // Create

  /**
   * @protected
   * @method createResource
   * @param {Array<RequestHandler>} middleware
   * @description Route handler for creating a new resource
   * @returns {Array<RequestHandler>}
   */
  protected createResource(middleware: Array<RequestHandler> = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const data = req.body;

        response.data = await this._controller.createDocument(data) as object;
        response.success = !!response.data;

        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_CREATED).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  // Read

  /**
   * @protected
   * @method getResource
   * @param {Array<RequestHandler>} middleware middleware functions that should be executed before the final route handler
   * @description Route handler that retrieves a single resource
   * @returns {Array<RequestHandler>}
   */
  protected getResource(middleware: Array<RequestHandler> = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const resourceId: string = req.params.id;
        response.data = await this._controller.getDocumentById(resourceId) as IComment;
        response.success = !!response.data;
        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_FOUND).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  /**
   * @protected
   * @method getResources
   * @param {Array<RequestHandler>} middleware middleware functions that should be executed before the final route handler
   * @description Route handler that retrieves a list of resources
   * @returns {Array<RequestHandler>}
   */
  protected getResources(middleware: Array<RequestHandler> = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        // TODO: get the query params from req.query
        const data = await this._controller.getDocuments({}) as IBase[];

        response.data = data;
        response.success = data.length > 0;

        return res.status(
          response.success
          ? ROUTER_RESPONSE_CODES.RESOURCE_FOUND
          : ROUTER_RESPONSE_CODES.RESOURCE_NOT_FOUND
          ).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  // Update

  /**
   * @protected
   * @method updateResource
   * @param {Array<RequestHandler>} middleware middleware functions that should be executed before the final router handler
   * @description Route handleer for updating a single resource
   */
  protected updateResource(middleware: RequestHandler[] = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const resourceId: string = req.params.id;
        const data = req.body;

        response.data = await this._controller.updateDocument(resourceId, data) as object;
        response.success = !!response.data;

        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_CREATED).json(response);
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  // Delete

  /**
   * @protected
   * @method deleteResource
   * @param {Array<RequestHandler>} middleware
   * @description Route handler for deleting a resource
   */
  protected deleteResource(middleware: Array<RequestHandler> = []): RequestHandler[] {
    return [...middleware, async (req: Request, res: Response) => {
      const response = this.getDefaultResponse();
      try {
        const resourceId = req.params.id;
        const deleteResult = await this._controller.deleteDocument(resourceId);
        response.success = !!deleteResult
        return res.status(ROUTER_RESPONSE_CODES.RESOURCE_DELETED).json(response)
      } catch (e) {
        response.error = (e as Error).message;
        return res.status(ROUTER_RESPONSE_CODES.EXCEPTION).json(response);
      }
    }];
  }

  /**
   * @public
   * @method getRoutes
   * @description Returns all routes defined for this router
   */
  public getRoutes(): Router {
    this._router.route(`${this._basePath}/:id`)
      .get(this.getResource())
      .put(this.updateResource())
      .delete(this.deleteResource());

    this._router.route(`${this._basePath}`)
      .get(this.getResources())
      .post(this.createResource());

    return this._router;
  }
}

export default BaseRouter;
