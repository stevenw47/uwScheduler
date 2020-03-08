import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import './CheckboxInput.scss';

// TODO: not sure
interface CheckboxInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  labelText?: string;
}

export const CheckboxInput: FunctionComponent<CheckboxInput> = ({
  labelText,
  ...props
}) => {
  return (
    <div className="uw-scheduler-field">
      <input
        className="uw-scheduler-checkbox-input"
        type="checkbox"
        {...props}
      />
      {labelText ?? null}
    </div>
  );
};
