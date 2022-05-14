import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Tag } from "./Tag";

export default {
  title: 'BaseComponents/Tag',
  component: Tag
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  labelText: 'JavaScript'
}