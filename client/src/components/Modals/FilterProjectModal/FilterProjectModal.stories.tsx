import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FilterProjectModal } from "./FilterProjectModal";

export default {
  title: 'Modals/FilterProjectModal',
  component: FilterProjectModal,
} as ComponentMeta<typeof FilterProjectModal>

const Template: ComponentStory<typeof FilterProjectModal> = args => <FilterProjectModal {...args} />

export const Primary = Template.bind({});

Primary.args = {
  associatedTeamOptions: [{
    label: 'Team One',
    value: '12345J'
  }, {
    label: 'Team Two',
    value: '1230901A'
  }],
  projectTypeOptions: [{
    label: 'FE Web Application',
    value: 'fe-web-application'
  }, {
    label: 'FS Web Application',
    value: 'fs-web-application'
  }, {
    label: 'BE Web Application',
    value: 'be-web-application'
  }],
  projectOwnerOptions: [{
    label: 'John Batman',
    value: '0920012X'
  }, {
    label: 'Jane Smith',
    value: '901025F'
  }]
}