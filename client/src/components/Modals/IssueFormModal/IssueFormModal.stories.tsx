import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IssueFormModal } from "./IssueFormModal";

export default {
  title: 'Modals/IssueFormModal',
  component: IssueFormModal
} as ComponentMeta<typeof IssueFormModal>

const Template: ComponentStory<typeof IssueFormModal> = args => <IssueFormModal {...args} />

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
