import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NewProjectModal } from "./NewProjectModal";

export default {
  title: 'Modals/NewProjectModal',
  component: NewProjectModal
} as ComponentMeta<typeof NewProjectModal>

const Template: ComponentStory<typeof NewProjectModal> = args => <NewProjectModal {...args} />

export const Primary = Template.bind({});

