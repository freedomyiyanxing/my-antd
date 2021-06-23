import React from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menu-item';

type SelectType = (index: number) => void;

export interface MenuProps {
  className?: string;
  onSelect?: SelectType;
  defaultActive?: number;
  style?: React.CSSProperties;
  mode?: 'vertical' | 'horizontal';
}

export interface MenuContextType {
  index: number;
  onSelect?: SelectType;
}

export const MenuContext = React.createContext<MenuContextType>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultActive, className, mode, onSelect, style, children } = props;
  const [currentIndex, setCurrentIndex] = React.useState(defaultActive);

  const classes = classnames('menu', className, {
    [`menu-${mode}`]: mode,
  });

  const handleSelect = (i: number) => {
    setCurrentIndex(i);
    if (onSelect) {
      onSelect(i);
    }
  };

  const menuValue: MenuContextType = {
    index: currentIndex == null ? 0 : currentIndex,
    onSelect: handleSelect,
  };

  const renderChildren = () =>
    React.Children.map(children, (child) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return child;
      } else {
        console.error('Error: 子组件必须是 MenuItem');
      }
    });

  return (
    <div className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={menuValue}>{renderChildren()}</MenuContext.Provider>
    </div>
  );
};

Menu.defaultProps = {
  mode: 'vertical',
  defaultActive: 0,
};

export default Menu;
