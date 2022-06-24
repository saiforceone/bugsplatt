import { ComponentMeta, ComponentStory } from "@storybook/react";
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
  backActionElement: <IconButton active />,
  rightActions: <>
    <DefaultButton active label="Click Me" />
  </>,
  title: 'Dashboard',
}