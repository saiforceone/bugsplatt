import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ModalNotification } from "./ModalNotification";

export default {
  title: 'ModalHelpers/ModalNotification',
  component: ModalNotification
} as ComponentMeta<typeof ModalNotification>

const Template: ComponentStory<typeof ModalNotification> = args => <ModalNotification {...args} />

export const Primary = Template.bind({});

Primary.args = {
  notification: {
    title: 'Missing Element',
    details: 'You have not selected the element required...',
    notificationType: 'error'
  }
}