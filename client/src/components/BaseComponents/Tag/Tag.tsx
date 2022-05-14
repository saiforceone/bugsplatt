import { HiTag } from 'react-icons/hi';
import './tag.css';

export interface TagProps {
  labelText: string;
  size: 'small' | 'medium'
}

export const Tag = ({
  labelText = 'Tag',
  size = 'small',
  ...props
}: TagProps) => {
  return (
    <label className={['tag', `tag--${size}`].join(' ')}>
      <HiTag className='tag--icon' />
      {labelText}
    </label>
  );
};

