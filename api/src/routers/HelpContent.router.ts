import BaseRouter from "./Base.router";
import HelpContentController from "../resources/controllers/HelpContent.controller";

export default class HelpContenRouter extends BaseRouter {
  constructor(basePath: string) {
    const controller = new HelpContentController();
    super(basePath, controller);
  }
}
