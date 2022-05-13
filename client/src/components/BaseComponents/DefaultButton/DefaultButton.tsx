import './defaultButton.css';

export interface DefaultButtonProps {
  buttonSize?: 'small' | 'medium' | 'large';
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

export const DefaultButton = ({
  buttonSize = 'medium',
  label,
  ...props
}: DefaultButtonProps) => {
  return (
    <button className="default-button" onClick={props.onClick}>
      {label}
    </button>
  );
}
