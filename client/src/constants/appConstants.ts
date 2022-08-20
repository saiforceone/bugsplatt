import {SelectOption} from "../interfaces";

const EMPTY_SELECT_OPT: SelectOption = {
  label: '---',
  value: '',
}

export const FE_PROJECT_TYPES: SelectOption[] = [
  {
    ...EMPTY_SELECT_OPT
  },
  {
    label: 'Backend Project',
    value: 'backend'
  }, {
    label: 'Frontend Project',
    value: 'frontend'
  }, {
    label: 'Fullstack',
    value: 'fullstack'
  }, {
    label: 'Mobile App Project',
    value: 'mobile-app'
  }, {
    label: 'Web App',
    value: 'web-app'
  }
];

export const FE_PROJECT_STATUSES: SelectOption[] = [
  {
    ...EMPTY_SELECT_OPT
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Closed',
    value: 'closed'
  }
];

export const FE_ISSUE_STATUSES: SelectOption[] = [
  {
    ...EMPTY_SELECT_OPT
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Closed',
    value: 'closed'
  }
]

export const FE_PROJECT_PRIORITIES: SelectOption[] = [
  {
    ...EMPTY_SELECT_OPT
  },
  {
    label: 'Low',
    value: 'low'
  },
  {
    label: 'Medium',
    value: 'med'
  },
  {
    label: 'High',
    value: 'high'
  },
  {
    label: 'OMG WTF? WHY? HOW?!',
    value: 'omg-wtf'
  }
];

export const FE_REPORTED_PROBLEM_TYPES: SelectOption[] = [
  {
    ...EMPTY_SELECT_OPT
  },
  {
    label: 'General',
    value: 'general'
  },
  {
    label: 'Login & Account Related',
    value: 'accounts-login'
  },
  {
    label: 'Other Problems',
    value: 'other-unspecified'
  }
];

export const FE_REPORTED_PROBLEM_STATUSES: SelectOption[] = [
  {
    ...EMPTY_SELECT_OPT
  },
  {
    label: 'Open',
    value: 'open'
  },
  {
    label: 'Closed',
    value: 'closed'
  }
]
