import classNames from 'classnames';
import React from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit';
  style?: ButtonStyle;
  size?: ButtonSize;
  variant?: ButtonVariant;
  testId?: string;
  isDisabled?: boolean;
  withNotification?: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLElement>;
}

export enum ButtonStyle {
  default = 'default',
  transparent = 'transparent',
  link = 'link',
  secondary = 'secondary',
  gray = 'gray',
  green = 'green',
  danger = 'danger',
  cancel = 'cancel',
  inverted = 'inverted',
}

export enum ButtonSize {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export enum ButtonVariant {
  pill = 'pill',
  rounded = 'rounded',
}

export default function Button({
  type = 'button',
  style = ButtonStyle.default,
  size = ButtonSize.md,
  variant = ButtonVariant.pill,
  isDisabled = false,
  withNotification = false,
  testId,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      data-ui-purpose={testId}
      disabled={isDisabled}
      className={classNames(
        'tw-relative',
        'tw-select-none tw-inline-block tw-border tw-whitespace-nowrap tw-overflow-ellipsis',
        'tw-transform active:tw-scale-95 focus:tw-ring-2 tw-max-w-full',
        {
          'tw-cursor-not-allowed': isDisabled,
          'tw-opacity-30': isDisabled,
        },
        {
          [ButtonVariant.pill]: 'tw-rounded-full',
          [ButtonVariant.rounded]: 'tw-rounded-lg',
        }[variant],
        {
          [ButtonSize.xs]: 'tw-py-1 tw-px-1 tw-font-normal tw-text-xs',
          [ButtonSize.sm]: 'tw-py-2 tw-px-4 tw-font-normal tw-text-sm',
          [ButtonSize.md]: 'tw-py-2 tw-px-4 tw-font-semibold tw-text-md',
          [ButtonSize.lg]: 'tw-py-3 tw-px-4 tw-font-semibold tw-text-lg',
          [ButtonSize.xl]: 'tw-py-4 tw-px-5 tw-font-medium tw-text-xl',
        }[size],
        {
          [ButtonStyle.default]:
            'tw-bg-mBlue tw-border-mBlue tw-text-white hover:tw-bg-blue-600 hover:tw-border-blue-600 active:tw-border-blue-800 active:tw-bg-blue-800',
          [ButtonStyle.secondary]:
            'tw-bg-gray-900 tw-border-gray-900 tw-text-white hover:tw-bg-gray-800 hover:tw-border-gray-800 active:tw-bg-gray-900 active:tw-border-gray-900',
          [ButtonStyle.gray]:
            'tw-bg-gray-500 tw-border-gray-500 tw-text-white hover:tw-bg-gray-400 hover:tw-border-gray-400 active:tw-bg-gray-400 active:tw-border-gray-400',
          [ButtonStyle.cancel]:
            'tw-border-mBlue tw-bg-white tw-text-mBlue hover:tw-border-blue-600 hover:tw-text-blue-600 active:tw-border-blue-800 active:tw-text-blue-800',
          [ButtonStyle.green]:
            'tw-border-mGreen tw-bg-mGreen hover:tw-bg-green-600 hover:tw-border-green-600 tw-text-white',
          [ButtonStyle.danger]:
            'tw-border-mRed tw-bg-white tw-text-mRed hover:tw-border-red-400 hover:tw-bg-red-400 hover:tw-text-white active:tw-border-red-600 active:tw-bg-red-600 active:tw-text-white',
          [ButtonStyle.transparent]: 'tw-border-transparent hover:tw-backdrop-filter',
          [ButtonStyle.inverted]: 'tw-border-gray-600 tw-text-white',
          [ButtonStyle.link]:
            'hover:tw-underline tw-border-transparent tw-text-mBlue  hover:tw-text-blue-600 active:tw-text-blue-800',
        }[style],
      )}
      onClick={onClick}
    >
      {children}
      {withNotification && (
        <span
          className={classNames(
            'tw-absolute tw-z-10 tw-self-start tw-flex tw-justify-center tw-items-center',
            variant === ButtonVariant.rounded ? 'tw--right-1 tw--top-1.5' : 'tw-right-0 tw--top-0',
          )}
        >
          <span className="tw-animate-ping tw-absolute tw-h-4 tw-w-4 tw-rounded-full tw-bg-green-300 tw-opacity-75"></span>
          <span className="tw-relative tw-rounded-full tw-h-3 tw-w-3 tw-bg-green-300"></span>
        </span>
      )}
    </button>
  );
}
