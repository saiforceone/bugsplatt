import BaseController from "./Base.controller";
import ReactionModel from "../models/Reaction.model";

/**
 * @class ReactionControl
 * @extends BaseController
 * @description Controller specific to the Reaction model
 */
class ReactionController extends BaseController {
  constructor() {
    super(ReactionModel);
  }
}

export default ReactionController;
