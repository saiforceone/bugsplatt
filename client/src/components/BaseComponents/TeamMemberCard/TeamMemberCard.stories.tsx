import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TeamMemberCard } from "./TeamMemberCard";

export default {
  title: 'BaseComponents/TeamMemberCard',
  component: TeamMemberCard
} as ComponentMeta<typeof TeamMemberCard>

const Template: ComponentStory<typeof TeamMemberCard> = args => <TeamMemberCard {...args} />

export const Primary = Template.bind({})

Primary.args = {
  emailAddress: 'jimbob@example.com',
  userFullname: 'Jim Bob'
}
