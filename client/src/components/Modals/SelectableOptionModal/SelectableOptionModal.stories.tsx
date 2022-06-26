import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectableOptionModal } from "./SelectableOptionModal";

export default {
  title: 'Modals/SelectableOptionModal',
  component: SelectableOptionModal
} as ComponentMeta<typeof SelectableOptionModal>;

const Template: ComponentStory<typeof SelectableOptionModal> = args => <SelectableOptionModal {...args} />

export const Primary = Template.bind({})

Primary.args = {
  options: [{
    label: 'Option One',
    value: 'opt-one'
  }, {
    label: 'Option Two',
    value: 'opt-two'
  }, {
    label: 'Do not click',
    value: 'do-not-click'
  }],
  value: {label: 'Option One', value: 'opt-one'}
}
