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
  description: string;
  projectName: string;
  projectType: string;
  associatedTeam: string;
}

export interface NewIssueData {
  associatedProject: string;
  description: string;
  expectedCloseDate?: string;
  priority: string;
  tags: string[];
  title: string;
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

export interface FEProjectSearchCriteria {
  createdBy?: string;
  associatedTeam?: string;
  projectType?: string;
}

export interface FEIssueSearchCriteria {
  assignedTo?: string;
  associatedProject?: string;
  createdBy?: string;
  priority?: string;
  status?: string;
}

export interface FECommonData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface FECommonUserData {
  _id: string;
  accountId: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  profilePicture: string;
  providerName: string;
  updatedAt: string;
}

export interface FEProject extends FECommonData {
  associatedTeam: {
    _id: string;
    managedBy: FECommonUserData;
    teamName: string;
    teamDescription: string;
  };
  createdBy: FECommonUserData;
  projectName: string;
  description: string;
  projectType: string;
  colorCode?: string;
  tags: string[];
  issues: FEIssue[];
}

export interface FETeam extends FECommonData {
  managedBy: string;
  teamName: string;
  teamDescription: string;
  teamImage?: string;
  teamMembers: string[];
}

export interface FEIssue extends FECommonData {
  createdBy: FECommonUserData;
  assignedTo: FECommonUserData;
  associatedProject: {
    _id: string;
    projectName: string;
  };
  description: string;
  expectedCloseDate?: string;
  priority: string;
  status: string;
  tags: string[];
  title: string;
  watchedBy: string[];
}

export interface FEComment extends FECommonData {
  associatedIssue: string;
  content: string;
  createdBy: FECommonUserData;
}
