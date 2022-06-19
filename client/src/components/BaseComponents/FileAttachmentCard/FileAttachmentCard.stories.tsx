import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FileAttachmentCard } from "./FileAttachmentCard";

export default {
  title: 'BaseComponents/FileAttachmentCard',
  component: FileAttachmentCard
} as ComponentMeta<typeof FileAttachmentCard>

const Template: ComponentStory<typeof FileAttachmentCard> = args => <FileAttachmentCard {...args} />

export const Primary = Template.bind({});

Primary.args = {
  fileName: 'A very big file.txt',
  fileSize: '3.5mb'
};