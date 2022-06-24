import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProjectFilter } from "./ProjectFilter";

export default {
  title: 'PageComponents/ProjectFilter',
  component: ProjectFilter
} as ComponentMeta<typeof ProjectFilter>

const Template: ComponentStory<typeof ProjectFilter> = args => <ProjectFilter {...args} />

export const Primary = Template.bind({});

Primary.args = {
  projectTypes: [
    {label: 'FE Project', value: 'proj-fe'},
    {label: 'BE Project', value: 'proj-be'},
  ],
  teams: [
    {label: 'Super Awesome', value: 't12345'},
    {label: 'Bug Smashers', value: 't29012'},
  ],
  users: [
    {label: 'John Batman', value: '12345'},
    {label: 'John Smith', value: '201022'},
    {label: 'Jane Doe', value: '90120'}
  ]
}
