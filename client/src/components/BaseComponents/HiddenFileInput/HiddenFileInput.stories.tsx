import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HiddenFileInput } from "./HiddenFileInput";

export default {
  title: 'BaseComponents/HiddenFileInput',
  component: HiddenFileInput
} as ComponentMeta<typeof HiddenFileInput>;

const Template: ComponentStory<typeof HiddenFileInput> = args => <HiddenFileInput {...args} />

export const Primary = Template.bind({});

Primary.args = {
  buttonText: 'Add Attachment'
}
