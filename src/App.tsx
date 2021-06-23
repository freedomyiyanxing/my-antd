import React from 'react';
import Button from '@components/button';
import Menu, { MenuItem } from '@components/menu';

const App = (): JSX.Element => {
  return (
    <div className="App">
      <div>
        <Button>default</Button>
        <Button type="primary" size="small">
          primary
        </Button>
        <Button type="danger" size="large">
          danger
        </Button>
        <Button type="default" disabled>
          default disabled
        </Button>
        <Button type="link" href="https://www.baidu.com">
          link
        </Button>
        <Button type="link" target="_blank" download disabled href="https://www.baidu.com">
          link disabled
        </Button>
      </div>

      <Menu mode="horizontal" onSelect={(i) => console.log(i)}>
        <MenuItem>click A</MenuItem>
        <MenuItem disabled>click B</MenuItem>
        <MenuItem>click C</MenuItem>
      </Menu>

      <Menu mode="vertical" onSelect={(i) => console.log(i)}>
        <MenuItem>click A</MenuItem>
        <MenuItem>click B</MenuItem>
        <MenuItem>click C</MenuItem>
      </Menu>

      <div>
        <h1>hello world</h1>
        <h2>hello world</h2>
        <h3>hello world</h3>
        <h4>hello world</h4>
        <code>script</code>
        <p>duanlu</p>
        <a href="">link</a>
      </div>
    </div>
  );
};

export default App;
