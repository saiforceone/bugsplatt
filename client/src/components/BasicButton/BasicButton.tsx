import React from 'react';
import './basicButton.css';

export interface ButtonProps {
  action?: () => void;
  title: string;
}

export const BasicButton = ({...props}: ButtonProps) => {
  const {action, title} = props;
  return (
    <button
      className="basicButton"
      onClick={action}
    >
      {title}
    </button>
  );
}