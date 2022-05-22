import React from 'react';
import { HiTag } from 'react-icons/hi';
import './tag.css';

export interface TagProps {
  extraCss?: string;
  labelText: string;
  size: 'small' | 'medium';
  icon?: React.ReactElement;
}

export const Tag = ({
  extraCss = '',
  labelText = 'Tag',
  size = 'small',
  icon,
  ...props
}: TagProps) => {
  return (
    <label className={['tag', `tag--${size}`, extraCss].join(' ')}>
      <>
        {icon ? icon : <HiTag className='tag--icon' />}
        {labelText}
      </>
    </label>
  );
};

