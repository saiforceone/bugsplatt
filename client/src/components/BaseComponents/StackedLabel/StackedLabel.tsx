import React, {FC} from 'react';
import './StackedLabel.css';

interface StackedLabelProps {
  label: string;
  content: string;
  icon?: React.ReactElement;
}

export const StackedLabel: FC<StackedLabelProps> = ({content, icon, label}) => {
  return (
    <div className="stacked-label">
      {icon && <div>{icon}</div>}
      <div>
        <h3 className="stacked-label--label">{label}</h3>
        <p className="stacked-label--content">{content}</p>
      </div>
    </div>
  );
};
