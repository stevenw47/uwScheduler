import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import './CheckboxInput.scss';

// TODO: not sure
interface CheckboxInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  labelText?: string;
  checkboxColor?: string; // color
}

export const CheckboxInput: FunctionComponent<CheckboxInput> = ({
  labelText,
  checkboxColor,
  ...props
}) => {
  const color = checkboxColor ?? 'black';
  const style = {
    background: props.checked ? color : 'white',
    border: `1px solid ${color}`,
  };
  return (
    <div className="uw-scheduler-field">
      <label className="uw-scheduler-checkbox-wrapper">
        <input
          className="uw-scheduler-checkbox-input"
          type="checkbox"
          {...props}
        />
        <span className="checkmark" style={style} />
      </label>
      <span>{labelText ?? null}</span>
    </div>
  );
};
