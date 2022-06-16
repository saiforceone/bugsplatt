import { HiExclamation } from 'react-icons/hi';
import './noResultCard.css';

export interface NoResultCardProps {
  icon?: React.ReactElement;
  primaryText?: string;
  secondaryText?: string;
}

export const NoResultCard = ({
  icon,
  primaryText,
  secondaryText,
  ...props
}: NoResultCardProps): JSX.Element => {
  return (
    <div className='no-result--container'>
      <div className='no-result--icon-container'>
        {icon ? icon : <HiExclamation className='no-result--icon' />}
      </div>
      <h4 className='no-result--primary-text'>{primaryText ? primaryText : 'No Results Found'}</h4>
      {secondaryText && <p className='no-result--secondary-text'>{secondaryText}</p>}
    </div>
  );
};
