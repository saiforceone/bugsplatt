import {Types} from 'mongoose';
import {Request, Response, RequestHandler, Router} from 'express';
import BaseController from '../resources/controllers/Base.controller';
import { IComment } from '../resources/interfaces/Comment.interface';

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

  // Create

  /**
   * @protected
   * @method createResource
   * @param {Array<RequestHandler>} middleware 
   * @description Route handler for creating a new resource
   * @returns {Array<RequestHandler>}
   */
  protected createResource(middleware: Array<RequestHandler> = []) {
    return [...middleware, async (req: Request, res: Response) => {
      try {
        const data = req.body;
        // Start Note: under normal circumstances we would never do this. We will always override this in child classes
        data.associatedIssue = new Types.ObjectId();
        data.createdBy = new Types.ObjectId();
        // End Note
        const savedComment = await this._controller.createDocument(data);
        return res.status(201).json({success: !!savedComment, resource: savedComment});
      } catch (e) {
        return res.status(500).json({success: true});
      }
    }]
  }

  // Read

  /**
   * @protected
   * @method getResource
   * @param {Array<RequestHandler>} middleware middleware functions that should be executed before the final route handler
   * @description Route handler that retrieves a single resource
   * @returns {Array<RequestHandler>}
   */
  protected getResource(middleware: Array<RequestHandler> = []) {
    return [...middleware, async (req: Request, res: Response) => {
      try {
        const resourceId: string = req.params.id;
        const comment = await this._controller.getDocumentById(resourceId) as IComment;
        return res.status(200).json({success: true, resource: comment});
      } catch (e) {
        return res.status(500).json({success: false, message: `mission failed ${(e as Error).message}`}); 
      }
    }]
  }

  /**
   * @protected
   * @method getResources
   * @param {Array<RequestHandler>} middleware middleware functions that should be executed before the final route handler
   * @description Route handler that retrieves a list of resources
   * @returns {Array<RequestHandler>}
   */
  protected getResources(middleware: Array<RequestHandler> = []) {
    return [...middleware, async (req: Request, res: Response) => {
      try {
        const comments = await this._controller.getDocuments({}) as IComment[];
        return res.status(200).json({success: true, resource: comments});
      } catch (e) {
        return res.status(500).json({success: false, message: `mission failed ${(e as Error).message}`});
      }
      
    }];
  }

  // Update

  /**
   * @protected
   * @method updateResource
   * @param {Array<RequestHandler>} middleware middleware functions that should be executed before the final router handler
   * @description Route handleer for updating a single resource
   * @returns {Array<RequestHandler>}
   */
  protected updateResource(middleware: Array<RequestHandler> = []) {
    return [...middleware, async (req: Request, res: Response) => {
      try {
        const resourceId: string = req.params.id;
        const data = req.body;
        console.log('update method req.body: ', req.body);
        const updateResult = await this._controller.updateDocument(resourceId, data);
        return res.status(202).json({success: !!updateResult, resource: updateResult});
      } catch (e) {
        return res.status(500).json({success: false, message: (e as Error).message});
      }
    }];
  }

  // Delete

  /**
   * @protected
   * @method deleteResource
   * @param {Array<RequestHandler>} middleware 
   * @description Route handler for deleting a resource
   * @returns {Array<RequestHandler>}
   */
  protected deleteResource(middleware: Array<RequestHandler> = []) {
    return [...middleware, async (req: Request, res: Response) => {
      try {
        const resourceId = req.params.id;
        const deleteResult = await this._controller.deleteDocument(resourceId);
        return res.status(200).json({success: !!deleteResult})
      } catch (e) {
        return res.status(500).json({success: false, message: (e as Error).message});
      }
    }];
  }

  /**
   * @public
   * @method getRoutes
   * @description Returns all routes defined for this router
   * @returns {Router}
   */
  public getRoutes() {
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
