import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DefaultButton } from "./DefaultButton";
import { HiCheckCircle } from "react-icons/hi";

export default {
  title: 'BaseComponents/DefaultButton',
  component: DefaultButton,
} as ComponentMeta<typeof DefaultButton>

const Template: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  buttonSize: 'medium',
  icon: <HiCheckCircle className="h-5 w-5" />,
  label: 'Default Button',
  onClick: () => console.log('no action set')
}