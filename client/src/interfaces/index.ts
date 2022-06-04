export interface UserComment {
  content: string;
}
export interface ProjectPriority {
  label: string;
  value: string;
}

export interface ProjectAssignee {
  objectId: string;
  assigneeName: string;
  teamName?: string;
}

export interface NewIssueProject {
  objectId: string;
  projectName: string;
}