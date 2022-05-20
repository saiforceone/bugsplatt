import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IssueModal } from "./IssueModal";

export default {
  title: 'Modals/IssueModal',
  component: IssueModal
} as ComponentMeta<typeof IssueModal>

const Template: ComponentStory<typeof IssueModal> = (args) => <IssueModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  projectName: 'Project One'
}