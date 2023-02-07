
# use-global-react-state - Effortless Global State Management

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Introduction 
State management is an important aspect of web development, especially in React. The useState hook is a popular choice, but it only works within the component where it's defined. The Global State Hook solves this problem by providing an easy and intuitive way to manage global state.

- A simple hooks that enables you to use react state globaly
- Same functionality as useState hook
- Available globally throughout the application
- No configurations needed


## Installation

```bash
  npm install use-react-global-state
```
     
## Usage
### Requires react >= 16.8

``` javascript
import React from 'react';
import useGlobalState from 'use-react-global-state';

const INITIAL_STATE_COUNTER = 0

const Component1 = () => {
  //Pass the key and initial state to useGlobalState(key, initialValue)
  const [count, setCount] = useGlobalState('counter', INITIAL_STATE_COUNTER);
  return (
    <div>
      <span>Counter: {count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
};

const Component2 = () => {
  //In other file where you want to access the same state
  //Pass the same key and initial value 
  const [count, setCount] = useGlobalState('counter', INITIAL_STATE_COUNTER);
  return (
    <div>
      <span>Counter: {count}</span>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
};

const App = () => (
  <>
    <Component1 />
    <Component2 />
  </>
);

```

## index.js 

```javascript
import { GlobalStateProvider } from 'use-react-global-state';

const root = ReactDOM.createRoot(document.getElementById('root'));

//Wrap the App with GlobalStateProvider
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>
);

```

## API


*   `useGlobalState`: a custom hook works like React.useState


#### Parameters
*  `key` **required** 
*  `initialValue` **required** 

**NOTE:** The initial value should be same across all the hooks of the same key
