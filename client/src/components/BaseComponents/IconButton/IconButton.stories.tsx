import { ComponentMeta, ComponentStory } from "@storybook/react";

import { IconButton } from "./IconButton";
import '../../../index.css';

export default {
  title: 'BaseComponents/IconButton',
  component: IconButton
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  buttonSize: 'small',
  onClick: () => console.log('click'),
};