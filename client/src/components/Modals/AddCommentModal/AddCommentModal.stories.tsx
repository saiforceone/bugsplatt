import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AddCommentModal } from "./AddCommentModal";

export default {
  title: 'Modals/AddCommentModal',
  component: AddCommentModal
} as ComponentMeta<typeof AddCommentModal>

const Template: ComponentStory<typeof AddCommentModal> = args => <AddCommentModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  issueName: 'Some kind of problem'
}