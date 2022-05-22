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
    title: 'Issue #1',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
  }, {
    title: 'Issue #2',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
  }]
}