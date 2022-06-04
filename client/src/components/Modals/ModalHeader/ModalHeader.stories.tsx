import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HiInformationCircle } from "react-icons/hi";
import { ModalHeader } from "./ModalHeader";

export default {
  title: 'ModalHelpers/ModalHeader',
  component: ModalHeader,
} as ComponentMeta<typeof ModalHeader>

const Template: ComponentStory<typeof ModalHeader> = args => <ModalHeader {...args} />

export const Primary = Template.bind({});

Primary.args = {
  icon: <HiInformationCircle className="default-icon center-center" style={{color: '#666'}} />,
  subtitle: 'Some kind subtitle...',
  title: 'Default Title',
}