import classNames from 'classnames';
import React, { ChangeEventHandler, forwardRef, LegacyRef } from 'react';

export interface TextInputProps {
  name: string;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  testId?: string;
  description?: string;
  type?: string;
  searchIcon?: boolean;
  theme?: 'dark' | 'light' | 'borderless';
}

function TextInput(
  {
    testId,
    description,
    isRequired = true,
    isDisabled = false,
    onChange,
    value,
    name,
    placeholder,
    searchIcon,
    theme = 'light',
    label,
    type = 'text',
  }: TextInputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <div className="tw-flex tw-flex-col tw-p-2">
      {label && (
        <div
          className={classNames('tw-text-center tw-font-medium tw-text-mGray tw-text-md tw-pb-1', {
            'tw-opacity-50': isDisabled,
          })}
        >
          {label}
        </div>
      )}
      <div className="tw-relative tw-flex tw-items-center">
        {searchIcon && (
          <div
            className={classNames(
              'tw-absolute tw-left-3',
              { 'tw-text-mGray': theme === 'light' },
              { 'tw-text-white': theme === 'dark' },
              { 'tw-text-mDarkPlainGray': theme === 'borderless' },
            )}
          >
            icon
          </div>
        )}
        <input
          data-ui-purpose={testId}
          className={classNames('tw-block tw-w-full tw-rounded-md tw-border', {
            'focus:tw-border-mBlue focus:tw-ring-1': !isDisabled,
            'tw-opacity-50': isDisabled,
            'tw-pl-10': searchIcon,
            'tw-border-mLightGray hover:tw-border-mGray': theme === 'light',
            'tw-border-mLighterGray tw-bg-mLighterGray tw-py-3 focus:tw-ring-0 tw-ring-0 tw-outline-none focus:tw-border-mLighterGray':
              theme === 'borderless',
            'focus:tw-bg-white tw-bg-white focus:tw-text-black tw-text-black tw-border-gray-800 focus:tw-border-gray-800':
              theme === 'borderless' && value && value.length > 0,
            'tw-bg-gray-600 tw-border-gray-600 tw-placeholder-white tw-text-white hover:tw-border-gray-700':
              theme === 'dark',
          })}
          type={type}
          spellCheck={true}
          required={isRequired}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isDisabled}
          ref={ref}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
      {description && (
        <span className="tw-font-medium tw-text-mGray tw-text-sm tw-pl-2">{description}</span>
      )}
    </div>
  );
}

export default forwardRef(TextInput);
