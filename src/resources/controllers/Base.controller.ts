import { Model } from 'mongoose';
import { DEFAULT_PAGE_LIMIT } from '../constants';
import { IBase } from '../interfaces/Base.interface';

/**
 * @class BaseController
 * @description defines a base controller that can be extended. not to be used by itself
 */
class BaseController {

  /**
   * @protected
   * Local model instance
   * #TODO: Figure out how to use an interface here instead of "any"
   */
  protected _model: Model<any>;

  constructor(model: Model<any>) {
    this._model = model;
    console.log(`⚡ [Server]: {Controller} :: ${this.constructor.name} initialized...`);
  }

  // Create

  /**
   * @public
   * @method createDocument
   * @param {Partial<IBase>} data Specifies data to be used in creating the document
   * @description Given data, attempts to create a document
   * @returns 
   */
  public async createDocument(data: Partial<IBase>) {
    return this._model.create(data);
  }

  // Read

  /**
   * @public
   * @method getDocumentById
   * @param {string} documentId Id of the document to retrieve
   * @description Given a doc id, attempts to retrieve the matching document
   * @returns 
   */
  public async getDocumentById(documentId: string) {
    return this._model.findById(documentId);
  }

  /**
   * @public
   * @method getDocumentWithQuery
   * @param {object} queryObject Defines the object to filter by
   * @description Given a query object, attempts to retrieve the first matching document
   * @returns 
   */
  public async getDocumentWithQuery(queryObject: object) {
    return this._model.findOne(queryObject);
  }

  /**
   * @method getDocuments
   * @param {object} queryObject Defines the object to filter by
   * @param {number?} page Optionally defines the page of results to return. If not specified, implies all results returned
   * @description Given a query object and an optional page number, attempts to retrieve an array of matching documents
   * @returns 
   */
  public async getDocuments(queryObject: object, page?: number) {
    if (!page) {
      return this._model.find(queryObject);
    }

    return this._model.find(queryObject).skip(page * DEFAULT_PAGE_LIMIT).limit(DEFAULT_PAGE_LIMIT);
  }

  // Update

  /**
   * @public
   * @method updateDocument
   * @param {string} documentId Specifies the id of the document to update
   * @param {Partial<IBase>} data Specifies what the document should be updated with
   * @description Given a document id and data, attempts to update the matching document
   * @returns 
   */
  public async updateDocument(documentId: string, data: Partial<IBase>) {
    return this._model.findByIdAndUpdate(documentId, data);
  }

  // Delete

  /**
   * @public
   * @method deleteDocument
   * @param {string} documentId Specifies the id of the document to be removed
   * @description Given a document id, attempts to delete the matchind document
   * @returns 
   */
  public async deleteDocument(documentId: string) {
    return this._model.findByIdAndRemove(documentId);
  }
}

export default BaseController;
