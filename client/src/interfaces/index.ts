export interface UserComment {
  content: string;
}

export interface SelectableOption {
  label: string;
  value: string;
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

export interface ProjectType {
  label: string;
  value: string;
}

export interface SelectOption {
  id?: string;
  label: string;
  value: string;
}

export interface AppNotification {
  id?: string;
  title: string;
  details: string;
  notificationType: "default" | "error" | "info" | "success" | "warning";
}

export interface NewProjectData {
  colorCode?: string;
  projectDesc: string;
  projectName: string;
  projectType: string;
}

export interface APIResponse {
  data: object[] | object;
  error: string;
  success: boolean;
}

export interface APIQuery {
  [key: string]: string;
}

export interface CommonSlice {
  isFetchingData: boolean;
  lastError?: string;
  totalItems: number;
}

interface FECommonData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface FEProject extends FECommonData {
  createdBy: string;
  associatedTeam: string;
  projectName: string;
  projectType: string;
  colorCode?: string;
  tags: string[];
}

export interface FETeam extends FECommonData {
  managedBy: string;
  teamName: string;
  teamDescription: string;
  teamImage?: string;
  teamMembers: string[];
}

export interface FEIssue extends FECommonData {
  createdBy: string;
  assignedTo: string;
  associatedProject: string;
  description: string;
  expectedCloseDate?: string;
  priority: string;
  status: string;
  tags: string[];
  title: string;
  watchedBy: string;
}

export interface FEComment extends FECommonData {
  associatedIssue: string;
  content: string;
  createdBy: string;
}