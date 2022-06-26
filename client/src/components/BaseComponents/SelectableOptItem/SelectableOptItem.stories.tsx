import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectableOptItem } from "./SelectableOptItem";

export default {
  title: 'BaseComponents/SelectableOptionItem',
  component: SelectableOptItem
} as ComponentMeta<typeof SelectableOptItem>

const Template: ComponentStory<typeof SelectableOptItem> = args => <SelectableOptItem {...args} />

export const Primary = Template.bind({});

Primary.args = {
  option: {
    label: 'Option One',
    value: 'opt-one'
  },
  selected: false,
}