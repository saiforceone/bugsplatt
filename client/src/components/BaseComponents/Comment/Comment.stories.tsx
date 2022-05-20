import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Comment } from "./Comment";

export default {
  title: 'BaseComponents/Comment',
  component: Comment
} as ComponentMeta<typeof Comment>

const Template: ComponentStory<typeof Comment> = (args) => <Comment {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  commentAuthor: 'John Batman',
  commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
}