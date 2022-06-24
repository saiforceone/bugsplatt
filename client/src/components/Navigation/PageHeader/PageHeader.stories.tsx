import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HiArrowLeft } from "react-icons/hi";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { IconButton } from "../../BaseComponents/IconButton/IconButton";
import { PageHeader } from "./PageHeader";

export default {
  title: 'Navigation/PageHeader',
  component: PageHeader
} as ComponentMeta<typeof PageHeader>

const Template: ComponentStory<typeof PageHeader> = args => <PageHeader {...args} />

export const Primary = Template.bind({});

Primary.args = {
  backActionElement: <IconButton active icon={<HiArrowLeft className="default-tag--icon" />} />,
  rightActions: <>
    <DefaultButton active label="Click Me" />,
    <DefaultButton active label="Click Me 2" />
  </>,
  title: 'Dashboard',
}