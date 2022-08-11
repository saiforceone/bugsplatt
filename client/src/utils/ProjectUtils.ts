import {FEProject} from '../interfaces';
import {FE_PROJECT_PRIORITIES} from '../constants/appConstants';

export default class ProjectUtils {
  static getClosedIssuesForProjCount (project: FEProject): number {
    return project.issues.filter((p) => p.status !== "active").length;
  };

  static getLabelForIssuePriority(priorityVal: string): string {
    const relatedObj = FE_PROJECT_PRIORITIES.find(el => el.value === priorityVal);
    if (!relatedObj) return priorityVal;
    return relatedObj.label;
  }
}
