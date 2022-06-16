import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InviteMemberModal } from "./InviteMemberModal";

export default {
  title: 'Modals/InviteMemberModal',
  component: InviteMemberModal
} as ComponentMeta<typeof InviteMemberModal>

const Template: ComponentStory<typeof InviteMemberModal> = args => <InviteMemberModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  
}
