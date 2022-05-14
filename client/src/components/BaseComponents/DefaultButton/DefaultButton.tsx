import './defaultButton.css';

export interface DefaultButtonProps {
  active: boolean;
  buttonSize?: 'small' | 'medium' | 'large';
  label: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}

export const DefaultButton = ({
  active = true,
  buttonSize = 'medium',
  label,
  icon = undefined,
  ...props
}: DefaultButtonProps) => {
  return (
    <button
      className={[`default-button default-button--${buttonSize} ${active ? '' : 'default-button--inactive'}`].join(' ')}
      disabled={!active}
      onClick={props.onClick}
    >
      {icon && (
        <div className='default-button--icon-container'>
          {icon}
        </div>
      )}
      {label}
    </button>
  );
}
