import { HiCake } from 'react-icons/hi';
import { GiPieSlice } from 'react-icons/gi';
import './menuItem.css';

export interface MenuItemProps {
  active: boolean;
  icon?: React.ReactElement;
  primaryText: string;
  secondaryText?: string;
  target: string;
}

export const MenuItem = ({
  active = true,
  icon = <GiPieSlice className='h-7 w-7 text-white' />,
  primaryText = 'Menu Item',
  secondaryText = 'Secondary text',
  target = '/test'
}: MenuItemProps) => {
  return (
    <a>
      <div className='menu-item--container'>
        {icon && (
          <div className='flex flex-col justify-center mr-2'>
            {icon}
          </div>
        )}
        <div className="menu-item--content">
          <h3 className='menu-item--primary-text'>
            {primaryText}
          </h3>
          {secondaryText && (
            <small className="menu-item--secondary-text">
              {secondaryText}
            </small>
          )}
        </div>
      </div>
    </a>
  );
}
