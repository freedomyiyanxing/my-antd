import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';
import { tuple } from '@components/_utils/type';

const ButtonTypes = tuple('default', 'primary', 'danger', 'link', 'text');
const ButtonSizes = tuple('large', 'normal', 'small');

export type ButtonType = typeof ButtonTypes[number];
export type ButtonSize = typeof ButtonSizes[number];

interface BaseButtonProps {
  className?: string;
  size?: ButtonSize;
  type?: ButtonType;
  disabled?: boolean;
  children?: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps | AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, type, children, href, ...rest } = props;

  const classes = classnames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === 'link' && disabled,
  });

  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  type: 'default',
  size: 'normal',
};

export default Button;
