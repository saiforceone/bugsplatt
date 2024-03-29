import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ReportIssueModal } from "./ReportIssueModal";

export default {
  title: 'Modals/ReportIssueModal',
  component: ReportIssueModal
} as ComponentMeta<typeof ReportIssueModal>;

const Template: ComponentStory<typeof ReportIssueModal> = args => <ReportIssueModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  teamName: 'Bug Smashers Extreme',
  userName: 'John Batman',
  issueTypes: [{
    label: 'General Issue',
    value: 'general-issue'
  }, {
    label: 'Usability Issue',
    value: 'usability-issue'
  }, {
    label: 'IDK',
    value: 'idk'
  }]
}
