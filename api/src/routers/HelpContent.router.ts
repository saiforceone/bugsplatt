import BaseRouter from "./Base.router";
import HelpContentController from "../resources/controllers/HelpContent.controller";

export default class HelpContentRouter extends BaseRouter {
  constructor(basePath: string) {
    const controller = new HelpContentController();
    super(basePath, controller);
  }
}
