import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MenuItem } from "./MenuItem";

export default {
  title: 'BaseComponents/MenuItem',
  component: MenuItem
} as ComponentMeta<typeof MenuItem>

const Template: ComponentStory<typeof MenuItem> = (args) => <MenuItem {...args} />

export const Primary = Template.bind({});

Primary.args = {
  primaryText: 'Default Menu Item',
  active: true,
}
