import {ComponentMeta, ComponentStory} from '@storybook/react';
import { NoResultCard } from './NoResultCard';

export default {
  title: 'BaseComponents/NoResultCard',
  component: NoResultCard,
} as ComponentMeta<typeof NoResultCard>

const Template: ComponentStory<typeof NoResultCard> = args => <NoResultCard {...args} />

export const Primary =  Template.bind({});

Primary.args = {
  primaryText: 'No Issues Found',
  secondaryText: 'It would appear that no issues have been added for this project yet.'
}