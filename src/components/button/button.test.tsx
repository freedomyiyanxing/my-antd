import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './index';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  className: 'class',
};

const linkProps: ButtonProps = {
  type: 'link',
  href: 'www.baidu.com',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

// 整个Button组件测试
describe('测试 Button 是组件', () => {
  it('Button 是否可以正常展示 和点击', () => {
    const { getByText } = render(<Button {...defaultProps}>test1</Button>);
    const ele = getByText('test1') as HTMLButtonElement;
    // jest-dom扩展的方法 当前ele是否出现在document文档中
    expect(ele).toBeInTheDocument();
    // 测试tagName 是否等于 BUTTON
    expect(ele.tagName).toEqual('BUTTON');
    // 测试class
    expect(ele).toHaveClass('btn btn-default');
    expect(ele.disabled).toBeFalsy();
    // 触发点击事件
    fireEvent.click(ele);
    // 确保方法得以调用
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('Button 组件的类型 和大小', () => {
    const { getByText } = render(<Button {...testProps}>test1</Button>);
    const ele = getByText('test1');
    expect(ele).toBeInTheDocument();
    expect(ele).toHaveClass('btn-primary btn-large class');
  });

  it('Button 组件中的 Link类型 a点击跳转', () => {
    const { getByText } = render(<Button {...linkProps}>link</Button>);
    const ele = getByText('link');
    expect(ele).toBeInTheDocument();
    expect(ele.tagName).toEqual('A');
    expect(ele).toHaveClass('btn-link');
  });

  it('Button 组件中 的 disabled 属性', () => {
    const { getByText } = render(<Button {...disabledProps}>disabled</Button>);
    const ele = getByText('disabled') as HTMLButtonElement;
    expect(ele).toBeInTheDocument();
    expect(ele.disabled).toBeTruthy();
    fireEvent.click(ele);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
