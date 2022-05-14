import './select.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  active?: boolean;
  id: string;
  labelText?: string;
  options: Array<SelectOption>;
}

export const Select = ({
  active = true,
  id = 'default-select',
  labelText = 'Pick something',
  options = [],
  ...props
}: SelectProps) => {
  return (
    <div className='select--container'>
      {labelText && (
        <label className='select--label' htmlFor={`${id}`}>
          {labelText}
        </label>
      )}
      <select className='select--field' disabled={!active} id={id} {...props}>
        <option disabled>Choose...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}