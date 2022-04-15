import TeamModel from "../models/Team.model";
import BaseController from "./Base.controller";

/**
 * @class TeamController
 * @description Defines methods specific to working with the Team model
 */
export default class TeamController extends BaseController {
  constructor() {
    super(TeamModel);
  }
}