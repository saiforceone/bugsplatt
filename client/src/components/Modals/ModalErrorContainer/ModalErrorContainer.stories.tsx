import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ModalErrorContainer } from "./ModalErrorContainer";

export default {
  title: 'ModalHelpers/ModalErrorContainer',
  component: ModalErrorContainer
} as ComponentMeta<typeof ModalErrorContainer>

const Template: ComponentStory<typeof ModalErrorContainer> = args => <ModalErrorContainer {...args} />

export const Primary = Template.bind({});