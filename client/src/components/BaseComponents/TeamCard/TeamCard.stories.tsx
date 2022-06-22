import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TeamCard } from "./TeamCard";

export default {
  title: "BaseComponents/TeamCard",
  component: TeamCard,
} as ComponentMeta<typeof TeamCard>;

const Template: ComponentStory<typeof TeamCard> = (args) => (
  <TeamCard {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  createdAt: '1/1/2022',
  managedBy: 'John Batman',
  numberOfMembers: 42,
  teamName: 'Super Awesome Team'
}
