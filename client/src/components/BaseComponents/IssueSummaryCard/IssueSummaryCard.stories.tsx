import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IssueSummaryCard } from "./IssueSummaryCard";

export default {
  title: 'BaseComponents/IssueSummaryCard',
  component: IssueSummaryCard
} as ComponentMeta<typeof IssueSummaryCard>

const Template: ComponentStory<typeof IssueSummaryCard> = args => <IssueSummaryCard {...args} />

export const Primary = Template.bind({});

Primary.args = {
  issueTitle: 'Issue One',
  issueDesc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,'
}