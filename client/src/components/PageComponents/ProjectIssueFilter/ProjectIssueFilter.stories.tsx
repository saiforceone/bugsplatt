import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProjectIssueFilter } from "./ProjectIssueFilter";

export default {
  title: 'PageComponents/ProjectIssueFilter',
  component: ProjectIssueFilter
} as ComponentMeta<typeof ProjectIssueFilter>

const Template: ComponentStory<typeof ProjectIssueFilter> = args => <ProjectIssueFilter {...args} />

export const Primary = Template.bind({});

Primary.args = {
  projectPriorities: [{
    label: 'OMG WTF',
    value: 'omg-wtf'
  }, {
    label: 'Why is this not done yet?!',
    value: 'why-this-not-done-yet'
  }],
  projectStatuses: [{
    label: 'open',
    value: 'open'
  }, {
    label: 'closed',
    value: 'closed'
  }]
}