import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Select, SelectOption } from "./Select";

const basicOptions: SelectOption[] = [{
  label: 'One',
  value: 'One'
}, {
  label: 'Two',
  value: 'Two'
}];

export default {
  title: 'BaseComponents/Select',
  component: Select
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  options: basicOptions
}