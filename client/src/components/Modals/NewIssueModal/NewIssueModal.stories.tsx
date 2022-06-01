import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NewIssueModal } from "./NewIssueModal";

export default {
  title: 'Modals/NewIssueModal',
  component: NewIssueModal
} as ComponentMeta<typeof NewIssueModal>

const Template: ComponentStory<typeof NewIssueModal> = args => <NewIssueModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  project: {
    objectId: '123456',
    projectName: 'Proejct One'
  },
  projectPriorities: [{
    label: 'Do another day',
    value: 'do-another-day'
  }, {
    label: 'OMG WTF',
    value: 'omg-wtf'
  }]
}