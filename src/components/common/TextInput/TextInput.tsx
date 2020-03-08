import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import './TextInput.scss';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const TextInput: FunctionComponent<TextInputProps> = props => {
  return (
    <div className="uw-scheduler-field">
      <input className="uw-scheduler-text-input" type="text" {...props} />
    </div>
  );
};
