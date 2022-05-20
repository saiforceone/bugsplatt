import React from 'react';
import { HiTag } from 'react-icons/hi';
import './tag.css';

export interface TagProps {
  labelText: string;
  size: 'small' | 'medium';
  icon?: React.ReactElement;
}

export const Tag = ({
  labelText = 'Tag',
  size = 'small',
  icon,
  ...props
}: TagProps) => {
  return (
    <label className={['tag', `tag--${size}`].join(' ')}>
      <>
        {icon ? icon : <HiTag className='tag--icon' />}
        {labelText}
      </>
    </label>
  );
};

