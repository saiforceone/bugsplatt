import React from 'react';
import { HiTag } from 'react-icons/hi';
import './tag.css';

export interface TagProps {
  extraCss?: string;
  labelText: string;
  size: 'small' | 'medium';
  icon?: React.ReactElement;
  actionElements?: React.ReactElement;
}

export const Tag = ({
  extraCss = '',
  labelText = 'Tag',
  size = 'small',
  icon,
  actionElements,
  ...props
}: TagProps) => {
  return (
    <div className={['tag', `tag--${size}`, extraCss].join(' ')}>
      {icon ? icon : <HiTag className='tag--icon' />}
      {labelText}
      {actionElements}
    </div>
  );
};

