import { HiUserCircle, HiCog } from 'react-icons/hi';
import { IconButton } from '../IconButton/IconButton';
import './userCard.css';

export interface UserCardProps {
  displayName: string;
  profileImage?: string;
  secondaryText?: string;
}

export const UserCard = ({
  displayName = 'John Batman',
  secondaryText = 'john.batman@example.com',
  profileImage = '',
  ...props
}) => {
  return (
    <div className='user-card--container'>
      {profileImage ? (
        <img alt='profile-image' className='user-card--image' src={profileImage} />
      ) : (
        <HiUserCircle className='w-10 h-10' />
      )}
      <div className="user-card--content-container">
        <p className='user-card--content-name'>{displayName}</p>
        {secondaryText && (
          <p className='user-card--content-secondary'>{secondaryText}</p>
        )}
      </div>
      <IconButton active icon={<HiCog />} buttonSize='medium' />
    </div>
  );
}