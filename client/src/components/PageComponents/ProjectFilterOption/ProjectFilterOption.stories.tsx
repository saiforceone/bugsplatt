import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProjectFilterOption } from "./ProjectFilterOption";

export default {
  title: 'PageComponents/ProjectFilterOption',
  component: ProjectFilterOption
} as ComponentMeta<typeof ProjectFilterOption>

const Template: ComponentStory<typeof ProjectFilterOption> = args => <ProjectFilterOption {...args} />

export const Primary = Template.bind({});

Primary.args = {
  label: 'User',
  value: 'John Batman'
}