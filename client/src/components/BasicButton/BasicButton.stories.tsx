import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {BasicButton} from './BasicButton';

export default {
  title: 'Basic Button',
  component: BasicButton,
} as ComponentMeta<typeof BasicButton>;

const Template: ComponentStory<typeof BasicButton> = (args) => <BasicButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  action: () => console.log('click'),
  title: 'Button',
};