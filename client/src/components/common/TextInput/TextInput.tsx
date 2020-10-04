import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import './TextInput.scss';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  leftIcon?: IconDefinition;
  onLeftIconClick?: () => void;
  rightIcon?: IconDefinition;
  onRightIconClick?: () => void;
}

export const TextInput: FunctionComponent<TextInputProps> = ({
  leftIcon,
  onLeftIconClick,
  rightIcon,
  onRightIconClick,
  ...props
}) => {
  const inputStyle = {
    borderTopLeftRadius: leftIcon ? 0 : '4px',
    borderBottomLeftRadius: leftIcon ? 0 : '4px',
    borderTopRightRadius: rightIcon ? 0 : '4px',
    borderBottomRightRadius: rightIcon ? 0 : '4px',
  };
  return (
    <div className="uw-scheduler-field">
      {leftIcon ? (
        <button
          className="uw-scheduler-text-input-left-button"
          onClick={onLeftIconClick ?? undefined}
        >
          <FontAwesomeIcon icon={leftIcon} />
        </button>
      ) : null}
      <input
        style={inputStyle}
        className="uw-scheduler-text-input"
        type="text"
        {...props}
      />
      {rightIcon ? (
        <button
          className="uw-scheduler-text-input-right-button"
          onClick={onRightIconClick ?? undefined}
        >
          <FontAwesomeIcon icon={rightIcon} />
        </button>
      ) : null}
    </div>
  );
};
