import BaseController from "./Base.controller";
import ReportedProblemModel from "../models/ReportedProblem.model";

export default class ReportedProblemController extends BaseController {
  constructor() {
    super(ReportedProblemModel);
  }
}
