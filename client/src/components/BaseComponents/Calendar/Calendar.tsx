import { FC, InputHTMLAttributes } from "react";
import { FormControlWrapper } from "../FormControlWrapper/FormControlWrapper";
import "./Calendar.css";

export interface CalendarProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
}

export const Calendar: FC<CalendarProps> = ({
  id = "default-calendar-id",
  labelText,
  value,
  ...props
}: CalendarProps): JSX.Element => {
  return (
    <FormControlWrapper
      labelId={id}
      labelText={labelText}
      control={<input className="form-control--field" id={id} type="date" value={value} {...props} />}
    />
  );
};
