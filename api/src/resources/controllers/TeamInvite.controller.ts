import BaseController from "./Base.controller";
import TeamInviteModel from "../models/TeamInvite.model";

export default class TeamInviteController extends BaseController {
  constructor() {
    super(TeamInviteModel);
  }
}
