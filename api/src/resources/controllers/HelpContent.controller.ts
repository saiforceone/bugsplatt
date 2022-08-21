import BaseController from "./Base.controller";
import HelpContentModel from "../models/HelpContent.model";

export default class HelpContentController extends BaseController {
  constructor() {
    super(HelpContentModel);
  }
}
