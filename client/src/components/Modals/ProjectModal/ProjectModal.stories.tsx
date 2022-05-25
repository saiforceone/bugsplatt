import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProjectModal } from "./ProjectModal";

export default {
  title: 'Modals/Project Modal',
  component: ProjectModal
} as ComponentMeta<typeof ProjectModal>

const Template: ComponentStory<typeof ProjectModal> = args => <ProjectModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  issueDetails: {
    currentValue: 10,
    maxValue: 15,
    label: 'Issues'
  },
  createdAt: '5/20/2022',
  createdBy: 'John Batman',
  teamName: 'Code Bros',
  projectDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
  projectName: 'Project One',
  projectTags: ['React', 'Redux', 'Tailwind'],
  issues: [{
    resourceId: 'iss-1',
    issueTitle: 'Issue #1',
    issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
  }, {
    resourceId: 'iss-2',
    issueTitle: 'Issue #2',
    issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
  }]
}