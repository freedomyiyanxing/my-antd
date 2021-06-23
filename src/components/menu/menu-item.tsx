import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  disabled?: boolean;
  className?: string;
  activeIndex: number;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { activeIndex, className, style, disabled, children } = props;
  const { index, onSelect } = useContext(MenuContext);

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    active: index === activeIndex,
  });

  const handleClick = () => {
    if (index === activeIndex) {
      return;
    }

    if (onSelect && !disabled) {
      onSelect(activeIndex);
    }
  };

  return (
    <div className={classes} style={style} onClick={handleClick}>
      {children}
    </div>
  );
};

MenuItem.defaultProps = {
  disabled: false,
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
