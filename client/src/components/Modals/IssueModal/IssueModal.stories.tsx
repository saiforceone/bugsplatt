import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IssueModal } from "./IssueModal";

export default {
  title: 'Modals/IssueModal',
  component: IssueModal
} as ComponentMeta<typeof IssueModal>

const Template: ComponentStory<typeof IssueModal> = (args) => <IssueModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  projectName: 'Project One',
  issueDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  comments: [{
    commentAuthor: 'John Batman',
    commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }, {
    commentAuthor: 'Code Bro',
    commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }]
}