import React from 'react';
import { HiTag } from 'react-icons/hi';
import './tag.css';

export interface TagProps {
  extraCss?: string;
  labelText: string;
  size: 'small' | 'medium';
  icon?: React.ReactElement;
  action?: () => void;
}

export const Tag = ({
  extraCss = '',
  labelText = 'Tag',
  size = 'small',
  icon,
  action,
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

