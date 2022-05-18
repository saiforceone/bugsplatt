import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProjectCard } from "./ProjectCard";

export default {
  title: 'BaseComponents/ProjectCard',
  component: ProjectCard
} as ComponentMeta<typeof ProjectCard>

const Template: ComponentStory<typeof ProjectCard> = (args) => <ProjectCard {...args} />

export const Primary = Template.bind({});