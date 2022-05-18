import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ProgressDetail } from "./ProgressDetail";

export default {
  title: 'BaseComponents/ProgressDetail',
  component: ProgressDetail
} as ComponentMeta<typeof ProgressDetail>

const Template: ComponentStory<typeof ProgressDetail> = (args) => <ProgressDetail {...args} />

export const Primary = Template.bind({});

Primary.args = {
  label: 'Issues',
  currentValue: 12,
  maxValue: 17
}
