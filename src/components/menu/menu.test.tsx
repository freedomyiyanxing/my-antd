import React from 'react';
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react';
import Menu, { MenuItem } from '@components/menu';
import { MenuProps } from '@components/menu/menu';

const testProps: MenuProps = {
  defaultActive: 0,
  onSelect: jest.fn(),
  className: 'test',
};

const modeProps: MenuProps = {
  defaultActive: 0,
  mode: 'vertical',
};

const GenerateMenu: React.FC<MenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuItem activeIndex={0}>active</MenuItem>
      <MenuItem activeIndex={1} disabled>
        disabled
      </MenuItem>
      <MenuItem activeIndex={2}>clickC</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

describe('测试 Menu MenuItem 组件', () => {
  // 每次测试前开始执行, 用于合并相同的测试逻辑
  beforeEach(() => {
    wrapper = render(<GenerateMenu {...testProps} />);
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('测试组件是否正常', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('menu test');
    expect(menuElement.getElementsByTagName('div').length).toEqual(3);
    expect(activeElement).toHaveClass('menu-item active');
    expect(disabledElement).toHaveClass('menu-item is-disabled');
  });
  it('测试点击事件是否正常 并且disabled不可点击', () => {
    const thirdItemEle = wrapper.getByText('clickC');
    fireEvent.click(thirdItemEle);
    expect(thirdItemEle).toHaveClass('active');
    expect(activeElement).not.toHaveClass('active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it('测试Menu组件的mode是否正常', () => {
    cleanup();
    const container = render(<GenerateMenu {...modeProps} />);
    const ele = container.getByTestId('test-menu');
    expect(ele).toHaveClass('menu-vertical');
  });
});
