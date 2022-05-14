import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TextInput } from "./TextInput";

export default {
  title: 'BaseComponents/TextInput',
  component: TextInput
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  labelText: '',
  id: 'default-text-input',
  placeholder: 'Type stuff here...'
}