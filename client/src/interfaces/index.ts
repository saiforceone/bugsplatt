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
  notificationType: 'default' | 'error' | 'info' | 'success' | 'warning';
}