import React from 'react';
import classnames from 'classnames';

type SelectType = (index: number) => void;

interface MenuProps {
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

  return (
    <div className={classes} style={style}>
      <MenuContext.Provider value={menuValue}>{children}</MenuContext.Provider>
    </div>
  );
};

Menu.defaultProps = {
  mode: 'vertical',
  defaultActive: 0,
};

export default Menu;
