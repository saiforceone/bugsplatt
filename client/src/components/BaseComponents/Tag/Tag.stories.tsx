import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HiCube, HiTrash } from "react-icons/hi";
import { Tag } from "./Tag";

export default {
  title: 'BaseComponents/Tag',
  component: Tag
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  actionElements: <>
    <HiTrash className="default--icon ml-2 self-center" />
  </>,
  labelText: 'JavaScript',
  icon: <HiCube className="h-5 w-5 mr-1 mt-1" />,
}