import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DefaultButton } from "../../BaseComponents/DefaultButton/DefaultButton";
import { SectionHeader } from "./SectionHeader";

export default {
  title: 'PageComponents/SectionHeader',
  component: SectionHeader
} as ComponentMeta<typeof SectionHeader>

const Template: ComponentStory<typeof SectionHeader> = args => <SectionHeader {...args} />

export const Primary = Template.bind({});

Primary.args = {
  actions: <>
    <DefaultButton active label="Click Me" />
  </>,
  subtitle: 'Details about section one',
  title: 'Section One',
}
