import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextArea } from "./TextArea";

export default {
  title: 'BaseComponents/TextArea',
  component: TextArea
} as ComponentMeta<typeof TextArea>

const Template: ComponentStory<typeof TextArea> = args => <TextArea {...args} />

export const Primary = Template.bind({});

Primary.args = {
  labelText: '',
  id: 'default-text-area',
  placeholder: 'Type something here...'
}
